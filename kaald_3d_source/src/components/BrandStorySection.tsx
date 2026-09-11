import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section
      id="story"
      className="relative w-full py-32 bg-[#080808] text-[#F4F4F1] border-b border-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[10px] font-mono-tech tracking-[0.35em] text-[#7A7A74] uppercase block mb-3">
            07 // BRAND MANIFESTO
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl tracking-[-0.05em] uppercase leading-[0.92]">
            A MOVEMENT<br />
            FROM INDIA<br />
            <span className="text-[#888882]">TO THE WORLD.</span>
          </h2>
        </div>

        {/* Story Grid: Editorial photography & Architectural moments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left Column (Images) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] bg-[#121212] border border-[#222] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop"
                alt="Urban Street Culture India"
                className="w-full h-full object-cover filter contrast-110 brightness-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] font-mono-tech text-[#888] tracking-widest uppercase block mb-1">
                  ARCHIVAL SNAPSHOT // 28.6139° N
                </span>
                <span className="font-display font-bold text-xl text-[#F4F4F1]">
                  CONCRETE, SHADOWS, AND SUBTERRANEAN SPEED
                </span>
              </div>
            </div>

            {/* Overlapping secondary detail frame */}
            <div className="hidden sm:block absolute -bottom-10 -right-8 w-56 aspect-[3/4] bg-[#0A0A0A] border border-[#2E2E2E] p-1.5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&auto=format&fit=crop"
                alt="Architectural Night Streets"
                className="w-full h-full object-cover filter contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Narrative Essay */}
          <div className="lg:col-span-6 lg:pl-8 flex flex-col justify-center">
            <div className="space-y-6 text-sm sm:text-base text-[#9E9E96] font-light leading-relaxed">
              <p className="text-xl sm:text-2xl text-[#F4F4F1] font-display font-semibold leading-tight">
                KAALD is not an imitation of Western skatewear or European luxury. It is a direct translation of the contemporary Indian urban condition.
              </p>
              <p>
                Modern Indian cities are defined by brutalist flyovers, monsoons that test the endurance of cloth, midnight chai stalls humming with creative debate, and an ambitious generation that moves between tradition and radical self-definition.
              </p>
              <p>
                We build garments that reflect this resilience: 480 GSM organic cotton knit in Coimbatore, bar-tacked utility pockets, and silhouettes tailored with architectural volume. No cheap shortcuts. No synthetic fillers.
              </p>
            </div>

            {/* Brand Core Pillars */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-[#1C1C1C]">
              <div>
                <span className="text-xs font-mono-tech text-[#777] block mb-1">ETHOS</span>
                <span className="font-display font-bold text-lg text-[#F4F4F1]">
                  INDIAN ROOTS.<br />GLOBAL ATTITUDE.
                </span>
              </div>
              <div>
                <span className="text-xs font-mono-tech text-[#777] block mb-1">PURPOSE</span>
                <span className="font-display font-bold text-lg text-[#F4F4F1]">
                  FOR WHAT<br />MOVES YOU.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dramatic Full-Width Typographic Statement */}
        <div className="p-10 sm:p-16 bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center text-center">
          <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase mb-4">
            MANIFESTO STATEMENT
          </span>
          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#F4F4F1] max-w-4xl tracking-tight leading-tight">
            “MORE THAN CLOTHING.<br />A GENERATION IN CONTINUOUS MOTION.”
          </h3>
          <div className="w-12 h-[1px] bg-[#444] my-6" />
          <p className="text-xs font-mono-tech text-[#888] tracking-widest uppercase">
            ESTABLISHED IN NEW DELHI // CRAFTED ACROSS THE SUBCONTINENT
          </p>
        </div>
      </div>
    </section>
  );
};
