import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShowcaseSection from './components/ShowcaseSection';
import ScrollVideoSection from './components/ScrollVideoSection';
import ModelSection from './components/ModelSection';
import EndingSection from './components/EndingSection';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Refresh ScrollTrigger after loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Small timeout to allow DOM to render fully
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div 
        className={`w-full min-h-screen bg-[#F4F4F6] text-black font-sans overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden pointer-events-none' : 'opacity-100'}`} 
        ref={containerRef}
      >
        <Navbar />
        <HeroSection />
        <ShowcaseSection />
        <ScrollVideoSection />
        <EndingSection />
      </div>
    </>
  );
}

export default App;
