
import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" 
         onMouseEnter={() => setIsVisible(true)} 
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
          {title && <div className="font-bold border-b border-slate-600 pb-1 mb-1 uppercase tracking-wider">{title}</div>}
          <div className="leading-relaxed">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
