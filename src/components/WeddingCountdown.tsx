
import React, { useState, useEffect } from 'react';

const WeddingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2024-07-14T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-20 bg-black">
      {/* Optional background image */}
      <div className="absolute inset-0 opacity-20 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Elegant flowers"
          className="w-full h-full object-cover grayscale"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-widest text-gray-300 uppercase">
            LET THE COUNTDOWN BEGIN
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-6 md:space-x-12 text-white">
          <div className="text-center">
            <div className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-2">
              Days
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-2">
              Hours
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-2">
              Minutes
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-2">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCountdown;
