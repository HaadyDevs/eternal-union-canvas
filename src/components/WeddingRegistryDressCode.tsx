import React from "react";

const WeddingRegistryDressCode = () => {
  return (
    <section id="gifts" className="py-24 md:py-32 bg-white">
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 w-full max-w-[2000px] mx-auto px-4">
        {/* Registry Section */}
        <div className="flex-1 w-full text-center mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mx-auto mb-6 md:mb-16 relative">
            {/* Left Text */}
            <div className="text-center md:text-right mb-4 md:mb-0 md:w-1/4 md:pr-24 order-2 md:order-1 relative z-20">
              <p className="font-sans text-sm md:text-lg uppercase tracking-wider text-black text-center">
                Your presence on our special day is the biggest gift we could
                ask for — truly, no gifts are necessary! But for those
                wonderfully stubborn ones ;) you can contribute to our Honeymoon
                Fund and help us make unforgettable memories.
              </p>
            </div>

            {/* Center Image */}
            <div className="md:w-2/5 flex justify-center mb-8 md:mb-0 order-1 md:order-2 relative z-10">
              <div className="relative">
                <h3 className="text-5xl md:text-7xl font-cinzel font-bold text-black absolute -top-5 left-1/2 transform -translate-x-1/2 z-20 uppercase">
                  GIFTS
                </h3>
                <img
                  src="https://emmalinebride.com/wp-content/uploads/2022/05/origami-wedding-card-for-money-gift.webp"
                  alt="Registry"
                  className="w-72 md:w-[1000px] object-cover grayscale rounded"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="text-center md:text-left md:w-1/4 md:pl-24 order-3 md:order-3 relative z-20">
              <p className="font-sans text-sm md:text-lg uppercase tracking-wider text-black text-center">
                If however it's just a gift you find, please be assured we will
                not mind!
              </p>
            </div>
          </div>

          <button className="font-sans text-sm md:text-lg mt-4 md:mt-8 uppercase tracking-wider bg-black text-white px-8 py-4 md:px-12 md:py-5 hover:bg-white hover:text-black border border-black transition-colors">
            Contribute to Honeymoon Fund
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeddingRegistryDressCode;
