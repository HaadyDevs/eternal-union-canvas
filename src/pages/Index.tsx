
import React from 'react';
import WeddingNavigation from '../components/WeddingNavigation';
import WeddingHero from '../components/WeddingHero';
import WeddingSchedule from '../components/WeddingSchedule';
import WeddingLocation from '../components/WeddingLocation';
import WeddingCountdown from '../components/WeddingCountdown';
import WeddingRegistryDressCode from '../components/WeddingRegistryDressCode';
import WeddingFooter from '../components/WeddingFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <WeddingNavigation />
      <WeddingHero />
      <WeddingSchedule />
      <WeddingLocation />
      <WeddingCountdown />
      <WeddingRegistryDressCode />
      <WeddingFooter />
    </div>
  );
};

export default Index;
