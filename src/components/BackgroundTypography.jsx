import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BackgroundTypography = () => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(textRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=3000",
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute top-1/2 left-0 -translate-y-[60%] w-max flex items-center z-0 pointer-events-none">
      <h1
        ref={textRef}
        className="text-[45vw] sm:text-[35vw] md:text-[25vw] font-display font-bold uppercase tracking-tighter text-black/10 whitespace-nowrap leading-none select-none pl-[10vw]"
      >
        ELECTRIC POWER
      </h1>
    </div>
  );
};

export default BackgroundTypography;
