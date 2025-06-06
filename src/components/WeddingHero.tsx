import React from 'react';

const WeddingHero = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Couple Names */}
      <div className="text-center mb-4 sm:mb-12">
        <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-medium tracking-wider">
          SOPHIA & ALEXANDER
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden lg:block w-full max-w-6xl">
          <div className="grid grid-cols-3 items-center gap-8">
            {/* Left Photo */}
            <div className="flex justify-end">
              <div className="w-48 h-48 bg-gray-200 border">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&h=400" 
                  alt="Wedding photo 1"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center">
              {/* Wedding Date */}
              <div className="mb-8">
                <h2 className="font-cinzel text-5xl xl:text-6xl font-medium tracking-[0.3em]">
                  14 • 07 • 2024
                </h2>
              </div>
              
              {/* Main Portrait Photo */}
              <div className="w-64 h-80 mx-auto bg-gray-200 border mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=400&h=500" 
                  alt="Couple portrait"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Right Photo */}
            <div className="flex justify-start">
              <div className="w-48 h-48 bg-gray-200 border">
                <img 
                  src="https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&w=400&h=400" 
                  alt="Wedding photo 2"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-cinzel text-4xl font-medium tracking-[0.25em] mb-8">
              14 • 07 • 2024
            </h2>
          </div>
          
          <div className="flex justify-center items-start gap-6 mb-8">
            {/* Left Photo */}
            <div className="w-32 h-32 bg-gray-200 border mt-16">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&h=300" 
                alt="Wedding photo 1"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Main Portrait Photo */}
            <div className="w-48 h-60 bg-gray-200 border">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=300&h=375" 
                alt="Couple portrait"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Right Photo */}
            <div className="w-32 h-32 bg-gray-200 border mt-16">
              <img 
                src="https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&w=300&h=300" 
                alt="Wedding photo 2"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full max-w-sm">
          <div className="text-center mb-6">
            <h2 className="font-cinzel text-2xl font-medium tracking-[0.2em] mb-6">
              14 • 07 • 2024
            </h2>
          </div>
          
          <div className="space-y-4 relative">
            {/* Main Portrait Photo */}
            <div className="w-full aspect-[3/4] bg-gray-200 border relative">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=400&h=533" 
                alt="Couple portrait"
                className="w-full h-full object-cover grayscale"
              />
              
              {/* Overlapping Date */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 border">
                <h2 className="font-cinzel text-xl font-medium tracking-[0.2em] text-center">
                  14 • 07 • 2024
                </h2>
              </div>
            </div>

            {/* Side Photos */}
            <div className="flex gap-4 justify-center mt-8">
              <div className="w-24 h-24 bg-gray-200 border">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&h=200" 
                  alt="Wedding photo 1"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="w-24 h-24 bg-gray-200 border">
                <img 
                  src="https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&w=200&h=200" 
                  alt="Wedding photo 2"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-8 sm:mt-12 max-w-2xl">
          <p className="font-sans text-xs sm:text-sm uppercase tracking-widest leading-relaxed">
            Join us as we embark on a journey of love, joy, and eternal happiness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingHero;
