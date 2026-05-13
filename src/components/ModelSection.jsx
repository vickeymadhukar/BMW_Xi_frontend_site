import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import { Zap, MapPin, Gauge, Activity, Battery, ShieldCheck, Box, RefreshCw, Car } from 'lucide-react';

function CarModel(props) {
  const { scene } = useGLTF('/bmw-x3-m40i/source/BMW%20X3%20M40i.glb');
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/bmw-x3-m40i/source/BMW%20X3%20M40i.glb');

const InfoCard = ({ icon: Icon, title, value, unit, subtitle }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 flex flex-col shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-500 font-medium">{title}</span>
      {Icon && <Icon size={14} className="text-gray-600" />}
    </div>
    <div className="flex items-baseline space-x-1">
      <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
      {unit && <span className="text-xs text-gray-600 font-semibold">{unit}</span>}
    </div>
    {subtitle && <span className="text-[10px] text-gray-400 mt-1">{subtitle}</span>}
  </div>
);

const ColorOption = ({ color, name, active }) => (
  <div className="flex flex-col items-center space-y-2 pointer-events-auto cursor-pointer group">
    <div className={`w-8 h-8 rounded-full border-2 ${active ? 'border-gray-400' : 'border-transparent'} flex items-center justify-center p-[2px]`}>
      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
    </div>
    <span className="text-[9px] text-gray-500 group-hover:text-gray-800 transition-colors">{name}</span>
  </div>
);

const ModelSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#e5e7eb] to-[#f3f4f6] overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas shadows dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }} camera={{ position: [0, 1.5, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Math.PI, Math.PI]}
            >
              <group position={[0, -1, 0]}>
                <CarModel scale={2.2} />
                <ContactShadows resolution={512} frames={1} scale={30} blur={2} opacity={0.5} far={10} color="#000000" />
              </group>
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Glowing Floor Ring */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full border-4 border-white opacity-60 shadow-[0_0_80px_rgba(255,255,255,1)] pointer-events-none mt-20 md:mt-32"
        style={{ transform: 'translateX(-50%) translateY(-10%) rotateX(75deg)' }}
      >
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2" style={{ transform: 'rotateX(-75deg)' }}>
           <div className="w-2 h-2 rounded-full bg-gray-400"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-8 flex flex-col justify-between">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-start">
          
          {/* Left Title */}
          <div className="pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tighter mb-1">
              iX1 <span className="font-bold">M60</span>
            </h1>
            <p className="text-gray-500 text-xs md:text-sm mb-6">Electric. Powerful. Effortless.</p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">$78,500</h2>
            <p className="text-gray-500 text-[10px]">Starting Price</p>
          </div>

          {/* Center Colors */}
          <div className="hidden md:flex items-center space-x-6 bg-white/50 backdrop-blur-xl rounded-full px-8 py-3 shadow-sm border border-white/60">
             <ColorOption color="#A5A5A5" name="Brooklyn Grey" active={true} />
             <ColorOption color="#1A1A1A" name="Black Sapphire" />
             <ColorOption color="#F5F5F5" name="Mineral White" />
             <ColorOption color="#1C5E9B" name="Phytonic Blue" />
          </div>

          {/* Right Top Area */}
          <div className="pointer-events-auto flex items-center justify-center w-20 h-20 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60 cursor-pointer hover:bg-white transition-colors">
            <div className="flex flex-col items-center">
              <RefreshCw size={20} className="text-gray-800 mb-1" />
              <span className="text-[10px] font-bold text-gray-800">360°</span>
              <span className="text-[8px] text-gray-500">View Mode</span>
            </div>
          </div>
        </div>

        {/* Middle Content Row */}
        <div className="flex justify-between items-center flex-1 my-4">
          
          {/* Left Panel */}
          <div className="flex flex-col space-y-3 w-36 md:w-44">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
              <div className="flex items-center space-x-3 mb-2">
                <Battery size={16} className="text-gray-700" />
                <div>
                  <span className="block text-xs font-bold text-gray-900">101 kWh</span>
                  <span className="block text-[9px] text-gray-500">Battery Capacity</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-gray-700 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold text-gray-900 leading-tight">Munich, Germany</span>
                  <span className="block text-[8px] text-gray-500 mb-2">Production Location</span>
                  {/* Fake map block */}
                  <div className="w-full h-12 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center"></div>
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
                  </div>
                </div>
              </div>
            </div>

            <InfoCard title="Power" value="536" unit="hp" />
            <InfoCard title="Total Range" value="523" unit="km" />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col space-y-3 w-36 md:w-44">
            <InfoCard icon={Gauge} title="0-100 km/h" value="4.1" unit="sec" />
            <InfoCard icon={Gauge} title="Top Speed" value="200" unit="km/h" />
            <InfoCard icon={Activity} title="Torque" value="795" unit="Nm" />
            
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">Drivetrain</span>
                <Car size={14} className="text-gray-600" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">AWD</span>
            </div>

            <InfoCard icon={Zap} title="Charging (DC)" value="10-80%" subtitle="in 31 min" />
            
            {/* Need Help Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60 pointer-events-auto flex flex-col">
               <span className="text-xs font-bold text-gray-900 mb-1">Need Help?</span>
               <span className="text-[9px] text-gray-500 mb-3 leading-tight">Get in touch with our EV experts</span>
               <button className="w-full bg-black text-white rounded-lg py-2 text-[10px] font-medium hover:bg-gray-800 transition-colors">
                 Contact Now
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 md:gap-4 mt-auto">
          <div className="flex-1 min-w-[100px] bg-white/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex items-center space-x-3 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
            <ShieldCheck size={16} className="text-gray-700 shrink-0" />
            <div>
              <span className="block text-[8px] md:text-[9px] text-gray-500">Battery Warranty</span>
              <span className="block text-[10px] md:text-xs font-bold text-gray-900">8 Yrs / 160k km</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-[100px] bg-white/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex items-center space-x-3 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
            <Zap size={16} className="text-gray-700 shrink-0" />
            <div>
              <span className="block text-[8px] md:text-[9px] text-gray-500">Charging Power</span>
              <span className="block text-[10px] md:text-xs font-bold text-gray-900">195 kW DC</span>
            </div>
          </div>

          <div className="flex-1 min-w-[100px] bg-white/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex items-center space-x-3 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
            <Gauge size={16} className="text-gray-700 shrink-0" />
            <div>
              <span className="block text-[8px] md:text-[9px] text-gray-500">Drive Modes</span>
              <span className="block text-[10px] md:text-xs font-bold text-gray-900">Eco • Sport</span>
            </div>
          </div>

          <div className="flex-1 min-w-[100px] bg-white/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex items-center space-x-3 shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
            <Box size={16} className="text-gray-700 shrink-0" />
            <div>
              <span className="block text-[8px] md:text-[9px] text-gray-500">Cargo Volume</span>
              <span className="block text-[10px] md:text-xs font-bold text-gray-900">500 L</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-[100px] bg-white/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex items-center shadow-lg border border-white/60 pointer-events-auto hover:bg-white transition-colors cursor-default">
             <div className="w-full flex items-center justify-between text-[9px]">
               <div className="flex flex-col space-y-2">
                 <span className="text-gray-500 text-[8px]">2.5 bar</span>
                 <span className="text-gray-500 text-[8px]">2.5 bar</span>
               </div>
               <Car size={20} className="text-gray-300 mx-1 shrink-0" />
               <div className="flex flex-col space-y-2 text-right">
                 <span className="font-bold text-gray-900 text-[8px]">2.6 bar</span>
                 <span className="font-bold text-gray-900 text-[8px]">2.6 bar</span>
               </div>
             </div>
          </div>
        </div>

      </div>
      
    </section>
  );
};

export default ModelSection;
