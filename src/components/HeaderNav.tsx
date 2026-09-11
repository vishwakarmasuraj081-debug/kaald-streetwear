import React from 'react';
import { motion } from 'motion/react';

export const HeaderNav: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15,
      }}
      className="fixed z-20 pointer-events-none top-4 right-4 lg:top-8 lg:right-8 w-auto lg:w-[330px] h-[30px] flex items-center justify-between"
      style={{
        mixBlendMode: 'exclusion',
        color: '#FFFFFF',
      }}
    >
      {/* ABOUT - hidden on mobile */}
      <span className="hidden lg:inline-block text-[15px] uppercase tracking-[-0.04em] font-medium">
        ABOUT
      </span>

      {/* Right controls: Hamburger + Cart */}
      <div className="flex items-center gap-5 lg:gap-[50px]">
        <svg
          className="w-6 h-6 lg:w-[30px] lg:h-[30px]"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Menu"
        >
          <path d="M0 14H40" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0 26H40" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>

        <span className="text-[13px] lg:text-[15px] uppercase tracking-[-0.04em] font-medium whitespace-nowrap">
          [ CART ]
        </span>
      </div>
    </motion.header>
  );
};
