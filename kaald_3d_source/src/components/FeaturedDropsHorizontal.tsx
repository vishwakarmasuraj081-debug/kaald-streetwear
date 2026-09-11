import React, { useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

interface FeaturedDropsProps {
  onSelectProduct: (product: Product) => void;
}

export const FeaturedDropsHorizontal: React.FC<FeaturedDropsProps> = ({ onSelectProduct }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredDrops = PRODUCTS.filter((p) => p.tag === 'DROP 01' || p.featured).slice(0, 6);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-28 bg-[#090909] text-[#F4F4F1] border-b border-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#1E1E1E]">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mb-2">
              LIMITED EDITIONS // ARCHIVE 01
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em] uppercase">
              FEATURED DROPS
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <span className="text-xs font-mono-tech text-[#888] tracking-widest uppercase">
              SCROLL ARCHIVE
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-[#262626] bg-[#121212] flex items-center justify-center text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-[#262626] bg-[#121212] flex items-center justify-center text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
        >
          {featuredDrops.map((prod, idx) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="group min-w-[280px] sm:min-w-[340px] md:min-w-[400px] bg-[#0E0E0E] border border-[#202020] hover:border-[#444] transition-all duration-300 p-4 flex flex-col justify-between cursor-pointer snap-start flex-shrink-0"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] bg-[#141414] overflow-hidden mb-4">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#070707]/80 backdrop-blur-md px-2 py-0.5 border border-[#282828] text-[9px] font-mono-tech uppercase text-[#CCC]">
                  {prod.tag || 'DROP 01'}
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-3 py-1.5 bg-[#F4F4F1] text-[#070707] text-[10px] font-display font-bold uppercase tracking-widest">
                    EXPLORE →
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-tech text-[#777] uppercase">
                    0{idx + 1} // {prod.category}
                  </span>
                  {prod.gsm && (
                    <span className="text-[10px] font-mono-tech text-[#AAA]">
                      {prod.gsm} GSM
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4F4F1] group-hover:text-white transition-colors line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-[#888] font-light line-clamp-2 mt-1">
                  {prod.shortDescription}
                </p>
              </div>

              {/* Price Row */}
              <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                <span className="font-mono-tech text-base font-bold text-[#F4F4F1]">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-mono-tech text-[#888] uppercase group-hover:text-[#FFF] transition-colors">
                  VIEW GARMENT
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-full h-[2px] bg-[#1A1A1A] mt-4 relative">
          <div
            className="h-full bg-[#F4F4F1] transition-all duration-150"
            style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
};
