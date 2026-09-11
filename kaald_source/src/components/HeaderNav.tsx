import React from 'react';
import { motion } from 'motion/react';

export const HeaderNav: React.FC = () => {
  return (
    <motion.header
      id="header-nav"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15,
      }}
      className="fixed z-20 pointer-events-none top-4 right-4 sm:top-8 sm:right-8 w-auto lg:w-[330px] h-[30px] flex flex-row items-center justify-between"
      style={{
        mixBlendMode: 'exclusion',
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        color: '#FFFFFF',
      }}
    >
      {/* "ABOUT" - hidden on mobile (<640px) */}
      <span className="hidden sm:inline-block text-[15px] uppercase tracking-[-0.04em] select-none">
        ABOUT
      </span>

      {/* Hamburger & [ CART ] flex container */}
      <div className="flex flex-row items-center gap-[20px] lg:gap-[50px]">
        {/* Hamburger SVG Icon: viewBox 0 0 40 40, M0 14H40 & M0 26H40 */}
        <svg
          viewBox="0 0 40 40"
          className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Menu"
        >
          <path d="M0 14H40" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0 26H40" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>

        {/* "[ CART ]" text */}
        <span className="text-[13px] lg:text-[15px] tracking-[-0.04em] select-none">
          [ CART ]
        </span>
      </div>
    </motion.header>
  );
};
