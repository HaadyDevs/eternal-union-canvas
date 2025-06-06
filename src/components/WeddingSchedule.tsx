
import React from 'react';

const WeddingSchedule = () => {
  const scheduleItems = [
    { time: "4:00 PM", event: "CEREMONY" },
    { time: "5:00 PM", event: "COCKTAIL" },
    { time: "6:30 PM", event: "DINNER" },
    { time: "10:00 PM", event: "DANCING & FIREWORKS" }
  ];

  return (
    <section 
      className="relative w-full py-20 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Section Title - Overlapping */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
        <h2 className="text-black font-cinzel text-2xl md:text-3xl font-bold uppercase tracking-wide">
          SCHEDULE
        </h2>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-title */}
        <div className="text-center mb-4">
          <p className="text-white text-xs md:text-sm font-sans uppercase tracking-wider">
            Here's a sneak peek of
          </p>
        </div>
        
        {/* Main title */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-white font-cinzel text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide">
            OUR SPECIAL DAY'S SCHEDULE
          </h3>
        </div>
        
        {/* Schedule Grid - Mobile: Single Column, Desktop: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {scheduleItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-3">
                <p className="text-white font-cinzel text-xl md:text-2xl lg:text-3xl font-bold">
                  {item.time}
                </p>
              </div>
              <div>
                <p className="text-white font-sans text-xs md:text-sm uppercase tracking-wider">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingSchedule;
