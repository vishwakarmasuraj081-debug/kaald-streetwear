import React from 'react';
import { motion } from 'motion/react';

export const Logo: React.FC = () => {
  return (
    <motion.div
      id="brand-logo"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0,
      }}
      className="fixed pointer-events-none z-20 top-4 left-4 sm:top-8 sm:left-8"
      style={{ mixBlendMode: 'exclusion' }}
    >
      <svg
        viewBox="0 0 355 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[124px] sm:w-[266px] lg:w-[355px] h-auto overflow-visible"
        aria-label="prmpt brand logo"
      >
        <g fill="#FFFFFF">
          {/* First 'p' */}
          <rect x="12" y="18" width="19" height="84" rx="1.5" />
          <path d="M31 28 C56 28 70 41 70 59 C70 77 56 90 31 90 V72 C43 72 49 67 49 59 C49 51 43 46 31 46 Z" />

          {/* Letter 'r' */}
          <rect x="78" y="34" width="19" height="56" rx="1.5" />
          <path d="M97 34 C109 34 122 41 122 57 H104 C104 51 100 48 97 48 Z" />

          {/* Letter 'm' */}
          <rect x="130" y="34" width="18" height="56" rx="1.5" />
          <path d="M148 34 C160 34 170 42 173 54 C177 41 189 34 202 34 C218 34 226 44 226 62 V90 H207 V63 C207 53 202 49 195 49 C188 49 183 54 183 63 V90 H164 V63 C164 53 159 49 152 49 V34 Z" />

          {/* Second 'p' */}
          <rect x="234" y="18" width="19" height="84" rx="1.5" />
          <path d="M253 28 C278 28 292 41 292 59 C292 77 278 90 253 90 V72 C265 72 271 67 271 59 C271 51 265 46 253 46 Z" />

          {/* Letter 't' */}
          <path d="M300 43 H328 V57 H317 V76 C317 83 321 86 328 86 H331 V98 C325 100 318 100 311 100 C298 100 297 90 297 78 V57 H290 V43 H297 V26 H317 V43 H300 Z" />

          {/* Circled R Registered Trademark */}
          <circle cx="342" cy="30" r="9.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <path d="M338 24.5 H342.8 C345.2 24.5 346.5 25.6 346.5 27.4 C346.5 28.8 345.4 29.7 344 30 L346.8 35 H344.6 L342.2 30.6 H339.8 V35 H338 Z M339.8 29.3 H342.6 C343.8 29.3 344.7 28.7 344.7 27.5 C344.7 26.3 343.8 25.8 342.6 25.8 H339.8 Z" />
        </g>
      </svg>
    </motion.div>
  );
};
