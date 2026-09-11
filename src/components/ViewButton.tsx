import React from 'react';

export const ViewButton: React.FC = () => {
  return (
    <div
      id="outro-buy"
      className="fixed z-20 pointer-events-none flex items-center justify-center left-4 right-4 sm:left-auto sm:right-8 bottom-[60px] sm:bottom-8 sm:w-[330px] h-[100px] sm:h-[174px] bg-white rounded-[1335px]"
      style={{
        transformOrigin: 'right bottom',
        transform: 'scale(0)',
        mixBlendMode: 'exclusion',
      }}
    >
      <span
        className="text-[72px] sm:text-[110px] leading-none font-medium tracking-[-0.04em] text-white select-none"
        style={{
          mixBlendMode: 'exclusion',
        }}
      >
        view
      </span>
    </div>
  );
};
