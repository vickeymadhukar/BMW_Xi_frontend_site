import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundTypography from './BackgroundTypography';
import FloatingCards from './FloatingCards';
import { ArrowRight, Mouse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const carRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        anticipatePin: 1,
      });


      gsap.to(carRef.current, {
        scale: 1.05,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#F9F9FA] to-[#E9EAEC]"
    >
      {/* Left Progress / Text */}
      <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
        <span className="text-xs font-medium mb-4">01</span>
        <div className="w-[1px] h-32 bg-black/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black"></div>
        </div>
        <span className="text-xs font-medium mt-4 text-black/50">05</span>
      </div>

      {/* Subtitle Top Left */}
      <div className="absolute top-24 md:top-32 left-0 md:left-24 w-full md:w-auto text-center md:text-left z-20 text-[10px] tracking-widest font-semibold text-black/60 uppercase">
        <p>100% Electric. 100% Sheer Driving Pleasure.</p>
      </div>

      <BackgroundTypography />

      {/* Main Car Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pb-48 sm:pb-32 md:pb-24">
        <div ref={carRef} className="relative flex-shrink-0 w-[160%] sm:w-[120%] md:w-[85%] max-w-[1400px]">
          {/* Reflective floor glow */}
          <div className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-16 md:h-32 bg-black/10 blur-[50px] rounded-full"></div>

          <img
            src="./images/bmwcar.png"
            alt="BMW iX1"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
          {/* Number plate removed to prevent overlapping behind the glass cards */}
        </div>
      </div>

      <FloatingCards />

      {/* CURVED SVG MASK AND BOTTOM CONTENT */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] z-30 pointer-events-none">

        {/* SVG Background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[100px]"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,10 L480,10 C560,10 580,50 640,50 L800,50 C860,50 880,10 960,10 L1440,10 L1440,100 L0,100 Z"
              fill="#020202"
            />
          </svg>
        </div>

        {/* Content over SVG */}
        <div className="absolute bottom-0 left-0 w-full h-16 flex flex-col justify-end pb-4 px-10 text-white pointer-events-auto">
          <div className="flex items-center justify-between w-full relative z-10">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col uppercase tracking-widest text-[9px] font-semibold text-white/50">
                <span>Next</span>
                <span className="text-white">The Details</span>
              </div>
              <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ArrowRight size={10} />
              </button>
            </div>
            <div className="w-20"></div> {/* Spacer to balance flex */}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-4 flex flex-col items-center">
            <div className="w-[1px] h-4 bg-white/80 mb-3"></div>
            <span className="text-[9px] uppercase tracking-widest font-semibold text-white/80">Scroll to discover</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
