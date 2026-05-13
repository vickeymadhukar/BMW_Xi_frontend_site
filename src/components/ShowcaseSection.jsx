import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PlayOnHoverGif = ({ src, alt, isHovered }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
      }
    };
  }, [src]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <img 
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
      />
    </>
  );
};

const ShowcaseCard = ({ title, subtitle, imageSrc, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative flex-shrink-0 w-full h-[140px] lg:h-[180px] xl:h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${
        isDark ? 'bg-black border border-white/10 hover:border-white/30 shadow-white/5' : 'bg-white border border-black/5 hover:border-black/20 shadow-black/5'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Play-on-hover GIF Background */}
      <PlayOnHoverGif src={imageSrc} alt={title} isHovered={isHovered} />

      {/* Overlay Gradient */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isDark ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/50' 
               : 'bg-gradient-to-t from-white/60 via-white/10 to-transparent group-hover:from-white/80 group-hover:via-white/20'
      }`}></div>

      {/* Content */}
      <div className="absolute inset-0 p-4 lg:p-5 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 ease-out translate-y-3 group-hover:translate-y-0">
          <h3 className={`text-sm lg:text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            {title}
          </h3>
          <p className={`text-[9px] lg:text-[10px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${
            isDark ? 'text-white/70' : 'text-black/70'
          }`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const ShowcaseSection = () => {
  const techSectionRef = useRef(null);
  const designSectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Technology Section Animations
      gsap.from(".tech-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techSectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".tech-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techSectionRef.current,
          start: "top 70%",
        }
      });

      // Design Section Animations
      gsap.from(".design-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: designSectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".design-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: designSectionRef.current,
          start: "top 70%",
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full h-auto lg:h-screen relative z-20 flex flex-col">
      
      {/* TECHNOLOGY SUB-SECTION (DARK) */}
      <div 
        ref={techSectionRef} 
        className="w-full lg:h-1/2 bg-[#050505] text-white py-16 lg:py-0 px-6 md:px-12 lg:px-20 relative overflow-hidden flex items-center"
      >
        {/* Soft Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-8 relative z-10">
          
          {/* Left Content */}
          <div className="tech-content w-full lg:w-[30%] flex flex-col justify-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4">
              Technology
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-semibold mb-4 leading-[1.1] tracking-tight">
              Driving<br />redefined.
            </h2>
            <p className="text-white/60 text-xs lg:text-sm leading-relaxed mb-6 max-w-sm">
              Advanced. Intuitive. Connected. The new BMW iX1 blends cutting-edge technology with effortless control.
            </p>
            <button className="group flex items-center space-x-3 w-max">
              <span className="text-[10px] font-bold uppercase tracking-widest">Discover</span>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-[70%] flex flex-col md:flex-row gap-4 overflow-hidden items-center">
            <div className="tech-card w-full md:w-1/3">
              <ShowcaseCard 
                title="BMW Curved Display" 
                subtitle="All information. Perfectly in view." 
                imageSrc="/video/upper2.gif" 
                isDark={true} 
              />
            </div>
            <div className="tech-card w-full md:w-1/3">
              <ShowcaseCard 
                title="Premium Sound" 
                subtitle="Immersive sound. Pure driving pleasure." 
                imageSrc="/video/upper3.gif" 
                isDark={true} 
              />
            </div>
            <div className="tech-card w-full md:w-1/3">
              <ShowcaseCard 
                title="Driving Assistant" 
                subtitle="Smarter systems for maximum safety." 
                imageSrc="/video/upper2.gif" 
                isDark={true} 
              />
            </div>
          </div>

        </div>
      </div>

      {/* DESIGN SUB-SECTION (LIGHT) */}
      <div 
        ref={designSectionRef} 
        className="w-full lg:h-1/2 bg-[#FDFDFD] text-black py-16 lg:py-0 px-6 md:px-12 lg:px-20 relative overflow-hidden flex items-center"
      >
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-8">
          
          {/* Left Content */}
          <div className="design-content w-full lg:w-[30%] flex flex-col justify-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-4">
              Design
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-semibold mb-4 leading-[1.1] tracking-tight">
              Bold from<br />every angle.
            </h2>
            <p className="text-black/60 text-xs lg:text-sm leading-relaxed mb-6 max-w-sm">
              Sculpted lines. Athletic stance. A design that commands attention wherever you go. The exterior of the BMW iX1.
            </p>
            <button className="group flex items-center space-x-3 w-max">
              <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
              <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-[70%] flex flex-col md:flex-row gap-4 overflow-hidden items-center">
            <div className="design-card w-full md:w-1/3">
              <ShowcaseCard 
                title="Iconic Front" 
                subtitle="Striking presence on every road." 
                imageSrc="/video/lower1.gif" 
                isDark={false} 
              />
            </div>
            <div className="design-card w-full md:w-1/3">
              <ShowcaseCard 
                title="Dynamic Profile" 
                subtitle="Elegant proportions and flowing lines." 
                imageSrc="/video/lower2.gif" 
                isDark={false} 
              />
            </div>
            <div className="design-card w-full md:w-1/3">
              <ShowcaseCard 
                title="Distinctive Rear" 
                subtitle="A powerful and broad stance." 
                imageSrc="/video/lower.gif" 
                isDark={false} 
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ShowcaseSection;
