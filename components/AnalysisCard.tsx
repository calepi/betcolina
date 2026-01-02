import React from 'react';

interface AnalysisCardProps {
  title: string;
  content: string;
  variant?: 'default' | 'danger' | 'warning' | 'primary';
  icon?: React.ReactNode;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, content, variant = 'default', icon }) => {
  if (!content) return null;

  const getBorderColor = () => {
    switch (variant) {
      case 'danger': return 'border-vasco-red';
      case 'warning': return 'border-yellow-500';
      case 'primary': return 'border-vasco-black';
      default: return 'border-gray-200';
    }
  };

  const getHeaderBg = () => {
    switch (variant) {
      case 'danger': return 'bg-vasco-red text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      case 'primary': return 'bg-vasco-black text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to render bold text from markdown (**)
  const renderFormattedContent = (text: string) => {
    // Regex matches **content** allowing for newlines ([\s\S]) and is non-greedy (+?)
    const parts = text.split(/(\*\*[\s\S]+?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        // Remove the ** asterisks and render as strong
        return (
          <strong key={index} className="font-bold text-vasco-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`bg-white rounded-none shadow-md overflow-hidden border-l-4 ${getBorderColor()} mb-6`}>
      <div className={`px-6 py-3 font-display font-bold uppercase tracking-wide text-sm flex items-center gap-2 ${getHeaderBg()}`}>
        {icon}
        {title}
      </div>
      <div className="p-6 text-gray-800 whitespace-pre-wrap leading-relaxed font-sans text-sm md:text-base">
        {renderFormattedContent(content)}
      </div>
    </div>
  );
};