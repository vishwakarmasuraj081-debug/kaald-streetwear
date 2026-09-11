import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BornInMotionCampaign: React.FC = () => {
  const handleExplore = () => {
    const el = document.getElementById('major-collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="campaign-drop01"
      className="relative w-full min-h-[85vh] lg:min-h-[95vh] bg-black text-white flex items-end p-6 sm:p-12 lg:p-20 overflow-hidden border-b border-white/10"
    >
      {/* Cinematic Full-Bleed Background Image */}
      <img
        src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=2400&auto=format&fit=crop"
        alt="KAALD Campaign Drop 01 Born In Motion"
        className="absolute inset-0 w-full h-full object-cover opacity-70 filter contrast-110 select-none scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
      />

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

      {/* Editorial Content */}
      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase rounded-sm">
            DROP 01
          </span>
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-300 uppercase">
            AUTUMN / WINTER 2026
          </span>
        </div>

        <h2 className="text-[44px] sm:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] uppercase leading-[0.92] text-white font-sans">
          BORN IN<br />MOTION
        </h2>

        <p className="text-[15px] sm:text-[18px] text-neutral-300 font-sans max-w-xl leading-relaxed font-medium">
          A contemporary uniform for movement, city and everyday life. Engineered from 480 GSM combed Indian cotton and weather-resistant tactical micro-faille.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleExplore}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-neutral-200 transition-all rounded-sm cursor-pointer shadow-2xl active:scale-98"
          >
            <span>EXPLORE DROP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
