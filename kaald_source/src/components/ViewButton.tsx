import React from 'react';

export const ViewButton: React.FC = () => {
  return (
    <div
      id="outro-buy"
      className="fixed pointer-events-none z-20 flex items-center justify-center bg-white rounded-[1335px] left-4 right-4 bottom-[60px] h-[100px] lg:left-auto lg:right-[32px] lg:bottom-[32px] lg:w-[330px] lg:h-[174px]"
      style={{
        mixBlendMode: 'exclusion',
        transformOrigin: 'right bottom',
        transform: 'scale(0)',
        willChange: 'transform',
      }}
    >
      <span
        className="text-[72px] lg:text-[110px] leading-none tracking-[-0.04em] text-white select-none"
        style={{
          mixBlendMode: 'exclusion',
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
        }}
      >
        view
      </span>
    </div>
  );
};
