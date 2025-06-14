import React, { useState, useEffect } from "react";

const WeddingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2025-07-13T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the wedding date has passed, set all to 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-64 lg:py-96 bg-black">
      {/* Optional background image */}
      <div className="absolute inset-0 opacity-40 z-0">
        <img
          src="./time.jpg"
          alt="Elegant flowers"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text */}
        <div className="text-center mb-16">
          <p className="font-sans text-base md:text-lg lg:text-3xl tracking-widest text-gray-300 uppercase">
            LET THE COUNTDOWN BEGIN
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-12 sm:space-y-0 sm:space-x-8 md:space-x-16 text-white">
          <div className="text-center">
            <div className="font-cinzel text-6xl md:text-7xl lg:text-[12rem] font-bold">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="font-sans text-base md:text-lg lg:text-3xl uppercase tracking-widest text-gray-400 mt-4">
              Days
            </div>
          </div>

          <div className="text-center">
            <div className="font-cinzel text-6xl md:text-7xl lg:text-[12rem] font-bold">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="font-sans text-base md:text-lg lg:text-3xl uppercase tracking-widest text-gray-400 mt-4">
              Hours
            </div>
          </div>

          <div className="text-center">
            <div className="font-cinzel text-6xl md:text-7xl lg:text-[12rem] font-bold">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="font-sans text-base md:text-lg lg:text-3xl uppercase tracking-widest text-gray-400 mt-4">
              Minutes
            </div>
          </div>

          <div className="text-center">
            <div className="font-cinzel text-6xl md:text-7xl lg:text-[12rem] font-bold">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="font-sans text-base md:text-lg lg:text-3xl uppercase tracking-widest text-gray-400 mt-4">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCountdown;
