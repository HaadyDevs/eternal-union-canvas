
import React from 'react';

const WeddingLocation = () => {
  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Venue Image */}
        <div className="text-center mb-8 relative">
          <img 
            src="https://images.unsplash.com/photo-1520637836862-4d197d17c13a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Dunhaven Castle"
            className="w-64 md:w-80 h-48 md:h-60 object-cover rounded grayscale mx-auto"
          />
          {/* Overlapping Title */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2">
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold uppercase tracking-wide text-black">
              LOCATION
            </h2>
          </div>
        </div>
        
        {/* Location Details */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center max-w-3xl mx-auto mt-12 mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="font-sans text-sm uppercase tracking-wider text-gray-500">
              DUNHAVEN CASTLE
            </p>
            <p className="font-sans text-sm uppercase tracking-wider text-gray-500">
              HOTEL & RESTAURANT
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-sans text-sm uppercase tracking-wider text-gray-500">
              GLENCAIRN ROAD COUNTY
            </p>
            <p className="font-sans text-sm uppercase tracking-wider text-gray-500">
              KERRY, IRELAND
            </p>
          </div>
        </div>
        
        {/* Travel & Stay Button */}
        <div className="text-center">
          <button className="font-sans text-xs uppercase tracking-wider bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black border border-black transition-colors">
            TRAVEL & STAY
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeddingLocation;
