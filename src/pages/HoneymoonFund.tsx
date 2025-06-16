import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import HoneymoonFundForm from "../components/HoneymoonFundForm";
import OptimizedBackground from "../components/OptimizedBackground";
import { useNavigate, useSearchParams } from "react-router-dom";

const HoneymoonFund = () => {
  const { ref: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentSuccess = searchParams.get('paymentSuccess') === 'true';

  // If payment was successful, show thank you page
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white text-black overflow-x-hidden">
        {/* Navigation Header */}
        <nav className="w-full py-6 lg:pt-12 px-4 flex justify-between items-center sm:px-8 relative z-50 bg-white">
          <button
            onClick={() => navigate("/")}
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
          <div className="w-8"></div>
        </nav>

        {/* Thank You Hero Section */}
        <OptimizedBackground
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          className="min-h-[60vh] grayscale lg:min-h-[70vh]"
          overlay={true}
          overlayOpacity={0.6}
          priority={true}
        >
          <div className="flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[70vh] w-full">
            <div className="text-center text-white max-w-4xl px-4">
              <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-widest animate-fade-in">
                THANK YOU
              </h2>
              <p className="font-sans text-lg md:text-xl tracking-wider leading-relaxed mb-8 animate-fade-in-up">
                FROM THE BOTTOM OF OUR HEARTS
              </p>
            </div>
          </div>
        </OptimizedBackground>

        {/* Heartfelt Message Section */}
        <div className="py-16 lg:py-24 px-4 sm:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h3 className="font-cinzel text-3xl md:text-4xl font-medium mb-8 tracking-wide">
                Your love and generosity mean the world to us.
              </h3>
              <div className="space-y-6 font-sans text-lg md:text-xl tracking-wider text-gray-700 leading-relaxed">
                <p>
                  

Thank you so much for your kind contribution to our journey. Knowing that you're part of this special chapter brings us so much joy and gratitude. Every gift, thought, and prayer is a piece of love that we'll carry with us forever.

We feel incredibly blessed to have you in our lives.

With all our love,
[Your Names]
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => navigate("/")}
              className="font-sans text-sm md:text-lg uppercase tracking-wider bg-black text-white px-12 py-5 hover:bg-white hover:text-black border border-black transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-gray-50 py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="font-cinzel text-xl md:text-2xl font-medium mb-2 tracking-widest">
              With Endless Gratitude
            </p>
            <p className="font-cinzel text-2xl md:text-3xl font-bold tracking-wider text-black">
              Haady & Nizra
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="w-8"></div>
      </nav>

      {/* Hero Section with Background */}
      <OptimizedBackground
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
        className="min-h-[40vh] grayscale lg:min-h-[50vh]"
        overlay={true}
        overlayOpacity={0.6}
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
              HONEYMOON FUND
            </h2>
            <p
              className={`font-sans text-lg md:text-xl tracking-wider leading-relaxed transition-all duration-700 delay-400 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              HELP US CREATE UNFORGETTABLE MEMORIES ON OUR JOURNEY TOGETHER
            </p>
          </div>
        </div>
      </OptimizedBackground>

      {/* Contribution Form Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-3xl md:text-4xl font-medium mb-4 tracking-wide">
              Your Contribution
            </h3>
            <p className="font-sans text-lg tracking-wider text-gray-600 leading-relaxed">
              Your generous contribution will help us embark on the adventure of a lifetime.
              <br />
              Every gift, no matter the size, means the world to us.
            </p>
          </div>

          <HoneymoonFundForm />
        </div>
      </div>

      {/* Thank You Section */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-cinzel text-2xl md:text-3xl font-medium mb-4 tracking-widest">
            THANK YOU
          </p>
          <p className="font-sans text-lg tracking-wider text-gray-600">
            From the bottom of our hearts, we appreciate your love and support
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoneymoonFund;
