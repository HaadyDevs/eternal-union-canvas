
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const WeddingNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-6 px-4 sm:px-8 relative">
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

        {/* Mobile Logo */}
        <div className="md:hidden">
          <h1 className="font-cinzel text-lg font-medium">SOPHIA & ALEXANDER</h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Desktop Right Side Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="font-cinzel text-sm hover:opacity-70 transition-opacity">
            FAQ
          </button>
          <button className="font-cinzel text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
            RSVP
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <div className="space-y-6">
              <a 
                href="#story" 
                className="block font-cinzel text-sm hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                Our Story
              </a>
              <a 
                href="#travel" 
                className="block font-cinzel text-sm hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                Travel & Stay
              </a>
              <a 
                href="#registry" 
                className="block font-cinzel text-sm hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                Registry
              </a>
              <button className="block font-cinzel text-sm hover:opacity-70 transition-opacity w-full text-left">
                FAQ
              </button>
              <button className="font-cinzel text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors w-full">
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WeddingNavigation;
