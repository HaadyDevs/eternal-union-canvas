
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  isVisible: boolean;
  onClick?: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
      onClick={onClick}
    >
      <div className="animate-bounce">
        <ChevronDown 
          size={28} 
          className="text-black/70 hover:text-black transition-colors duration-300" 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
