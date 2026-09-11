import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, ArrowUpDown, Sparkles } from 'lucide-react';

interface CollectionSectionProps {
  initialCategory?: ProductCategory;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size: string) => void;
  onSelectProduct: (product: Product) => void;
  onView3D: (product: Product) => void;
}

const CATEGORIES: ProductCategory[] = [
  'ALL',
  'HOODIES',
  'T-SHIRTS',
  'CARGOS',
  'JACKETS',
  'FOOTWEAR',
  'ACCESSORIES',
];

type SortOption = 'featured' | 'price-low' | 'price-high' | 'gsm' | 'newest';

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  initialCategory = 'ALL',
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onView3D,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Sync initial category if changed from parent
  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = activeCategory === 'ALL' || p.category === activeCategory;
      const matchTag = !filterTag || p.tag === filterTag;
      return matchCat && matchTag;
    });

    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'gsm':
        return list.sort((a, b) => (b.gsm || 0) - (a.gsm || 0));
      case 'newest':
        return list.sort((a, b) => (b.tag === 'NEW' ? 1 : 0) - (a.tag === 'NEW' ? 1 : 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [activeCategory, sortBy, filterTag]);

  return (
    <section
      id="collection"
      className="relative w-full py-28 bg-[#070707] text-[#F4F4F1] border-b border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#787872] uppercase block mb-2">
              CATALOGUE // {filteredProducts.length} ITEMS AVAILABLE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em] uppercase">
              THE COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-[#888882] font-mono-tech tracking-wider mt-2">
              BUILT FOR MOVEMENT. TAILORED FOR THE METROPOLIS.
            </p>
          </div>

          {/* Quick Drop Tag Filters */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
            {['DROP 01', 'LIMITED', 'BESTSELLER', 'NEW'].map((tag) => {
              const active = filterTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setFilterTag(active ? null : tag)}
                  className={`px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase border transition-colors ${
                    active
                      ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                      : 'bg-[#111] text-[#888] border-[#222] hover:border-[#444] hover:text-[#CCC]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Navigation & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-4 border-b border-[#141414]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setFilterTag(null);
                  }}
                  className={`px-4 py-2 text-xs font-display font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                      : 'bg-[#0E0E0E] text-[#888] border-[#202020] hover:text-[#F4F4F1] hover:border-[#383838]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tech tracking-wider text-[#666] uppercase flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              SORT:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#0E0E0E] border border-[#262626] text-xs font-mono-tech text-[#DDD] px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-[#555] cursor-pointer"
            >
              <option value="featured">FEATURED CURATION</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="gsm">HEAVIEST FABRIC (GSM)</option>
              <option value="newest">NEW RELEASES</option>
            </select>
          </div>
        </div>

        {/* Product Grid: 4 cols desktop, 2 cols tablet, 2 cols mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlistIds.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onClick={onSelectProduct}
                onView3D={onView3D}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 text-center border border-[#1A1A1A] bg-[#0E0E0E]">
            <p className="text-sm font-mono-tech text-[#888] uppercase tracking-widest">
              NO GARMENTS MATCH THIS SELECTION
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setFilterTag(null);
              }}
              className="mt-4 px-6 py-2.5 bg-[#F4F4F1] text-[#070707] text-xs font-display font-bold uppercase tracking-widest"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
