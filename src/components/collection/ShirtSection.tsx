import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHIRT_PRODUCT } from '../data/collectionData';
import { ArrowRight } from 'lucide-react';

interface ShirtSectionProps {
  onOpenProductModal: (colorId?: string) => void;
}

export const ShirtSection: React.FC<ShirtSectionProps> = ({ onOpenProductModal }) => {
  const [selectedColorId, setSelectedColorId] = useState<string>('black');

  const activeColor =
    SHIRT_PRODUCT.colors.find((c) => c.id === selectedColorId) ||
    SHIRT_PRODUCT.colors[0];

  const supportingColor =
    SHIRT_PRODUCT.colors.find((c) => c.id !== selectedColorId) ||
    SHIRT_PRODUCT.colors[1];

  return (
    <section
      id="section-shirts"
      className="relative w-full max-w-[1800px] mx-auto py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 border-b border-[#222226]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#888892] mb-2"
          >
            02 / SHIRTS
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[32px] sm:text-[44px] lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] uppercase text-white"
          >
            THE EVERYDAY
            <br />
            ESSENTIAL.
          </motion.h3>
        </div>

        {/* Subtle Color Switchers: BLACK / BONE */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-[#71717A] uppercase mr-1">
            COLORWAY:
          </span>
          {SHIRT_PRODUCT.colors.map((color) => {
            const isSelected = selectedColorId === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColorId(color.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-all ${
                  isSelected
                    ? 'border-white bg-white text-black font-semibold'
                    : 'border-[#32323A] bg-[#121215] text-[#9A9AA4] hover:border-white/50'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-black/30`}
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Editorial Magazine Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Large Primary Image (Occupy 7 cols) */}
        <div className="lg:col-span-7">
          <div
            onClick={() => onOpenProductModal(activeColor.id)}
            className="group relative aspect-[3/4] w-full bg-[#121215] border border-[#26262D] rounded-sm overflow-hidden cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeColor.id}
                initial={{ opacity: 0.3, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full"
              >
                <img
                  src={activeColor.image}
                  alt={`Signature Oversized Shirt in ${activeColor.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Overlaid Details */}
            <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10 text-[11px] font-mono tracking-widest uppercase text-white">
              {activeColor.label}
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#9696A0] uppercase block">
                  PRIMARY CAMPAIGN VISUAL
                </span>
                <span className="text-[18px] sm:text-[22px] font-bold tracking-tight uppercase text-white">
                  {activeColor.name} COLORWAY
                </span>
              </div>
              <span className="text-[14px] font-mono text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 border border-white/10">
                ₹1,999
              </span>
            </div>
          </div>
        </div>

        {/* Asymmetric Supporting Side (Occupy 5 cols) with whitespace & smaller companion image */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
          {/* Subtle Editorial Labels */}
          <div className="space-y-4">
            <div className="flex items-center gap-6 border-b border-[#222226] pb-4">
              <span
                onClick={() => setSelectedColorId('black')}
                className={`text-[12px] font-mono tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  selectedColorId === 'black'
                    ? 'text-white font-bold border-b border-white pb-1'
                    : 'text-[#6C6C75] hover:text-[#B0B0BA]'
                }`}
              >
                01 / BLACK
              </span>
              <span
                onClick={() => setSelectedColorId('bone')}
                className={`text-[12px] font-mono tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  selectedColorId === 'bone'
                    ? 'text-white font-bold border-b border-white pb-1'
                    : 'text-[#6C6C75] hover:text-[#B0B0BA]'
                }`}
              >
                02 / BONE
              </span>
            </div>

            <p className="text-[14px] leading-relaxed text-[#A4A4AF] max-w-sm">
              Constructed from dense 280 GSM single jersey. Cut with a boxy drop-shoulder profile, wider elbow-length sleeves, and high-density tonal chest embroidery.
            </p>
          </div>

          {/* Smaller Supporting Image (Asymmetric Companion) */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#73737C] block">
              COMPANION PALETTE // CLICK TO SWAP
            </span>
            <div
              onClick={() => setSelectedColorId(supportingColor.id)}
              className="group relative aspect-[3/4] w-full max-w-[340px] bg-[#141417] border border-[#26262B] rounded-sm overflow-hidden cursor-pointer hover:border-white/60 transition-colors"
            >
              <img
                src={supportingColor.image}
                alt={`Signature Oversized Shirt in ${supportingColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-2 py-0.5 text-[9px] font-mono tracking-widest text-[#D4D4DC] uppercase">
                {supportingColor.label}
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* Shirt Product Info & CTA */}
          <div className="pt-6 border-t border-[#222226] space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <h4 className="text-[20px] sm:text-[24px] font-bold tracking-tight uppercase text-white">
                  SIGNATURE OVERSIZED SHIRT
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SHIRT_PRODUCT.highlightBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#18181C] text-[#B2B2BC] border border-[#292930]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[20px] font-mono text-white">₹1,999</span>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenProductModal(activeColor.id)}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black text-[12px] font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#E8E8EC] transition-all"
              >
                <span>VIEW SHIRT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
