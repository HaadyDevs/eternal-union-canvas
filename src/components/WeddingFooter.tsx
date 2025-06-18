import React from "react";

const WeddingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-xl md:text-2xl font-cinzel font-semibold text-black mb-2">
          Haady & Nizra
        </h2>
        <p className="text-sm text-gray-600 font-sans">
          © {currentYear} All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
