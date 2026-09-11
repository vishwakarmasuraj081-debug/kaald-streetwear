import React, { useRef, useState, useEffect } from 'react';
import { HeroHoodieCanvas } from './3d/HeroHoodieCanvas';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onDropClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onDropClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      // Calculate progress from 0.0 to 1.0
      const currentScroll = -rect.top;
      const normalized = Math.max(0, Math.min(1, currentScroll / scrollableHeight));
      setProgress(normalized);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[360vh] bg-[#070707]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Ambient Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A]/40 via-[#0A0A0A]/80 to-[#070707] pointer-events-none" />

        {/* 3D WebGL Canvas Layer */}
        <HeroHoodieCanvas scrollProgress={progress} />

        {/* ================= EDITORIAL TYPOGRAPHY TIMELINE OVERLAYS ================= */}

        {/* PHASE 1: 0% - 22% (Entrance & Identity) */}
        <div
          className={`absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between py-24 sm:py-28 pointer-events-none transition-all duration-700 ${
            progress < 0.22 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Top Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#222] bg-[#111]/70 backdrop-blur-md text-[10px] font-mono-tech tracking-[0.25em] text-[#9E9E98] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E2DC] animate-pulse" />
              <span>COLLECTION 01 // 2026</span>
            </div>
            <div className="text-[11px] font-mono-tech tracking-[0.2em] text-[#888882] uppercase text-right">
              INDIAN ROOTS. GLOBAL ATTITUDE.
            </div>
          </div>

          {/* Main Hero Headline */}
          <div className="max-w-xl">
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[0.88] tracking-[-0.05em] text-[#F4F4F1]">
              FOR<br />
              WHAT<br />
              MOVES<br />
              YOU.
            </h1>
            <p className="mt-6 text-sm sm:text-base text-[#9A9A94] max-w-md font-light leading-relaxed">
              Streetwear engineered with 480 GSM Indian combed terry. Built for a generation that commands space and moves without permission.
            </p>
          </div>

          {/* Scroll Cue Bottom */}
          <div className="flex items-center justify-between text-xs font-mono-tech tracking-[0.2em] text-[#777]">
            <div className="flex items-center gap-2">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#AAA]" />
              <span>SCROLL TO INITIATE SEQUENCE</span>
            </div>
            <div className="hidden sm:block">
              <span>01 / 06 — PERSPECTIVE</span>
            </div>
          </div>
        </div>

        {/* PHASE 2: 22% - 45% (Close Zoom: Craft & Textiles) */}
        <div
          className={`absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-none transition-all duration-700 ${
            progress >= 0.22 && progress < 0.48
              ? 'opacity-100 translate-y-0'
              : progress < 0.22
              ? 'opacity-0 translate-y-8'
              : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="max-w-md ml-auto text-right">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7E7E7A] uppercase block mb-2">
              02 / ANATOMY OF CRAFT
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F4F4F1] leading-tight">
              480 GSM<br />FRENCH TERRY
            </h2>
            <div className="w-16 h-[1px] bg-[#444] ml-auto my-4" />
            <p className="text-xs sm:text-sm text-[#A0A09A] leading-relaxed">
              Custom-knitted long-staple Coimbatore cotton. Heavyweight structure that resists collapse, double-needle bar-tacked stress points, and matte micro-embroidery.
            </p>
          </div>
        </div>

        {/* PHASE 3: 48% - 72% (Back Graphic Reveal) */}
        <div
          className={`absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-24 sm:pb-28 pointer-events-none transition-all duration-700 ${
            progress >= 0.48 && progress < 0.74
              ? 'opacity-100 translate-y-0'
              : progress < 0.48
              ? 'opacity-0 translate-y-8'
              : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="max-w-lg">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7E7E7A] uppercase block mb-2">
              03 / ORIGINAL ARTWORK
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F1] leading-none mb-3">
              ARCHITECTURAL<br />MONOCHROME
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A09A] leading-relaxed">
              High-density water-based screenprint on the reverse. Graphic blueprints honoring subcontinent metropolitan infrastructure.
            </p>
          </div>
        </div>

        {/* PHASE 4: 74% - 100% (Grand Climax & Call to Action) */}
        <div
          className={`absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-center text-center transition-all duration-700 ${
            progress >= 0.74 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="max-w-2xl flex flex-col items-center">
            <span className="text-[11px] font-mono-tech tracking-[0.3em] text-[#9A9A94] uppercase mb-3">
              KAALD APPAREL LAB
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.04em] text-[#F4F4F1] mb-4">
              BORN IN MOTION
            </h2>
            <p className="text-sm sm:text-base text-[#AAAAAA] max-w-md font-light mb-8">
              Limited Drop 01 now available. Handcrafted in South India. Distributed worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onDropClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#F4F4F1] text-[#070707] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE THE DROP (3D)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] border border-[#333] text-[#F4F4F1] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:border-[#666] transition-all"
              >
                SHOP FULL COLLECTION
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Progress Line (Right side indicator) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 pointer-events-none z-20">
          <span className="text-[9px] font-mono-tech text-[#555]">01</span>
          <div className="w-[1px] h-24 bg-[#1F1F1F] relative overflow-hidden">
            <div
              className="w-full bg-[#F4F4F1] transition-all duration-100 absolute top-0"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono-tech text-[#555]">04</span>
        </div>
      </div>
    </div>
  );
};
