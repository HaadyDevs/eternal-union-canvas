
import React, { Suspense } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = (
    <div className="w-full py-16 flex justify-center items-center">
      <div className="animate-pulse bg-gray-200 rounded w-32 h-8"></div>
    </div>
  )
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyComponent;
