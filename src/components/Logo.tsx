import React from 'react';
import { motion } from 'motion/react';

export const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0,
      }}
      className="fixed z-20 pointer-events-none top-4 left-4 lg:top-8 lg:left-8 w-[124px] sm:w-[266px] lg:w-[355px]"
      style={{ mixBlendMode: 'exclusion' }}
      aria-label="prmpt"
    >
      <svg
        viewBox="0 0 355 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Crisp vector paths for the wordmark "prmpt" */}
        <text
          x="0"
          y="82"
          fill="#FFFFFF"
          fontFamily="'Inter Tight', sans-serif"
          fontWeight="700"
          fontSize="86"
          letterSpacing="-0.07em"
        >
          prmpt
        </text>

        {/* Circled R registration mark */}
        <g transform="translate(305, 12)">
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="none"
          />
          <text
            x="18"
            y="23.5"
            fill="#FFFFFF"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="600"
            fontSize="16"
            textAnchor="middle"
          >
            R
          </text>
        </g>
      </svg>
    </motion.div>
  );
};
