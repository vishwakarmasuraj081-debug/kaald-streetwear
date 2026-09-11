import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../commerce/ProductCard';
import { ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const NewArrivalsSection: React.FC = () => {
  const { setActiveCategory } = useCommerce();

  // Pick the newest Drop 01 items for this editorial showcase
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.tag === 'DROP 01' || p.tag === 'NEW').slice(0, 8);

  const handleViewAll = () => {
    setActiveCategory('ALL');
    const el = document.getElementById('shop-all');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="new-arrivals"
      className="relative w-full bg-black text-white py-20 sm:py-28 px-4 sm:px-8 border-b border-white/10"
    >
      <div className="max-w-[1720px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1">
              DROP 01 — 2026
            </span>
            <h2 className="text-[32px] sm:text-[48px] font-extrabold tracking-tight uppercase font-sans">
              NEW ARRIVALS
            </h2>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span>EXPLORE ENTIRE DROP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
