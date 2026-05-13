import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    const frameCount = 126;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const currentFrame = index => (
      `/imageseq/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const car = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => { render(); };

    const render = () => {
      if (images[car.frame] && images[car.frame].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[car.frame];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(car, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      duration: 100
    });

    tl.fromTo(leftContentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power3.out", duration: 25 },
      70
    );

    tl.fromTo(rightContentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power3.out", duration: 25 },
      70
    );

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden z-10">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-multiply"></div>

      <div
        ref={leftContentRef}
        className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-20 flex flex-col pointer-events-none opacity-0"
      >
        <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
          <span className="text-blue-500 font-bold tracking-widest text-[10px] md:text-xs">01</span>
          <div className="w-8 md:w-12 h-[2px] bg-blue-500/50"></div>
          <span className="text-white/80 font-semibold tracking-widest text-[10px] md:text-xs uppercase">Future of Driving</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold tracking-tighter leading-[0.95] mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 drop-shadow-2xl">
          ELECTRIC<br />REVOLUTION
        </h2>

        <div className="p-4 md:p-5 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 max-w-[260px] md:max-w-xs shadow-2xl pointer-events-auto">
          <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 font-light">
            An intelligent electric platform engineered for tomorrow. Precision, power, uncompromising sustainability.
          </p>
          <button className="flex items-center space-x-3 group w-max">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              <svg width="10" height="10" className="md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-white group-hover:text-white/80 transition-colors">Watch Film</span>
          </button>
        </div>
      </div>

      <div
        ref={rightContentRef}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 lg:right-20 hidden md:flex flex-col items-end space-y-8 pointer-events-none opacity-0"
      >
        <div className="flex flex-col items-end">
          <div className="w-8 h-[2px] bg-blue-500 mb-3"></div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white/50 mb-1">Electric Performance</span>
          <div className="flex items-baseline">
            <span className="text-4xl lg:text-5xl font-light text-white mr-1 tracking-tight">440</span>
            <span className="text-xs text-white/90 font-bold tracking-widest">KM</span>
          </div>
          <span className="text-[9px] font-semibold tracking-widest text-white/40 uppercase mt-1">Range</span>
        </div>

        <div className="w-16 h-[1px] bg-white/20"></div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline">
            <span className="text-4xl lg:text-5xl font-light text-white mr-1 tracking-tight">5.6</span>
            <span className="text-xs text-white/90 font-bold tracking-widest">SEC</span>
          </div>
          <span className="text-[9px] font-semibold tracking-widest text-white/40 uppercase mt-1">0-100 KM/H</span>
        </div>

        <div className="w-16 h-[1px] bg-white/20"></div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline">
            <span className="text-4xl lg:text-5xl font-light text-white mr-1 tracking-tight">313</span>
            <span className="text-xs text-white/90 font-bold tracking-widest">HP</span>
          </div>
          <span className="text-[9px] font-semibold tracking-widest text-white/40 uppercase mt-1">Power</span>
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;
