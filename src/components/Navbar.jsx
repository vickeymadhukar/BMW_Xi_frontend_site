import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-50 text-sm font-medium tracking-wide">
      <div className="flex items-center">
        <span className="text-xl font-bold font-display uppercase tracking-wider">BMW iX1</span>
      </div>

      <div className="hidden md:flex items-center space-x-12 opacity-80">
        <a href="#" className="hover:opacity-100 transition-opacity">Models</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Innovation</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Charging</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Discover</a>
      </div>

      <div className="flex items-center space-x-6">
        <img src="/images/BMWlogo.png" alt="BMW Logo" className="w-10 h-10 object-contain" />
        <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
