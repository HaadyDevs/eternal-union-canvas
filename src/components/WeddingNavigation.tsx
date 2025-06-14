import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WeddingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 88; // Height of the navigation bar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className="w-full pt-8 lg:pt-12 px-4 sm:px-8 relative z-50 bg-white">
        <div className="w-full flex justify-between items-center">
          {/* Desktop Navigation - Left Side */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("story")}
              className="font-cinzel text-sm hover:opacity-70 transition-opacity"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection("travel")}
              className="font-cinzel text-sm hover:opacity-70 transition-opacity"
            >
              Travel & Stay
            </button>
            <button
              onClick={() => scrollToSection("registry")}
              className="font-cinzel text-sm hover:opacity-70 transition-opacity"
            >
              Registry
            </button>
          </div>

          {/* Desktop Couple Name - Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <h1 className="font-cinzel text-5xl font-bold tracking-wide">
              Haady & Nizra
            </h1>
          </div>

          {/* Mobile Navigation - Only Show Name and Menu Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <h1 className="font-cinzel text-3xl font-bold tracking-wide">
              Haady & Nizra
            </h1>

            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              <div
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                <Plus className="w-10 h-10" strokeWidth={1} />
              </div>
            </button>
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="font-cinzel text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
              RSVP
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Smooth fade in */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[88px] bg-white z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full flex flex-col items-center justify-center space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="flex flex-col items-center space-y-8">
                <motion.button
                  onClick={() => {
                    scrollToSection("story");
                    setIsOpen(false);
                  }}
                  className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Story
                </motion.button>
                <motion.button
                  onClick={() => {
                    scrollToSection("travel");
                    setIsOpen(false);
                  }}
                  className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Travel & Stay
                </motion.button>
                <motion.button
                  onClick={() => {
                    scrollToSection("registry");
                    setIsOpen(false);
                  }}
                  className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Registry
                </motion.button>
                <motion.button
                  onClick={() => {
                    scrollToSection("faq");
                    setIsOpen(false);
                  }}
                  className="font-cinzel text-2xl hover:opacity-70 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  FAQ
                </motion.button>
                <motion.button
                  className="font-cinzel text-2xl px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  RSVP
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeddingNavigation;
