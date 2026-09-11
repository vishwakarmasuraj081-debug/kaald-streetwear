import React from 'react';
import { ArrowUp, Instagram, Youtube, Music, Globe } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigate,
  onOpenSizeGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative w-full bg-[#050505] text-[#F4F4F1] pt-24 pb-12 border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Branding & Philosophy Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-16 border-b border-[#1A1A1A]">
          <div className="max-w-md">
            <h2 className="font-display font-black text-5xl sm:text-7xl tracking-[-0.05em] text-[#F4F4F1]">
              KAALD
            </h2>
            <span className="text-xs font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mt-1">
              BORN IN MOTION
            </span>
            <p className="text-xs sm:text-sm text-[#888882] font-light leading-relaxed mt-4">
              A contemporary Indian streetwear atelier engineered for a generation that moves differently. Heavyweight textiles, precision tailoring, uncompromising subculture.
            </p>
          </div>

          <div className="flex flex-col lg:items-end">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#777] uppercase mb-2">
              DISPATCH STATUS
            </span>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRODUCTION ATELIER OPERATIONAL // MONSOON ARCHIVE</span>
            </div>
            <span className="text-xs font-mono-tech text-[#888] mt-2">
              COORDINATES: 28.6139° N, 77.2090° E
            </span>
          </div>
        </div>

        {/* 5 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b border-[#1A1A1A]">
          {/* Col 1: Shop */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#A8A8A2] mb-1">
              SHOP
            </span>
            {(['T-SHIRTS', 'HOODIES', 'CARGOS', 'JACKETS', 'ACCESSORIES', 'FOOTWEAR'] as ProductCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onNavigate('collection');
                }}
                className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors uppercase"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Col 2: Company */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#A8A8A2] mb-1">
              COMPANY
            </span>
            <button
              onClick={() => onNavigate('story')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              ABOUT KAALD
            </button>
            <button
              onClick={() => onNavigate('journal')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              THE JOURNAL
            </button>
            <button
              onClick={() => onNavigate('sustainability')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              SUSTAINABILITY & CRAFT
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              STUDIOS & CAREERS
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              CONTACT
            </button>
          </div>

          {/* Col 3: Support */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#A8A8A2] mb-1">
              SUPPORT
            </span>
            <button
              onClick={onOpenSizeGuide}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              SIZE GUIDE (CM/INCH)
            </button>
            <span className="text-xs font-mono-tech text-[#777]">
              SHIPPING: PAN-INDIA
            </span>
            <span className="text-xs font-mono-tech text-[#777]">
              7-DAY RETURNS
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-left text-xs font-mono-tech text-[#777] hover:text-[#F4F4F1] transition-colors"
            >
              FAQS & ORDERS
            </button>
            <span className="text-xs font-mono-tech text-[#777]">
              TRACK YOUR DISPATCH
            </span>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#A8A8A2] mb-1">
              LEGAL
            </span>
            <span className="text-xs font-mono-tech text-[#777]">TERMS & CONDITIONS</span>
            <span className="text-xs font-mono-tech text-[#777]">PRIVACY POLICY</span>
            <span className="text-xs font-mono-tech text-[#777]">COOKIE POLICY</span>
            <span className="text-xs font-mono-tech text-[#777]">INTELLECTUAL PROPERTY</span>
          </div>

          {/* Col 5: Movement & Social */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#A8A8A2] mb-1">
              A MOVEMENT IN PROGRESS
            </span>
            <p className="text-xs text-[#888] font-light leading-relaxed">
              Connect with our creative sound channels, visual archives, and city dispatches.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-[#121212] border border-[#262626] flex items-center justify-center text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-[#121212] border border-[#262626] flex items-center justify-center text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-[#121212] border border-[#262626] flex items-center justify-center text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
                aria-label="Spotify"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Scroll to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-[#666]">
          <div className="flex items-center gap-4">
            <span>© 2026 KAALD APPAREL LAB. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">INDIAN ROOTS. GLOBAL ATTITUDE.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#AAA] hover:text-white uppercase transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
