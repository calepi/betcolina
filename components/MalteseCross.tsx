import React from 'react';

export const MalteseCross: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0 L65 30 L95 20 L80 50 L95 80 L65 70 L50 100 L35 70 L5 80 L20 50 L5 20 L35 30 Z" />
    </svg>
  );
};