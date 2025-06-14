
import React, { useEffect, useRef, lazy } from "react";
import OptimizedImage from "./OptimizedImage";
import { useImagePreloader } from "../hooks/useImagePreloader";

// Lazy load motion components to reduce initial bundle
const motion = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion })));
const useInView = lazy(() => import('framer-motion').then(mod => ({ default: mod.useInView })));

const WeddingHero = () => {
  const leftRef = React.useRef(null);
  const rightRef = React.useRef(null);
  const containerRef = useRef(null);

  // Preload critical hero images
  useImagePreloader({
    images: ["/main.webp", "/4.webp", "/5.webp"],
    priority: true
  });

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollLeft = (scrollWidth - clientWidth) / 2;
      container.scrollLeft = scrollLeft;
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-white lg:min-h-[90vh] lg:justify-center">
      {/* Desktop Layout */}
      <div className="hidden lg:block w-full relative py-16 px-12">
        {/* Date Overlay - Centered over the grid, always one line */}
        <div className="absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center pointer-events-none">
          <span className="font-cinzel text-[5vw] xl:text-[110px] font-medium text-black tracking-widest select-none whitespace-nowrap px-12 rounded">
            13&bull;07&bull;2025
          </span>
        </div>
        <div className="grid grid-cols-3 items-center relative z-10 w-full">
          {/* Left Photo */}
          <div className="flex justify-end mr-44">
            <OptimizedImage
              src="/4.webp"
              alt="Wedding photo 1"
              className="w-[340px] h-[450px] grayscale shadow-lg"
              priority={true}
              sizes="340px"
            />
          </div>
          {/* Center Photo */}
          <div className="flex flex-col items-center justify-center">
            <OptimizedImage
              src="/3.webp"
              alt="Couple portrait"
              className="w-[500px] h-[700px] grayscale shadow-lg"
              priority={true}
              sizes="500px"
            />
          </div>
          {/* Right Photo */}
          <div className="flex justify-start ml-44">
            <OptimizedImage
              src="/5.webp"
              alt="Wedding photo 2"
              className="w-[340px] h-[450px] grayscale shadow-lg"
              priority={true}
              sizes="340px"
            />
          </div>
        </div>
      </div>
      
      {/* Subtitle */}
      <div className="hidden lg:block text-center mt-12">
        <p className="font-sans text-lg tracking-widest leading-relaxed text-black">
          JOIN US AS WE EMBARK ON A JOURNEY OF
          <br />
          LOVE, JOY, AND ETERNAL HAPPINESS.
        </p>
        <button
          className="font-sans text-sm md:text-lg mt-4 md:mt-8 uppercase tracking-wider bg-black text-white px-8 py-4 md:px-12 md:py-5 hover:bg-white hover:text-black border border-black transition-colors"
        >
          RSVP Now
        </button>
      </div>

      {/* Mobile/Tablet Layout - Simplified without heavy animations */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center pt-16 pb-24">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-x-auto mb-8 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex items-center justify-center gap-12 min-w-[160vw]">
            {/* Left Image */}
            <div style={{ width: "450px", height: "208px" }}>
              <OptimizedImage
                src="/4.webp"
                alt="Wedding photo 1"
                className="w-full h-full grayscale"
                priority={true}
                sizes="(max-width: 768px) 450px, 450px"
              />
            </div>

            {/* Center Image with Date */}
            <div
              style={{ width: "700px", height: "384px" }}
              className="relative z-10"
            >
              <span className="absolute top-4 -left-5 -translate-x-1/2 font-cinzel text-5xl xs:text-4xl sm:text-5xl font-medium text-black tracking-widest select-none whitespace-nowrap py-1 rounded z-20 w-full">
                13&bull;07&bull;2025
              </span>
              <OptimizedImage
                src="/main.webp"
                alt="Couple portrait"
                className="w-full h-full grayscale"
                priority={true}
                sizes="(max-width: 768px) 700px, 700px"
              />
            </div>

            {/* Right Image */}
            <div style={{ width: "450px", height: "208px" }}>
              <OptimizedImage
                src="/5.webp"
                alt="Wedding photo 2"
                className="w-full h-full grayscale"
                priority={true}
                sizes="(max-width: 768px) 450px, 450px"
              />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center px-4">
          <p className="font-sans text-sm tracking-widest leading-relaxed text-black">
            JOIN US AS WE EMBARK ON A JOURNEY OF LOVE, JOY, AND ETERNAL
            HAPPINESS.
          </p>
          <button
            className="font-sans text-sm uppercase tracking-wider bg-black text-white px-8 py-4 mt-8 hover:bg-white hover:text-black border border-black transition-colors"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingHero;
