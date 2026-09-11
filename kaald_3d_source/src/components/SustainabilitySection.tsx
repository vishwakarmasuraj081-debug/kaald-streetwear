import React from 'react';
import { Scissors, PackageCheck, Repeat, ShieldCheck } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'COMBED LONG-STAPLE INDIAN COTTON',
      desc: 'Sourced from cooperative farms in Coimbatore. Combed to remove short fibers, resulting in superior tensile strength, zero pilling, and an architectural drape.',
    },
    {
      icon: PackageCheck,
      title: 'ZERO SINGLE-USE PLASTIC PACKAGING',
      desc: 'All KAALD deliveries arrive in 100% recycled unbleached kraft cardboard, secured with water-activated reinforced paper tape and organic cotton garment bags.',
    },
    {
      icon: Repeat,
      title: 'LIMITED-RUN SMALL BATCHES',
      desc: 'We produce in strictly calculated batches of 150 to 300 units. Never flooding warehouses, never incinerating deadstock. When a drop sells out, it enters our archive.',
    },
    {
      icon: ShieldCheck,
      title: 'LIFETIME SEAM INTEGRITY GUARANTEE',
      desc: 'Every bar-tack, flatlock, and twin-needle stitch is inspected by hand. We believe the most sustainable garment is the one you continue wearing a decade from now.',
    },
  ];

  return (
    <section className="relative w-full py-28 bg-[#0A0A0A] text-[#F4F4F1] border-b border-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono-tech tracking-[0.35em] text-[#7A7A74] uppercase block mb-3">
            09 // RESPONSIBLE ATELIER
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em] uppercase">
            WEAR THE CHANGE
          </h2>
          <div className="w-12 h-[1px] bg-[#333] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#9E9E96] font-light leading-relaxed">
            PREMIUM MATERIALS. RESPONSIBLE PRODUCTION. TIMELESS DESIGN.
            <br />
            We refuse to make disposable clothing. Every millimeter is engineered for permanent utility.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#0F0F0F] border border-[#202020] p-6 flex flex-col justify-between hover:border-[#3E3E3E] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#E5E5E0] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#666] block mb-2">
                    CRAFT PRINCIPLE 0{idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-sm tracking-wide text-[#F4F4F1] mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#8A8A84] font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atelier Visual Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#222] bg-[#0E0E0E] p-4">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop"
              alt="Heavyweight Cotton Weaving"
              className="w-full h-full object-cover filter contrast-110"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-2 left-2 text-[9px] font-mono-tech bg-[#070707]/80 px-2 py-0.5 text-[#AAA]">
              COIMBATORE KNIT LAB
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
            <img
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop"
              alt="Precision Twin-Needle Stitching"
              className="w-full h-full object-cover filter contrast-110"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-2 left-2 text-[9px] font-mono-tech bg-[#070707]/80 px-2 py-0.5 text-[#AAA]">
              PRECISION STITCHING
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
              alt="Archival Finished Garments"
              className="w-full h-full object-cover filter contrast-110"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-2 left-2 text-[9px] font-mono-tech bg-[#070707]/80 px-2 py-0.5 text-[#AAA]">
              FINAL QUALITY AUDIT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
