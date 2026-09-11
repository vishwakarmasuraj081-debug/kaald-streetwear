import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JACKET_PRODUCT } from '../data/collectionData';
import { ArrowRight } from 'lucide-react';

interface JacketSectionProps {
  onOpenProductModal: () => void;
}

export const JacketSection: React.FC<JacketSectionProps> = ({ onOpenProductModal }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const detailPoints = [
    {
      num: '01',
      title: 'COLLAR',
      desc: 'Ergonomic articulated stand collar with storm barrier lining.',
      top: '18%',
      left: '48%',
    },
    {
      num: '02',
      title: 'UTILITY POCKET',
      desc: 'Dual angled low-profile chest compartments with concealed magnetic closures.',
      top: '46%',
      left: '38%',
    },
    {
      num: '03',
      title: 'HARDWARE',
      desc: 'Matte industrial gunmetal two-way reversible waterproof zips.',
      top: '64%',
      left: '52%',
    },
  ];

  return (
    <section
      id="section-jacket"
      className="relative w-full max-w-[1800px] mx-auto py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 border-b border-[#222226]"
    >
      {/* Editorial Layout: Jacket image occupies 60-70% width, text 30-40% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Large Full-Image Feature (65% width / 8 cols on desktop) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div
            onClick={onOpenProductModal}
            className="group relative aspect-[3/4] w-full bg-[#111114] border border-[#26262C] rounded-sm overflow-hidden cursor-pointer"
          >
            {/* Complete jacket visual: model, dark urban architecture, industrial lighting */}
            <img
              src={JACKET_PRODUCT.colors[0].image}
              alt="KAALD Discipline Technical Jacket"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Subtle Top Metadata */}
            <div className="absolute top-5 left-5 flex items-center gap-3">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white">
                03 / HERO OUTERWEAR
              </span>
              <span className="px-2.5 py-1 bg-[#1A1A1E] text-[10px] font-mono tracking-widest uppercase text-[#9C9CA6]">
                DARK CHARCOAL
              </span>
            </div>

            {/* Subtle Detail Labels (Overlay hotspots) */}
            {detailPoints.map((point, idx) => (
              <div
                key={point.num}
                style={{ top: point.top, left: point.left }}
                className="absolute hidden sm:block pointer-events-auto"
                onMouseEnter={() => setActiveHotspot(idx)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <div className="relative group/spot">
                  <div className="w-6 h-6 rounded-full bg-black/60 border border-white/50 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-white cursor-pointer hover:scale-110 hover:border-white transition-all">
                    {point.num}
                  </div>
                  {activeHotspot === idx && (
                    <div className="absolute left-8 -top-3 w-48 p-2.5 bg-black/90 border border-white/20 backdrop-blur-md text-left z-20 shadow-xl">
                      <div className="text-[9px] font-mono tracking-widest text-[#9C9CA6] uppercase">
                        {point.num} / {point.title}
                      </div>
                      <div className="text-[11px] text-[#D0D0D8] mt-1 leading-snug">
                        {point.desc}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Bottom Visual Bar */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#888892] uppercase block">
                  TECHNICAL MICRO-FAILLE
                </span>
                <span className="text-[18px] sm:text-[22px] font-bold tracking-tight uppercase text-white">
                  DISCIPLINE JACKET
                </span>
              </div>
              <span className="text-[14px] font-mono text-white bg-black/70 backdrop-blur-sm px-3 py-1 border border-white/10">
                ₹3,499
              </span>
            </div>
          </div>
        </div>

        {/* Text & Product Info Column (35% width / 4 cols on desktop) */}
        <div className="lg:col-span-4 order-1 lg:order-2 space-y-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#888892] mb-3"
            >
              03 / JACKET
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[34px] sm:text-[46px] lg:text-[54px] font-bold leading-[0.98] tracking-[-0.03em] uppercase text-white"
            >
              BUILT
              <br />
              FOR
              <br />
              AFTER DARK.
            </motion.h3>
          </div>

          <div className="border-t border-[#222226] pt-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <h4 className="text-[20px] font-bold tracking-tight uppercase text-white">
                DISCIPLINE JACKET
              </h4>
              <span className="text-[20px] font-mono text-white">₹3,499</span>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2">
              {JACKET_PRODUCT.highlightBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#18181C] text-[#BFBFC8] border border-[#2B2B32]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-[13px] leading-[170%] text-[#9E9EA8]">
              {JACKET_PRODUCT.description}
            </p>

            {/* Detail Labels List: 01 / COLLAR, 02 / UTILITY POCKET, 03 / HARDWARE */}
            <div className="pt-4 border-t border-[#202024] space-y-2.5">
              <span className="text-[10px] font-mono tracking-widest text-[#72727C] uppercase block mb-1">
                KEY ARCHITECTURAL ATTRIBUTES:
              </span>
              {detailPoints.map((item) => (
                <div
                  key={item.num}
                  className="flex items-start gap-3 py-1.5 border-b border-[#18181C] text-[12px]"
                >
                  <span className="font-mono text-[#7D7D88] text-[11px]">
                    {item.num}
                  </span>
                  <div>
                    <span className="font-mono tracking-wider uppercase text-white font-medium">
                      / {item.title}
                    </span>
                    <p className="text-[11px] text-[#868690] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenProductModal}
                className="group w-full py-4 bg-white text-black text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#E8E8EC] transition-all flex items-center justify-center gap-3"
              >
                <span>VIEW JACKET</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
