import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ProductInfo: React.FC = () => {
  const [outroOffset, setOutroOffset] = useState<number>(166);

  useEffect(() => {
    const updateOffset = () => {
      setOutroOffset(window.innerWidth < 640 ? 132 : 166);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (
    <motion.div
      id="outro-info"
      data-outro-offset={outroOffset}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.45,
      }}
      className="fixed pointer-events-none z-20 flex flex-col items-center bottom-[48px] left-0 right-0 lg:left-auto lg:right-[32px] lg:bottom-[80px] lg:w-[330px]"
      style={{
        mixBlendMode: 'exclusion',
        color: '#FFFFFF',
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
      }}
    >
      {/* Top block */}
      <div className="flex flex-col items-start w-[252px] lg:w-full mb-[12px] lg:mb-[32px]">
        {/* Circle Icon */}
        <div className="relative w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] flex items-center justify-center mb-2 lg:mb-3">
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full absolute inset-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="18.75"
              stroke="#FFFFFF"
              className="stroke-[2px] lg:stroke-[2.5px]"
            />
          </svg>
          <span
            id="circle-symbol"
            className="relative z-10 text-[10px] lg:text-[15px] leading-none uppercase tracking-[-0.04em] text-white select-none"
          >
            8
          </span>
        </div>

        {/* Collection label */}
        <div className="text-[20px] lg:text-[30px] leading-[100%] tracking-[-0.04em] uppercase text-white select-none">
          ARCHIVE COLLECTION
          <br />
          &ldquo;PROMPT&rdquo;
        </div>
      </div>

      {/* Price */}
      <div className="text-[60px] lg:text-[80px] leading-[100%] tracking-[-0.04em] text-white select-none text-center">
        $97,33
      </div>
    </motion.div>
  );
};
