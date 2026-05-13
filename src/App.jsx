import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShowcaseSection from './components/ShowcaseSection';
import ScrollVideoSection from './components/ScrollVideoSection';
import ModelSection from './components/ModelSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);

  return (
    <div className="w-full min-h-screen bg-[#F4F4F6] text-black font-sans overflow-hidden" ref={containerRef}>
      <Navbar />
      <HeroSection />
      <ShowcaseSection />
      <ScrollVideoSection />
    </div>
  );
}

export default App;
