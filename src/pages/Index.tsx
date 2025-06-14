
import React, { lazy } from "react";
import WeddingNavigation from "../components/WeddingNavigation";
import WeddingHero from "../components/WeddingHero";
import LazyComponent from "../components/LazyComponent";

// Lazy load heavy components
const WeddingSchedule = lazy(() => import("../components/WeddingSchedule"));
const WeddingLocation = lazy(() => import("../components/WeddingLocation"));
const WeddingCountdown = lazy(() => import("../components/WeddingCountdown"));
const WeddingRegistryDressCode = lazy(() => import("../components/WeddingRegistryDressCode"));
const WeddingFooter = lazy(() => import("../components/WeddingFooter"));

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <WeddingNavigation />
      <WeddingHero />
      
      <LazyComponent>
        <WeddingSchedule />
      </LazyComponent>
      
      <LazyComponent>
        <WeddingLocation />
      </LazyComponent>
      
      <LazyComponent>
        <WeddingCountdown />
      </LazyComponent>
      
      <LazyComponent>
        <WeddingRegistryDressCode />
      </LazyComponent>
      
      <LazyComponent>
        <WeddingFooter />
      </LazyComponent>
    </div>
  );
};

export default Index;
