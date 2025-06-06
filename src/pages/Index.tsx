
import React from 'react';
import WeddingNavigation from '../components/WeddingNavigation';
import WeddingHero from '../components/WeddingHero';
import WeddingSchedule from '../components/WeddingSchedule';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <WeddingNavigation />
      <WeddingHero />
      <WeddingSchedule />
    </div>
  );
};

export default Index;
