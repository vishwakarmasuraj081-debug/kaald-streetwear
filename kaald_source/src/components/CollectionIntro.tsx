import React from 'react';
import { motion } from 'motion/react';

export const CollectionIntro: React.FC = () => {
  return (
    <section
      id="collection-intro"
      className="relative w-full max-w-[1800px] mx-auto pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 border-b border-[#222226]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
        {/* Left Side: Editorial Label & Large Headline */}
        <div className="space-y-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] uppercase text-[#A0A0A8]">
              KAALD / COLLECTION 01
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[52px] sm:text-[80px] lg:text-[110px] xl:text-[128px] font-bold leading-[0.92] tracking-[-0.04em] uppercase text-white"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            BUILT
            <br />
            TO
            <br />
            MOVE.
          </motion.h2>
        </div>

        {/* Right Side: Editorial Supporting Text & Campaign Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-between max-w-md lg:pb-3 space-y-8"
        >
          <p
            className="text-[15px] sm:text-[17px] leading-[160%] text-[#C0C0C8] font-normal tracking-[-0.01em]"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            A considered collection of premium everyday essentials, designed for movement and built for the streets.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#26262B] text-[11px] font-mono tracking-widest uppercase text-[#888892]">
            <div>
              <span className="block text-[#56565F] mb-1">ORIGIN</span>
              <span className="text-[#D0D0D8]">MUMBAI / IN</span>
            </div>
            <div>
              <span className="block text-[#56565F] mb-1">EDITION</span>
              <span className="text-[#D0D0D8]">LIMITED 01 // 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
