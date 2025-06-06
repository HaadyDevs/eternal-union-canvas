
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const WeddingNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="w-full py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#story" className="font-cinzel text-sm hover:opacity-70 transition-opacity">
              Our Story
            </a>
            <a href="#travel" className="font-cinzel text-sm hover:opacity-70 transition-opacity">
              Travel & Stay
            </a>
            <a href="#registry" className="font-cinzel text-sm hover:opacity-70 transition-opacity">
              Registry
            </a>
          </div>
          
          {/* Mobile - Just the logo */}
          <div className="md:hidden">
            <h1 className="font-cinzel text-lg font-medium tracking-wider">
              SOPHIA & ALEXANDER
            </h1>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="font-cinzel text-sm hover:opacity-70 transition-opacity">
              FAQ
            </button>
            <button className="font-cinzel text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
              RSVP
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 transition-transform duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                {isMenuOpen ? (
                  <X size={24} className="transition-all duration-300" />
                ) : (
                  <Plus size={24} className="transition-all duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-50 md:hidden transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Header in overlay */}
        <div className="w-full py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="font-cinzel text-lg font-medium tracking-wider">
              SOPHIA & ALEXANDER
            </h1>
            <button 
              onClick={toggleMenu}
              className="p-2 transition-transform duration-300"
              aria-label="Close menu"
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                <X size={24} className="transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Menu content */}
        <div className="flex flex-col items-center justify-center h-full -mt-20 space-y-8">
          <a 
            href="#story" 
            className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
            onClick={toggleMenu}
          >
            Our Story
          </a>
          <a 
            href="#travel" 
            className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
            onClick={toggleMenu}
          >
            Travel & Stay
          </a>
          <a 
            href="#registry" 
            className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
            onClick={toggleMenu}
          >
            Registry
          </a>
          <button 
            className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
            onClick={toggleMenu}
          >
            FAQ
          </button>
          <button 
            className="font-cinzel text-xl px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors"
            onClick={toggleMenu}
          >
            RSVP
          </button>
        </div>
      </div>
    </>
  );
};

export default WeddingNavigation;
