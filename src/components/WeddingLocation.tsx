import React from "react";

const WeddingLocation = () => {
  return (
    <section id="travel" className="w-full py-24 md:py-32 bg-white">
      <div className="mx-auto sm:px-6 lg:px-64">
        {/* Section Title */}
        <h2 className="text-center font-cinzel text-6xl md:text-7xl font-bold uppercase tracking-wide text-black -mb-20 z-50 relative">
          LOCATION
        </h2>

        {/* Location Details and Image Container */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mx-auto mb-8 relative">
          {/* Left Location Details */}
          <div className="text-center md:text-left mb-4 md:mb-0 md:w-1/4 md:pr-16 order-2 md:order-1 relative z-20">
            <p className="font-sans text-lg uppercase tracking-wider text-black">
              Windsor Castle
            </p>
          </div>

          {/* Center Image */}
          <div className="md:w-2/4 flex justify-center mb-8 md:mb-0 order-1 md:order-2 relative z-10">
            <img
              src="/location.webp"
              alt="Windsor Castle"
              className="w-64 md:w-96 object-cover opacity-90 grayscale"
            />
          </div>

          {/* Right Location Details */}
          <div className="text-center md:text-right md:w-1/4 md:pl-16 order-3 md:order-3 relative z-20">
            <p className="font-sans text-lg uppercase tracking-wider text-black">
              292 Attidiya Rd
            </p>
            <p className="font-sans text-lg uppercase tracking-wider text-black">
              Dehiwala-Mount Lavinia
            </p>
          </div>
        </div>

        {/* Travel & Stay Button */}
        <div className="text-center">
          <button className="font-sans text-sm md:text-lg mt-4 md:mt-8 uppercase tracking-wider bg-black text-white px-8 py-4 md:px-12 md:py-5 hover:bg-white hover:text-black border border-black transition-colors">
            Open in Maps
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeddingLocation;
