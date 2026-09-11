import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="outro-footer"
      className="fixed z-20 pointer-events-none left-4 right-4 sm:right-auto bottom-6 lg:bottom-8 opacity-0 flex items-center justify-between lg:justify-start lg:gap-20"
      style={{
        mixBlendMode: 'exclusion',
        color: '#FFFFFF',
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      <span className="text-[11px] lg:text-[13px] uppercase tracking-[-0.02em] font-medium whitespace-nowrap">
        PRMPT (R) 2026
      </span>
      <span className="text-[11px] lg:text-[13px] uppercase tracking-[-0.02em] font-medium whitespace-nowrap">
        PRIVACY POLICY
      </span>
    </footer>
  );
};
