import React from 'react';
import { motion } from 'motion/react';

export const Caption: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.3,
      }}
      className="fixed z-20 pointer-events-none left-4 sm:left-4 lg:left-8 top-[118px] sm:top-[180px] lg:top-[244px] w-[calc(100vw-32px)] sm:w-[calc(50vw-48px)] lg:w-[692px]"
      style={{
        mixBlendMode: 'exclusion',
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '140%',
        letterSpacing: '-0.04em',
        color: '#FFFFFF',
      }}
    >
      When switching between videos near the center, do not reset currentTime to 0
      abruptly. Add a small dead zone: if cursor is within +/-50px of center, keep
      both videos at currentTime = 0 and show whichever was last active.
    </motion.div>
  );
};
