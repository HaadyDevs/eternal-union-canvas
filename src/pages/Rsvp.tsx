import React, { useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import RsvpForm from "../components/RsvpForm";
import OptimizedBackground from "../components/OptimizedBackground";
import { Link, useNavigate } from "react-router-dom";

const Rsvp = () => {
  const { ref: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const navigate = useNavigate();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="w-full py-6 lg:pt-12 px-4 flex justify-between items-center sm:px-8 relative z-50 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="text-black hover:text-gray-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex-1 flex justify-center items-center">
          <h1 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide">
            Haady & Nizra
          </h1>
        </div>
        <div className="w-8"></div> {/* Spacer to balance the back button */}
      </nav>

      {/* Hero Section with Background */}
      <OptimizedBackground
        src="https://img.freepik.com/premium-photo/details-wedding-decor-forest-open-air_303941-1191.jpg"
        className="min-h-[40vh] lg:min-h-[50vh]"
        overlay={true}
        overlayOpacity={0.7}
        priority={true}
      >
        <div
          ref={heroRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col items-center justify-center min-h-[40vh] lg:min-h-[50vh] w-full transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="text-center text-white max-w-4xl px-4">
            <h2
              className={`font-cinzel text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-widest transition-all duration-700 delay-200 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
            >
              RSVP
            </h2>
            <p
              className={`font-sans text-base md:text-xl tracking-wider leading-relaxed transition-all duration-700 delay-400 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              WE WOULD BE HONORED BY YOUR PRESENCE ON OUR SPECIAL DAY
            </p>
          </div>
        </div>
      </OptimizedBackground>

      {/* RSVP Form Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-3xl md:text-4xl font-medium mb-4 tracking-wide">
              Please Respond
            </h3>
            <p className="font-sans text-base tracking-wider text-gray-600 leading-relaxed">
              Kindly confirm your attendance by filling out the form below.
            </p>
          </div>

          <RsvpForm />
        </div>
      </div>

      {/* Wedding Date Reminder */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-cinzel text-5xl md:text-3xl font-medium mb-4 tracking-widest">
            13•07•2025
          </p>
          <p className="font-sans text-lg tracking-wider text-gray-600">
            Save the date and join us for a day of love and celebration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rsvp;
