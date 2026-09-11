import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PANTS_PRODUCT, ProductColor } from '../data/collectionData';
import { ArrowRight } from 'lucide-react';

interface PantsSectionProps {
  onOpenProductModal: (colorId?: string) => void;
}

export const PantsSection: React.FC<PantsSectionProps> = ({ onOpenProductModal }) => {
  const [activeColorId, setActiveColorId] = useState<string>('black');
  const [hoveredColorId, setHoveredColorId] = useState<string | null>(null);

  const effectiveColorId = hoveredColorId || activeColorId;
  const activeColor =
    PANTS_PRODUCT.colors.find((c) => c.id === effectiveColorId) ||
    PANTS_PRODUCT.colors[0];

  const activeIndex = PANTS_PRODUCT.colors.findIndex((c) => c.id === activeColor.id);

  return (
    <section
      id="section-pants"
      className="relative w-full max-w-[1800px] mx-auto py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 border-b border-[#222226]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#888892] mb-2"
          >
            01 / PANTS
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[32px] sm:text-[44px] lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] uppercase text-white"
          >
            THREE COLORS.
            <br />
            ONE SILHOUETTE.
          </motion.h3>
        </div>

        {/* Dynamic Color Indicator & Understated Swatches */}
        <div className="flex flex-col sm:items-end gap-3">
          <div className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] uppercase text-right">
            <span className="text-[#6C6C75]">PANTS // </span>
            <span className="text-white font-semibold">{activeColor.name}</span>
          </div>

          {/* Understated Color Swatches */}
          <div className="flex items-center gap-2">
            {PANTS_PRODUCT.colors.map((color) => {
              const isSelected = activeColor.id === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setActiveColorId(color.id)}
                  onMouseEnter={() => setHoveredColorId(color.id)}
                  onMouseLeave={() => setHoveredColorId(null)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'border-white bg-[#1A1A20] text-white'
                      : 'border-[#2E2E35] bg-[#111114] text-[#8C8C96] hover:border-[#52525C]'
                  }`}
                  aria-label={`Select ${color.name} pants`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full border border-black/40 ${
                      isSelected ? 'ring-2 ring-white/50' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Substantial Fashion Presentation: 3 Large Editorial Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
        {PANTS_PRODUCT.colors.map((color, index) => {
          const isSelected = activeColor.id === color.id;

          return (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onMouseEnter={() => setHoveredColorId(color.id)}
              onMouseLeave={() => setHoveredColorId(null)}
              onClick={() => {
                setActiveColorId(color.id);
                onOpenProductModal(color.id);
              }}
              className={`group relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#121215] border cursor-pointer transition-all duration-500 ${
                isSelected
                  ? 'border-white/80 ring-1 ring-white/20'
                  : 'border-[#222228] hover:border-[#4A4A55]'
              }`}
            >
              {/* Full-body image: uncropped, waistband to shoes */}
              <img
                src={color.image}
                alt={`KAALD Utility Pants in ${color.name}`}
                loading="eager"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center select-none transition-transform duration-700 ease-out ${
                  isSelected ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'
                }`}
              />

              {/* Gradient Scrim for subtle editorial contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#E0E0E6] uppercase">
                  {color.label}
                </span>
                {isSelected && (
                  <span className="px-1.5 py-0.5 bg-white text-black text-[9px] font-mono tracking-widest uppercase font-bold">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-[#8C8C96] tracking-widest uppercase">
                    KAALD / ESSENTIAL 01
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-bold tracking-tight uppercase text-white">
                    {color.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-mono text-[#D8D8DE]">
                    ₹2,999
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Progress Indicator (01 / 03) */}
      <div className="flex md:hidden items-center justify-between mt-4 px-1 text-[11px] font-mono text-[#888892]">
        <span>SWATCH SELECTION</span>
        <span>
          0{activeIndex + 1} / 0{PANTS_PRODUCT.colors.length}
        </span>
      </div>

      {/* Pants Product Information Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 sm:mt-14 pt-8 border-t border-[#222226] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-4">
            <h4 className="text-[24px] sm:text-[30px] font-bold tracking-tight uppercase text-white">
              UTILITY PANT
            </h4>
            <span className="text-[20px] sm:text-[24px] font-mono text-white">
              ₹2,999
            </span>
          </div>

          {/* Three highlighted specifications */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {PANTS_PRODUCT.highlightBadges.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono tracking-[0.15em] uppercase bg-[#16161A] text-[#BFBFC8] border border-[#2B2B32]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* View Pants CTA */}
        <div>
          <button
            type="button"
            onClick={() => onOpenProductModal(activeColor.id)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#E8E8EC] transition-all"
          >
            <span>VIEW PANTS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
