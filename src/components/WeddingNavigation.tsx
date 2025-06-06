
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus, X } from 'lucide-react';

const WeddingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
        
        {/* Mobile Navigation - Only Show Name and Menu Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <h1 className="font-cinzel text-lg font-bold tracking-wide">
            BRIAN & MEGAN
          </h1>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                {isOpen ? (
                  <X className="w-6 h-6 transition-transform duration-300" />
                ) : (
                  <Plus className="w-6 h-6 transition-transform duration-300" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent 
              side="top" 
              className="h-screen w-full bg-white border-none p-0"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-12">
                {/* Navigation Links */}
                <div className="flex flex-col items-center space-y-8">
                  <a 
                    href="#story" 
                    className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Our Story
                  </a>
                  <a 
                    href="#travel" 
                    className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Travel & Stay
                  </a>
                  <a 
                    href="#registry" 
                    className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Registry
                  </a>
                  <a 
                    href="#faq" 
                    className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </a>
                  <button 
                    className="font-cinzel text-2xl px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    RSVP
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
    </nav>
  );
};

export default WeddingNavigation;
