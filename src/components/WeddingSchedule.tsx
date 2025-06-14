import React from "react";
import {
  HeartHandshake,
  Utensils,
  PartyPopper,
  Camera,
  UtensilsCrossed,
  Coffee,
} from "lucide-react";

const WeddingSchedule = () => {
  const scheduleItems = [
    {
      time: "7 PM",
      title: "WE START",
      subtitle: "WELCOME GUESTS",
      icon: (
        <HeartHandshake
          size={32}
          className="text-white md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      ),
    },
    {
      time: "8:45 PM",
      title: "WE EAT",
      subtitle: "DINNER",
      icon: (
        <UtensilsCrossed
          size={32}
          className="text-white md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      ),
    },
    {
      time: "9:30 PM",
      title: "WE SHOOT",
      subtitle: "PHOTOGRAPHS",
      icon: (
        <Camera
          size={32}
          className="text-white md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      ),
    },
    {
      time: "10:30 PM",
      title: "WE SNACK",
      subtitle: "COFFEE TABLE",
      icon: (
        <Coffee
          size={32}
          className="text-white md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      ),
    },
  ];

  return (
    <section
      id="story"
      className="relative w-full py-20 md:py-32 lg:py-48 bg-cover grayscale bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/schedule.JPG')`,
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-title */}
        <div className="text-center mb-8">
          <p className="text-white text-sm md:text-base lg:text-lg font-sans uppercase tracking-wider">
            Here's a sneak peek of
          </p>
        </div>

        {/* Main title */}
        <div className="text-center mb-24">
          <h2 className="text-white font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
            OUR SPECIAL DAY'S Timeline
          </h2>
        </div>

        {/* Vertical Line */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white z-0"></div>

          <div className="flex flex-col gap-8">
            {scheduleItems.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center w-full">
                  {/* Left Side */}
                  <div
                    className={`w-1/2 ${
                      isLeft ? "pr-1" : "pl-1"
                    } flex justify-end`}
                  >
                    {isLeft ? (
                      <div className="text-white mr-4">{item.icon}</div>
                    ) : (
                      <div className="flex mt-6 flex-col items-start text-white">
                        <p className="font-cinzel text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                          {item.title}
                        </p>
                        <div className="border-t border-dotted border-white w-40 md:w-48 lg:w-56 my-1"></div>
                        <p className="text-sm md:text-base lg:text-lg font-sans uppercase tracking-wide">
                          {item.subtitle}
                        </p>
                        <p className="mt-3 text-base md:text-lg lg:text-xl font-cinzel">
                          {item.time}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"></div>

                  {/* Right Side */}
                  <div
                    className={`w-1/2 ${
                      isLeft ? "pl-1" : "pr-1"
                    } flex justify-start `}
                  >
                    {isLeft ? (
                      <div className="flex flex-col mt-6 items-end text-white ">
                        <p className="font-cinzel text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                          {item.title}
                        </p>
                        <div className="border-t border-dotted border-white w-40 md:w-48 lg:w-56 my-1"></div>
                        <p className="text-sm md:text-base lg:text-lg font-sans uppercase tracking-wide">
                          {item.subtitle}
                        </p>
                        <p className="mt-3 text-base md:text-lg lg:text-xl font-cinzel">
                          {item.time}
                        </p>
                      </div>
                    ) : (
                      <div className="text-white ml-4">{item.icon}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingSchedule;
