import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Timer,
  Battery,
  Plug,
  ChevronRight,
  Play,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ icon: Icon, value, unit, label }) => (
  <div className="stat-card pointer-events-auto bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] px-2 sm:px-4 py-3 sm:py-5 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:-translate-y-2 hover:shadow-xl w-[calc(50%_-_0.5rem)] sm:w-40 xl:w-44">

    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
      <Icon
        strokeWidth={1.5}
        className="text-black/80 w-4 h-4 sm:w-5 sm:h-5"
      />

      <div className="flex items-baseline space-x-1">
        <span className="text-xl sm:text-3xl font-display font-medium text-black">
          {value}
        </span>

        <span className="text-[10px] sm:text-sm font-semibold text-black">
          {unit}
        </span>
      </div>
    </div>

    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] text-black/50 font-bold text-center leading-relaxed max-w-[120px]">
      {label}
    </span>
  </div>
);

const FloatingCards = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // STAT CARDS ANIMATION
      gsap.fromTo(
        '.stat-card',
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'none',

          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: '+=500',
            scrub: 0.5,

            // remove later
            markers: false,
          },
        }
      );

      // PREMIUM CARD ANIMATION
      gsap.fromTo(
        '.premium-card',
        {
          x: 55,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: '+=500',
            scrub: 0.5,
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-6 md:bottom-12 xl:bottom-24 left-0 w-full px-4 md:px-8 xl:px-20 flex flex-col xl:flex-row items-center xl:items-end justify-between z-20 pointer-events-none"
    >

      {/* LEFT LINKS */}
      <div className="hidden xl:flex flex-col mb-4 pointer-events-auto">
        <a
          href="#"
          className="flex items-center space-x-2 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity pb-2 border-b-2 border-black/20 w-max"
        >
          <span>Explore the iX1</span>

          <ChevronRight size={16} strokeWidth={2} />
        </a>
      </div>

      {/* CENTER CARDS */}
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-2 sm:gap-4 mx-auto w-full xl:w-auto">

        <StatCard
          icon={Zap}
          value="313"
          unit="HP"
          label="MAX POWER"
        />

        <StatCard
          icon={Timer}
          value="5.6"
          unit="s"
          label="0-100 KM/H"
        />

        <StatCard
          icon={Battery}
          value="438"
          unit="KM"
          label="RANGE (WLTP)"
        />

        <StatCard
          icon={Plug}
          value="64"
          unit="min"
          label={
            <>
              10-80%
              <br />
              CHARGE
            </>
          }
        />

        {/* PREMIUM CARD */}
        <div className="premium-card pointer-events-auto bg-[#1E1E1E] text-white px-3 sm:px-5 py-2 sm:py-4 rounded-2xl flex items-center space-x-3 sm:space-x-4 transform transition-transform hover:-translate-y-2 hover:shadow-2xl shadow-xl w-full sm:w-auto xl:w-64 cursor-pointer mt-1 sm:mt-0">

          <div className="w-14 h-10 sm:w-20 sm:h-14 bg-black/50 rounded-lg overflow-hidden relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80"
              alt="Interior"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-0.5 sm:mb-1">
              Premium Interior
            </span>

            <div className="flex items-center space-x-1 text-[8px] sm:text-[10px] text-white/60">
              <span>Discover More</span>

              <ChevronRight
                size={12}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT VIDEO BUTTON */}
      <div className="hidden xl:flex items-center space-x-4 mb-4 pointer-events-auto">

        <button className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
          <Play size={18} fill="black" />
        </button>

        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider">
            Watch full film
          </span>

          <span className="text-xs text-black/50">
            02:45
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatingCards;