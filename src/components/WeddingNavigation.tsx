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
              BRIAN & MEGAN
            </h1>
          </div>

          {/* Right Side Buttons - Desktop */}
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
              {isMenuOpen ? (
                <X size={24} className="transition-all duration-300" />
              ) : (
                <Plus size={24} className="transition-all duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a 
              href="#story" 
              className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
              onClick={toggleMenu}
            >
              OUR STORY
            </a>
            <a 
              href="#travel" 
              className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
              onClick={toggleMenu}
            >
              TRAVEL & STAY
            </a>
            <a 
              href="#registry" 
              className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
              onClick={toggleMenu}
            >
              INFO
            </a>
            <button 
              className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
              onClick={toggleMenu}
            >
              FAQS
            </button>
            <button 
              className="font-cinzel text-xl px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              RSVP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingNavigation;
