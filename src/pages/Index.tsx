
import React, { lazy, Suspense } from "react";
import WeddingNavigation from "../components/WeddingNavigation";
import WeddingHero from "../components/WeddingHero";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <WeddingNavigation />
      <WeddingHero />
      
      <AnimatedSection delay={100}>
        <Suspense fallback={<LoadingFallback />}>
          <WeddingSchedule />
        </Suspense>
      </AnimatedSection>
      
      <AnimatedSection delay={200}>
        <Suspense fallback={<LoadingFallback />}>
          <WeddingLocation />
        </Suspense>
      </AnimatedSection>
      
      <AnimatedSection delay={300}>
        <Suspense fallback={<LoadingFallback />}>
          <WeddingCountdown />
        </Suspense>
      </AnimatedSection>
      
      <AnimatedSection delay={400}>
        <Suspense fallback={<LoadingFallback />}>
          <WeddingRegistryDressCode />
        </Suspense>
      </AnimatedSection>
      
      <AnimatedSection delay={500}>
        <Suspense fallback={<LoadingFallback />}>
          <WeddingFooter />
        </Suspense>
      </AnimatedSection>
    </div>
  );
};

export default Index;
