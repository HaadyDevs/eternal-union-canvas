
import React from 'react';

const WeddingNavigation = () => {
  return (
    <nav className="w-full py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Main Navigation */}
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
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex space-x-6">
          <a href="#story" className="font-cinzel text-xs hover:opacity-70 transition-opacity">
            Our Story
          </a>
          <a href="#travel" className="font-cinzel text-xs hover:opacity-70 transition-opacity">
            Travel & Stay
          </a>
          <a href="#registry" className="font-cinzel text-xs hover:opacity-70 transition-opacity">
            Registry
          </a>
        </div>

        {/* Right Side Buttons */}
        <div className="flex space-x-4">
          <button className="font-cinzel text-sm hover:opacity-70 transition-opacity">
            FAQ
          </button>
          <button className="font-cinzel text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
            RSVP
          </button>
        </div>
      </div>
    </nav>
  );
};

export default WeddingNavigation;
