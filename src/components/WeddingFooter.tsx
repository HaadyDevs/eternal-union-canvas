
import React from 'react';

const WeddingFooter = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-xl md:text-2xl font-cinzel font-semibold text-black mb-2">
          Megan & Brian
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          July 22, 2025 — Bali, Indonesia
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-gray-600 text-sm">
          <a href="#schedule" className="hover:underline transition-all duration-200">Schedule</a>
          <a href="#location" className="hover:underline transition-all duration-200">Location</a>
          <a href="#registry" className="hover:underline transition-all duration-200">Registry</a>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Built with love ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default WeddingFooter;
