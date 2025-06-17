import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    priority: true,
  });

  // Center the carousel on initial load
  useEffect(() => {
    if (carouselRef.current && window.innerWidth < 1024) {
      const carousel = carouselRef.current;
      const viewportWidth = window.innerWidth;
      const sideImageWidth = 240;
      const centerImageWidth = 280;
      const gap = 48;
      const sidePadding = viewportWidth * 0.15; // 15vw padding on each side

      // Calculate the position that will center the middle image
      // We want the middle image to be centered in the viewport
      const centerPosition =
        sidePadding +
        sideImageWidth +
        gap -
        (viewportWidth - centerImageWidth) / 2;

      carousel.scrollLeft = centerPosition;
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
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Calculate scale based on scroll position for mobile side images only
  const getSideImageScale = (imageIndex: number) => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return 1;

    const carousel = carouselRef.current;
    if (!carousel) return 1;

    // Don't scale the center image (index 1)
    if (imageIndex === 1) return 1;

    const scrollLeft = scrollPosition;
    const containerWidth = carousel.clientWidth;
    const viewportWidth = window.innerWidth;

    // Image dimensions
    const sideImageWidth = 240;
    const centerImageWidth = 280;
    const gap = 48;

    // Calculate the position of each image
    const leftImagePosition = 0;
    const centerImagePosition = sideImageWidth + gap;
    const rightImagePosition = sideImageWidth + gap + centerImageWidth + gap;

    // Calculate the viewport center
    const viewportCenter = scrollLeft + containerWidth / 2;

    // Determine which image to scale
    let targetPosition;
    if (imageIndex === 0) {
      targetPosition = leftImagePosition;
    } else if (imageIndex === 2) {
      targetPosition = rightImagePosition;
    } else {
      return 1;
    }

    // Calculate distance from viewport center to image center
    const distance = Math.abs(
      viewportCenter - (targetPosition + sideImageWidth / 2)
    );
    const maxDistance = sideImageWidth * 1.5; // Increased range for smoother scaling

    // Scale up when image is closer to center (inverse relationship)
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const scale = 1 + (1 - normalizedDistance) * 0.2; // Increased scale factor for more noticeable effect

    return Math.max(1, Math.min(scale, 1.2));
  };

  // Calculate grayscale filter based on scroll position
  const getGrayscaleFilter = (imageIndex: number) => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return 1;

    const carousel = carouselRef.current;
    if (!carousel) return 1;

    // Don't apply to center image
    if (imageIndex === 1) return 1;

    const scrollLeft = scrollPosition;
    const containerWidth = carousel.clientWidth;
    const viewportWidth = window.innerWidth;

    // Image dimensions
    const sideImageWidth = 240;
    const centerImageWidth = 280;
    const gap = 48;

    // Calculate the position of each image
    const leftImagePosition = 0;
    const centerImagePosition = sideImageWidth + gap;
    const rightImagePosition = sideImageWidth + gap + centerImageWidth + gap;

    // Calculate the viewport center
    const viewportCenter = scrollLeft + containerWidth / 2;

    // Determine which image to process
    let targetPosition;
    if (imageIndex === 0) {
      targetPosition = leftImagePosition;
    } else if (imageIndex === 2) {
      targetPosition = rightImagePosition;
    } else {
      return 1;
    }

    // Calculate distance from viewport center to image center
    const distance = Math.abs(
      viewportCenter - (targetPosition + sideImageWidth / 2)
    );
    const maxDistance = sideImageWidth * 1.5;

    // Grayscale increases as image moves away from center
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    return normalizedDistance;
  };

  return (
    <div
      ref={heroRef as React.RefObject<HTMLDivElement>}
      className={`flex flex-col items-center bg-white lg:min-h-[90vh] lg:justify-center transition-all duration-1000 overflow-x-hidden ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block w-full relative py-16 px-12">
        {/* Date Overlay - Centered over the grid, always one line */}
        <div
          className={`absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center pointer-events-none transition-all duration-1000 delay-300 ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          <span className="font-cinzel text-[5vw] xl:text-[110px] font-medium text-black tracking-widest select-none whitespace-nowrap px-12 rounded">
            13&bull;07&bull;2025
          </span>
        </div>
        <div className="grid grid-cols-3 items-center relative z-10 w-full">
          {/* Left Photo */}
          <div
            className={`flex justify-end mr-44 transition-all duration-700 delay-100 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <OptimizedImage
              src="/4.webp"
              alt="Wedding photo 1"
              className="w-[340px] h-[450px] grayscale shadow-lg hover:grayscale-0 hover:scale-105 transition-all duration-500"
              priority={true}
              sizes="340px"
            />
          </div>
          {/* Center Photo */}
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 delay-200 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <OptimizedImage
              src="/3.webp"
              alt="Couple portrait"
              className="w-[500px] h-[700px] grayscale shadow-lg hover:grayscale-0 hover:scale-105 transition-all duration-500"
              priority={true}
              sizes="500px"
            />
          </div>
          {/* Right Photo */}
          <div
            className={`flex justify-start ml-44 transition-all duration-700 delay-100 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
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
      <div
        className={`hidden lg:block text-center mt-12 transition-all duration-700 delay-500 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <p className="font-sans text-lg tracking-widest leading-relaxed text-black">
          JOIN US AS WE EMBARK ON A JOURNEY OF
          <br />
          LOVE, JOY, AND ETERNAL HAPPINESS.
        </p>
        <Link to="/rsvp">
          <button className="font-sans text-sm md:text-lg mt-4 md:mt-8 uppercase tracking-wider bg-black text-white px-8 py-4 md:px-12 md:py-5 hover:bg-white hover:text-black border border-black transition-all duration-300 hover:scale-105 hover:shadow-lg animate-gentle-bounce">
            RSVP Now
          </button>
        </Link>
      </div>

      {/* Mobile/Tablet Layout with Scroll-based Scaling */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center pt-16 pb-24 overflow-x-hidden">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative w-screen items-center overflow-x-auto mb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex items-center gap-12 min-w-max px-[15vw]">
            {/* Left Image with Dynamic Scaling - Smaller width, taller height */}
            <div
              style={{
                width: "240px",
                height: "240px",
                flexShrink: 0,
                transform: `scale(${getSideImageScale(0)})`,
                transition: "transform 0.3s ease-out",
                transformOrigin: "center",
              }}
            >
              <OptimizedImage
                src="/4.webp"
                alt="Wedding photo 1"
                className={`w-full h-full transition-all duration-300 ${
                  getGrayscaleFilter(0) > 0.5 ? "grayscale" : ""
                }`}
                priority={true}
                sizes="(max-width: 768px) 240px, 240px"
              />
            </div>

            {/* Center Image - Smaller width, taller height, with Date */}
            <div
              style={{
                width: "280px",
                height: "450px",
                flexShrink: 0,
              }}
              className="relative z-10"
            >
              <span className="absolute top-4 left-1/2 -translate-x-1/2 font-cinzel text-[clamp(3.5rem,4vw,2.5rem)] xs:text-5xl sm:text-6xl font-medium text-black tracking-widest select-none whitespace-nowrap py-1 rounded z-20">
                13&bull;07&bull;2025
              </span>
              <OptimizedImage
                src="/main.webp"
                alt="Couple portrait"
                className="w-full h-full grayscale transition-all duration-300"
                priority={true}
                sizes="(max-width: 768px) 500px, 500px"
              />
            </div>

            {/* Right Image with Dynamic Scaling - Smaller width, taller height */}
            <div
              style={{
                width: "240px",
                height: "240px",
                flexShrink: 0,
                transform: `scale(${getSideImageScale(2)})`,
                transition: "transform 0.3s ease-out",
                transformOrigin: "center",
              }}
            >
              <OptimizedImage
                src="/5.webp"
                alt="Wedding photo 2"
                className={`w-full h-full transition-all duration-300 ${
                  getGrayscaleFilter(2) > 0.5 ? "grayscale" : ""
                }`}
                priority={true}
                sizes="(max-width: 768px) 240px, 240px"
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
          <Link to="/rsvp">
            <button className="font-sans text-sm uppercase tracking-wider bg-black text-white px-8 py-4 mt-8 hover:bg-white hover:text-black border border-black transition-all duration-300 hover:scale-105 hover:shadow-lg">
              RSVP Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingHero;
