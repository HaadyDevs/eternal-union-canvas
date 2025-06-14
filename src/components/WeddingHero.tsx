
import React, { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { useImagePreloader } from "../hooks/useImagePreloader";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const WeddingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { ref: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

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

  // Track carousel scroll for mobile scaling effect
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        setScrollPosition(carouselRef.current.scrollLeft);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Calculate scale based on scroll position for mobile
  const getImageScale = (imageIndex: number) => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return 1;
    
    const carousel = carouselRef.current;
    if (!carousel) return 1;
    
    const scrollLeft = scrollPosition;
    const containerWidth = carousel.clientWidth;
    const imageWidth = 450; // Width of side images
    const gap = 48; // Gap between images (12 * 4px)
    
    // Calculate center positions for each image
    const leftImageCenter = 0;
    const centerImageCenter = imageWidth + gap;
    const rightImageCenter = (imageWidth + gap) * 2 + 250; // 250 is additional width for center image
    
    const centers = [leftImageCenter, centerImageCenter, rightImageCenter];
    const currentCenter = scrollLeft + containerWidth / 2;
    
    // Calculate distance from current scroll position to image center
    const distance = Math.abs(currentCenter - centers[imageIndex]);
    const maxDistance = imageWidth + gap;
    
    // Scale between 1.0 and 1.1 based on proximity to center
    const scale = Math.max(1.0, 1.1 - (distance / maxDistance) * 0.1);
    return Math.min(scale, 1.1);
  };

  return (
    <div 
      ref={heroRef as React.RefObject<HTMLDivElement>}
      className={`flex flex-col items-center bg-white lg:min-h-[90vh] lg:justify-center transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block w-full relative py-16 px-12">
        {/* Date Overlay - Centered over the grid, always one line */}
        <div className={`absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center pointer-events-none transition-all duration-1000 delay-300 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          <span className="font-cinzel text-[5vw] xl:text-[110px] font-medium text-black tracking-widest select-none whitespace-nowrap px-12 rounded">
            13&bull;07&bull;2025
          </span>
        </div>
        <div className="grid grid-cols-3 items-center relative z-10 w-full">
          {/* Left Photo */}
          <div className={`flex justify-end mr-44 transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <OptimizedImage
              src="/4.webp"
              alt="Wedding photo 1"
              className="w-[340px] h-[450px] grayscale shadow-lg hover:grayscale-0 hover:scale-105 transition-all duration-500"
              priority={true}
              sizes="340px"
            />
          </div>
          {/* Center Photo */}
          <div className={`flex flex-col items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <OptimizedImage
              src="/3.webp"
              alt="Couple portrait"
              className="w-[500px] h-[700px] grayscale shadow-lg hover:grayscale-0 hover:scale-105 transition-all duration-500"
              priority={true}
              sizes="500px"
            />
          </div>
          {/* Right Photo */}
          <div className={`flex justify-start ml-44 transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <OptimizedImage
              src="/5.webp"
              alt="Wedding photo 2"
              className="w-[340px] h-[450px] grayscale shadow-lg hover:grayscale-0 hover:scale-105 transition-all duration-500"
              priority={true}
              sizes="340px"
            />
          </div>
        </div>
      </div>
      
      {/* Subtitle */}
      <div className={`hidden lg:block text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="font-sans text-lg tracking-widest leading-relaxed text-black">
          JOIN US AS WE EMBARK ON A JOURNEY OF
          <br />
          LOVE, JOY, AND ETERNAL HAPPINESS.
        </p>
        <button
          className="font-sans text-sm md:text-lg mt-4 md:mt-8 uppercase tracking-wider bg-black text-white px-8 py-4 md:px-12 md:py-5 hover:bg-white hover:text-black border border-black transition-all duration-300 hover:scale-105 hover:shadow-lg animate-gentle-bounce"
        >
          RSVP Now
        </button>
      </div>

      {/* Mobile/Tablet Layout with Scroll-based Scaling */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center pt-16 pb-24">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative w-full overflow-x-auto mb-8 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex items-center justify-center gap-12 min-w-[160vw]">
            {/* Left Image with Dynamic Scaling */}
            <div 
              style={{ 
                width: "450px", 
                height: "208px",
                transform: `scale(${getImageScale(0)})`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <OptimizedImage
                src="/4.webp"
                alt="Wedding photo 1"
                className="w-full h-full grayscale transition-all duration-300"
                priority={true}
                sizes="(max-width: 768px) 450px, 450px"
              />
            </div>

            {/* Center Image with Date */}
            <div
              style={{ 
                width: "700px", 
                height: "384px",
                transform: `scale(${getImageScale(1)})`,
                transition: 'transform 0.3s ease-out'
              }}
              className="relative z-10"
            >
              <span className="absolute top-4 -left-5 -translate-x-1/2 font-cinzel text-5xl xs:text-4xl sm:text-5xl font-medium text-black tracking-widest select-none whitespace-nowrap py-1 rounded z-20 w-full">
                13&bull;07&bull;2025
              </span>
              <OptimizedImage
                src="/main.webp"
                alt="Couple portrait"
                className="w-full h-full grayscale transition-all duration-300"
                priority={true}
                sizes="(max-width: 768px) 700px, 700px"
              />
            </div>

            {/* Right Image with Dynamic Scaling */}
            <div 
              style={{ 
                width: "450px", 
                height: "208px",
                transform: `scale(${getImageScale(2)})`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <OptimizedImage
                src="/5.webp"
                alt="Wedding photo 2"
                className="w-full h-full grayscale transition-all duration-300"
                priority={true}
                sizes="(max-width: 768px) 450px, 450px"
              />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center px-4 animate-fade-in-up">
          <p className="font-sans text-sm tracking-widest leading-relaxed text-black">
            JOIN US AS WE EMBARK ON A JOURNEY OF LOVE, JOY, AND ETERNAL
            HAPPINESS.
          </p>
          <button
            className="font-sans text-sm uppercase tracking-wider bg-black text-white px-8 py-4 mt-8 hover:bg-white hover:text-black border border-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingHero;
