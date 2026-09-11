import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

export const ProductInfo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Throttled symbol switcher on scroll
    let lastTime = 0;
    const symbolEl = document.getElementById('circle-symbol');

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastTime >= 80) {
        lastTime = now;
        if (symbolEl) {
          const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          symbolEl.textContent = randomSymbol;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      id="outro-info"
      data-outro-offset={isMobile ? '132' : '166'}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.45,
      }}
      className="fixed z-20 pointer-events-none flex flex-col items-center left-0 right-0 sm:left-auto sm:right-8 bottom-12 sm:bottom-20 w-full sm:w-[330px]"
      style={{
        mixBlendMode: 'exclusion',
        color: '#FFFFFF',
      }}
    >
      {/* Top block */}
      <div className="flex flex-col items-start w-[252px] sm:w-full mb-3 sm:mb-8">
        {/* Circle icon */}
        <div className="relative w-5 h-5 sm:w-[30px] sm:h-[30px] flex items-center justify-center mb-3 sm:mb-4">
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="18.75"
              stroke="#FFFFFF"
              strokeWidth={isMobile ? 2 : 2.5}
            />
          </svg>
          <span
            id="circle-symbol"
            className="text-[10px] sm:text-[15px] uppercase font-medium tracking-[-0.04em] text-white select-none leading-none"
          >
            8
          </span>
        </div>

        {/* Collection label */}
        <div className="w-full text-center text-[20px] sm:text-[30px] leading-none uppercase font-medium tracking-[-0.04em] text-white whitespace-pre-line">
          ARCHIVE COLLECTION{'\n'}&quot;PROMPT&quot;
        </div>
      </div>

      {/* Price */}
      <div className="text-center text-[60px] sm:text-[80px] leading-none font-medium tracking-[-0.04em] text-white">
        $97,33
      </div>
    </motion.div>
  );
};
