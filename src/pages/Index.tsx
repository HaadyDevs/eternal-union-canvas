
import React, { lazy, Suspense } from "react";
import WeddingNavigation from "../components/WeddingNavigation";
import WeddingHero from "../components/WeddingHero";

// Lazy load components with error boundaries
const WeddingSchedule = lazy(() => 
  import("../components/WeddingSchedule").catch(() => ({
    default: () => <div className="w-full py-16 text-center">Schedule content unavailable</div>
  }))
);

const WeddingLocation = lazy(() => 
  import("../components/WeddingLocation").catch(() => ({
    default: () => <div className="w-full py-16 text-center">Location content unavailable</div>
  }))
);

const WeddingCountdown = lazy(() => 
  import("../components/WeddingCountdown").catch(() => ({
    default: () => <div className="w-full py-16 text-center">Countdown content unavailable</div>
  }))
);

const WeddingRegistryDressCode = lazy(() => 
  import("../components/WeddingRegistryDressCode").catch(() => ({
    default: () => <div className="w-full py-16 text-center">Registry content unavailable</div>
  }))
);

const WeddingFooter = lazy(() => 
  import("../components/WeddingFooter").catch(() => ({
    default: () => <div className="w-full py-16 text-center">Footer content unavailable</div>
  }))
);

const LoadingFallback = () => (
  <div className="w-full py-16 flex justify-center items-center">
    <div className="animate-pulse bg-gray-200 rounded w-32 h-8"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <WeddingNavigation />
      <WeddingHero />
      
      <Suspense fallback={<LoadingFallback />}>
        <WeddingSchedule />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <WeddingLocation />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <WeddingCountdown />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <WeddingRegistryDressCode />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <WeddingFooter />
      </Suspense>
    </div>
  );
};

export default Index;
