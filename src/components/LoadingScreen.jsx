import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imagesToLoad = [
      '/images/bmwcar.png',
      '/images/BMWlogo.png',
      '/images/carcharginELE.png',
    ];
    
    // Add image sequence for the ScrollVideoSection
    for (let i = 0; i < 126; i++) {
      imagesToLoad.push(`/imageseq/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`);
    }

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.floor((loadedCount / totalImages) * 100);
      setProgress(currentProgress);
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small scale-up glitch before hiding
      gsap.to(textRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: 'power4.in',
        delay: 0.2
      });

      // Fade out container
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.6,
        onComplete: onComplete
      });
    }
  }, [progress, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden text-white font-sans selection:bg-transparent">
      
      {/* HUD Elements */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-[10px] md:text-xs tracking-widest text-white/40 uppercase font-mono pointer-events-none">
        [ FILE_08 ]
      </div>
      <div className="absolute top-8 right-8 md:top-12 md:right-12 text-[10px] md:text-xs tracking-widest text-white/40 uppercase font-mono pointer-events-none">
        OV5023d-2025
      </div>
      
      {/* Crosshairs */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 text-xs text-white/30 pointer-events-none">
        +
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 text-xs text-white/30 pointer-events-none">
        +
      </div>

      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-[10px] md:text-xs tracking-widest text-white/40 uppercase font-mono pointer-events-none flex flex-col gap-1">
        <span>SYSTEM_INITIALIZING</span>
        <span className="text-blue-500/70">AWAITING_ASSETS</span>
      </div>
      
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-sm md:text-base tracking-[0.3em] text-white/80 uppercase font-mono font-bold pointer-events-none">
        {progress}%
      </div>

      {/* Main Glitch Text */}
      <div className="relative group w-full flex items-center justify-center" ref={textRef}>
        <h1 className="text-[4rem] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black tracking-[-0.05em] uppercase flex">
          {"LOADING".split('').map((char, index) => {
            const activeCount = progress === 100 ? 7 : Math.floor((progress / 100) * 7);
            const isFilled = index < activeCount;
            return (
              <span 
                key={index} 
                data-text={char}
                className={`glitch-char ${isFilled ? 'glitch-char-filled' : 'glitch-char-outline'}`}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>
      
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay opacity-30"></div>
    </div>
  );
};

export default LoadingScreen;
