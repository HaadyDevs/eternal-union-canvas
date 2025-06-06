
import React from 'react';

const WeddingRegistryDressCode = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 max-w-6xl mx-auto px-4">
        {/* Registry Section */}
        <div className="flex-1 max-w-xs text-center mx-auto">
          <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-black mb-4 uppercase">
            REGISTRY
          </h3>
          <img 
            src="https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Registry" 
            className="w-full h-auto object-cover mb-4 grayscale rounded"
          />
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            While your presence at our wedding is the greatest gift, if you wish to share in our joy through a gift, please visit our registry.
          </p>
          <button className="bg-black text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Registry
          </button>
        </div>

        {/* Dress Code Section */}
        <div className="flex-1 max-w-xs text-center mx-auto">
          <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-black mb-4 uppercase">
            DRESS CODE
          </h3>
          <img 
            src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Dress Code" 
            className="w-full h-auto object-cover mb-4 grayscale rounded"
          />
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            We request cocktail attire for our celebration. Think elegant and refined, with darker colors preferred to complement our venue's atmosphere.
          </p>
          <button className="bg-black text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeddingRegistryDressCode;
