import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryExperienceProps {
  onSelectCategory: (category: ProductCategory) => void;
}

interface CategoryItem {
  id: ProductCategory;
  name: string;
  itemCount: number;
  image: string;
  subtext: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'HOODIES',
    name: 'HOODIES',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    subtext: '480–520 GSM ARCHITECTURAL HEAVYWEIGHT',
  },
  {
    id: 'T-SHIRTS',
    name: 'T-SHIRTS',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    subtext: '280 GSM COMBED BOX-FIT BASICS & GRAPHICS',
  },
  {
    id: 'CARGOS',
    name: 'CARGOS',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
    subtext: 'ARTICULATED KNEE UTILITY TWILL PANTS',
  },
  {
    id: 'JACKETS',
    name: 'JACKETS',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    subtext: 'TECHNICAL BOMBERS & WEATHERPROOF SHELLS',
  },
  {
    id: 'FOOTWEAR',
    name: 'FOOTWEAR',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop',
    subtext: 'SCULPTED TREAD CHUNKY URBAN SNEAKERS',
  },
  {
    id: 'ACCESSORIES',
    name: 'ACCESSORIES',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    subtext: 'SLINGS, CAPS, CORDURA WEBBING & SOCKS',
  },
];

export const CategoryExperience: React.FC<CategoryExperienceProps> = ({ onSelectCategory }) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem>(CATEGORIES[0]);

  return (
    <section id="category-experience" className="relative w-full py-28 bg-[#070707] text-[#F4F4F1] border-b border-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mb-2">
              CATEGORIES // 01—06
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-[-0.04em]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono-tech tracking-[0.2em] text-[#888]">
            ENGINEERED TO WITHSTAND THE CITY
          </div>
        </div>

        {/* Interactive Layout: Split Screen with Hover Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Category Navigation List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#1A1A1A]">
            {CATEGORIES.map((cat, idx) => {
              const isHovered = hoveredCategory.id === cat.id;

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onClick={() => onSelectCategory(cat.id)}
                  className="group relative py-6 sm:py-8 flex items-center justify-between cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono-tech text-[#555] group-hover:text-[#AAA] transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className={`font-display font-black text-3xl sm:text-5xl tracking-[-0.03em] uppercase transition-all duration-300 ${
                        isHovered ? 'text-[#F4F4F1] translate-x-3' : 'text-[#666660] group-hover:text-[#C6C6C0]'
                      }`}>
                        {cat.name}
                      </span>
                      <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#6A6A64] mt-1">
                        {cat.subtext}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono-tech text-[#666] group-hover:text-[#AAA]">
                      {cat.itemCount} PIECES
                    </span>
                    <div className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#F4F4F1] border-[#F4F4F1] text-[#070707] rotate-45'
                        : 'border-[#262626] text-[#777] group-hover:border-[#555]'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Preview Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full bg-[#111111] border border-[#222] overflow-hidden group">
              {/* Image Preview with Smooth Transition */}
              <img
                key={hoveredCategory.id}
                src={hoveredCategory.image}
                alt={hoveredCategory.name}
                className="w-full h-full object-cover filter brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                referrerPolicy="no-referrer"
              />

              {/* Minimalist Graphic Frame Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#888] uppercase block">
                    SECTOR // SPECIFICATION
                  </span>
                  <span className="font-display font-bold text-2xl text-[#F4F4F1] uppercase">
                    {hoveredCategory.name}
                  </span>
                  <p className="text-xs text-[#999] font-mono-tech mt-1">
                    {hoveredCategory.subtext}
                  </p>
                </div>
                <button
                  onClick={() => onSelectCategory(hoveredCategory.id)}
                  className="pointer-events-auto px-4 py-2 bg-[#F4F4F1] text-[#070707] text-[10px] font-display font-bold tracking-widest uppercase hover:bg-white transition-colors"
                >
                  VIEW ALL →
                </button>
              </div>

              {/* Top-Right Corner Mark */}
              <div className="absolute top-4 right-4 text-[9px] font-mono-tech text-[#AAA] border border-[#333] px-2 py-0.5 bg-[#070707]/70 backdrop-blur-sm">
                SERIES 01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
