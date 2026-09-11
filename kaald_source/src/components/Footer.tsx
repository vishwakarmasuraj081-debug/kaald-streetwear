import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="outro-footer"
      className="fixed pointer-events-none z-20 left-4 bottom-[24px] lg:bottom-[32px] flex flex-row items-center justify-between sm:justify-start gap-[40px] lg:gap-[80px] opacity-0"
      style={{
        mixBlendMode: 'exclusion',
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        color: '#FFFFFF',
        letterSpacing: '-0.02em',
        willChange: 'opacity',
      }}
    >
      <span className="text-[11px] lg:text-[13px] uppercase select-none">
        PRMPT (R) 2026
      </span>
      <span className="text-[11px] lg:text-[13px] uppercase select-none">
        PRIVACY POLICY
      </span>
    </footer>
  );
};
