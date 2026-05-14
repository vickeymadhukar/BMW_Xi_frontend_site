import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Electric canvas effect ─────────────────────────────── */
const useElectricEffect = (canvasRef, sectionRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    const bolts = [];
    const sparks = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
    let lastX = -9999, lastY = -9999;
    let raf;

    const resize = () => {
      const r = section.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Lightning bolt builder ── */
    const buildBolt = (x1, y1, x2, y2, roughness, depth) => {
      const pts = [{ x: x1, y: y1 }];
      const segments = 10 + Math.floor(Math.random() * 6);
      for (let i = 1; i < segments; i++) {
        const t   = i / segments;
        const mx  = x1 + (x2 - x1) * t;
        const my  = y1 + (y2 - y1) * t;
        const perp = { x: -(y2 - y1), y: x2 - x1 };
        const len  = Math.sqrt(perp.x ** 2 + perp.y ** 2) || 1;
        const off  = (Math.random() - 0.5) * roughness;
        pts.push({ x: mx + (perp.x / len) * off, y: my + (perp.y / len) * off });
      }
      pts.push({ x: x2, y: y2 });

      const branches = [];
      if (depth > 0) {
        const branchCount = 1 + Math.floor(Math.random() * 2);
        for (let b = 0; b < branchCount; b++) {
          const bi  = 2 + Math.floor(Math.random() * (pts.length - 4));
          const bp  = pts[bi];
          const ang = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.4;
          const bLen = 40 + Math.random() * 80;
          branches.push(buildBolt(
            bp.x, bp.y,
            bp.x + Math.cos(ang) * bLen,
            bp.y + Math.sin(ang) * bLen,
            roughness * 0.6, depth - 1
          ));
        }
      }

      return { pts, branches, life: 1, decay: 0.055 + Math.random() * 0.04, depth };
    };

    /* ── Draw one bolt recursively ── */
    const drawBolt = (bolt) => {
      if (bolt.pts.length < 2) return;
      const alpha = bolt.life * (bolt.depth === 0 ? 0.9 : 0.5);
      const width = bolt.depth === 0 ? 1.5 : 0.7;

      // glow pass
      ctx.save();
      ctx.shadowBlur  = bolt.depth === 0 ? 18 : 8;
      ctx.shadowColor = 'rgba(220,240,255,0.9)';
      ctx.strokeStyle = `rgba(200,230,255,${alpha * 0.6})`;
      ctx.lineWidth   = width + 2;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(bolt.pts[0].x, bolt.pts[0].y);
      bolt.pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();

      // core pass
      ctx.save();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth   = width;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(bolt.pts[0].x, bolt.pts[0].y);
      bolt.pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();

      bolt.branches.forEach(drawBolt);
    };

    /* ── Spawn sparks ── */
    const spawnSparks = (x, y, count = 5) => {
      for (let i = 0; i < count; i++) {
        const ang   = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        sparks.push({
          x, y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          life: 1,
          decay: 0.04 + Math.random() * 0.04,
          radius: 1 + Math.random() * 1.5,
        });
      }
    };

    /* ── Spawn bolts from mouse ── */
    const spawnBolts = (mx, my, speed) => {
      const count = Math.min(3, 1 + Math.floor(speed / 8));
      for (let i = 0; i < count; i++) {
        const ang  = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 120;
        bolts.push(buildBolt(mx, my,
          mx + Math.cos(ang) * dist,
          my + Math.sin(ang) * dist,
          35, 2
        ));
        spawnSparks(mx, my, 3);
      }
    };

    /* ── Animation loop ── */
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* cursor glow orb */
      if (mouse.x > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        g.addColorStop(0,   'rgba(255,255,255,0.12)');
        g.addColorStop(0.4, 'rgba(200,220,255,0.06)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      /* draw & age bolts */
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        drawBolt(b);
        b.life -= b.decay;
        // age branches too
        const ageBranches = (br) => { br.life -= br.decay; br.branches.forEach(ageBranches); };
        b.branches.forEach(ageBranches);
        if (b.life <= 0) bolts.splice(i, 1);
      }

      /* draw & age sparks */
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gravity
        s.life -= s.decay;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha  = s.life;
        ctx.shadowBlur   = 6;
        ctx.shadowColor  = 'rgba(200,230,255,0.9)';
        ctx.fillStyle    = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    /* ── Mouse tracking ── */
    let spawnThrottle = 0;
    const onMouseMove = (e) => {
      const r  = section.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;

      mouse.vx = mx - lastX;
      mouse.vy = my - lastY;
      mouse.x  = mx;
      mouse.y  = my;

      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      spawnThrottle++;
      if (speed > 3 && spawnThrottle % 2 === 0) {
        spawnBolts(mx, my, speed);
      }

      lastX = mx;
      lastY = my;
    };

    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [canvasRef, sectionRef]);
};

/* ─── Component ──────────────────────────────────────────── */
const EndingSection = () => {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const electricRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const btnRef      = useRef(null);
  const footerRef   = useRef(null);
  const taglineRef  = useRef(null);

  useElectricEffect(electricRef, sectionRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(taglineRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1   }, '-=0.4')
        .fromTo(subRef.current,      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .fromTo(btnRef.current,      { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.4')
        .fromTo(footerRef.current,   { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center md:items-end justify-end md:justify-center overflow-hidden bg-black pb-24 md:pb-0"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/carcharginELE.png"
          alt="BMW iX1 Charging"
          className="w-full h-full object-cover object-[60%_center] md:object-center"
          style={{ transformOrigin: 'center center' }}
        />
        {/* Minimal overlay — just enough for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* ⚡ Electric canvas — sits above image, below text */}
      <canvas
        ref={electricRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Horizontal divider line – top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-10" />

      {/* Content block — centered on mobile, right-aligned on desktop */}
      <div className="relative z-20 w-full flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-16 lg:px-24 md:max-w-2xl md:mr-0 md:ml-auto">

        {/* Eyebrow tag */}
        <div ref={taglineRef} className="flex items-center justify-center md:justify-start space-x-3 mb-4 opacity-0">
          <div className="w-8 h-[1px] bg-white/60" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">
            The Future is Electric
          </span>
          <div className="w-8 h-[1px] bg-white/60 md:hidden" />
        </div>

        {/* Main headline */}
        <h2
          ref={headlineRef}
          className="text-[13vw] sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.92] mb-4 opacity-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          CHARGE<br />FORWARD.
        </h2>

        {/* Sub-copy */}
        <p
          ref={subRef}
          className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 md:max-w-md mb-6 opacity-0 font-light"
        >
          Every journey begins with a single charge. The BMW iX1 — engineered for
          a world that never stops moving. Pure electric. Purely BMW.
        </p>

        {/* Mobile-only stat strip */}
        <div className="flex md:hidden w-full justify-center gap-0 mb-8">
          {[
            { val: '440', unit: 'KM',  label: 'Range' },
            { val: '5.6', unit: 'SEC', label: '0–100 KM/H' },
            { val: '313', unit: 'HP',  label: 'Power' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center border-r border-white/10 last:border-r-0 py-3">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-white tracking-tight">{s.val}</span>
                <span className="text-[9px] font-bold text-white/70 tracking-wider">{s.unit}</span>
              </div>
              <span className="text-[8px] font-semibold tracking-widest uppercase text-white/40 mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div ref={btnRef} className="flex flex-col sm:flex-row items-center md:items-start gap-4 opacity-0 w-full md:w-auto">
          <button className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-white text-black text-xs font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Configure Your iX1
            </span>
            <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full" />
          </button>

          <button className="group flex items-center space-x-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-white ml-0.5">
                <path d="M0 0l10 6-10 6V0z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors duration-300">
              Watch the Story
            </span>
          </button>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between opacity-0 border-t border-white/10 z-20"
      >
        <div className="flex items-center space-x-2">
          <img src="/images/BMWlogo.png" alt="BMW" className="h-8 w-auto brightness-0 invert opacity-80" />
        </div>

        <div className="hidden md:flex items-center space-x-8 text-[9px] font-bold tracking-widest uppercase text-white/40">
          <span>© 2025 BMW</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>All Rights Reserved</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Privacy Policy</span>
        </div>

        <div className="flex items-center space-x-2 text-[9px] font-bold tracking-widest uppercase text-white/40">
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
          <span>100% Electric</span>
        </div>
      </div>
    </section>
  );
};

export default EndingSection;
