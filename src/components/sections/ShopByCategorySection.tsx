import React from 'react';
import { CATEGORIES_DATA } from '../../data/collections';
import { useCommerce } from '../../context/CommerceContext';
import { ArrowRight } from 'lucide-react';

export const ShopByCategorySection: React.FC = () => {
  const { setActiveCategory } = useCommerce();

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById('shop-all');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="shop-by-category"
      className="relative w-full bg-black text-white py-20 sm:py-28 px-4 sm:px-8 border-b border-white/10"
    >
      <div className="max-w-[1720px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-end justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1">
              CATEGORY DIRECTORY
            </span>
            <h2 className="text-[32px] sm:text-[48px] font-extrabold tracking-tight uppercase font-sans">
              SHOP BY SILHOUETTE
            </h2>
          </div>
          <span className="text-[12px] font-mono text-neutral-500 uppercase hidden sm:block">
            06 CATEGORIES
          </span>
        </div>

        {/* Large Visual Category Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative h-[360px] sm:h-[440px] bg-neutral-900 rounded-sm overflow-hidden cursor-pointer flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out select-none"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 group-hover:via-black/20 transition-all duration-500" />

              {/* Top Tag */}
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase rounded-sm border border-white/20">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Category Info */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight uppercase text-white font-sans">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2 text-[12px] font-mono tracking-widest text-neutral-300 group-hover:text-white transition-colors">
                  <span>EXPLORE CATEGORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
