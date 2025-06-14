
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface OptimizedBackgroundProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
}

const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({
  src,
  children,
  className,
  priority = false,
  overlay = false,
  overlayOpacity = 0.7,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Background image */}
      {isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${src})`,
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Overlay */}
      {overlay && isLoaded && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default OptimizedBackground;
