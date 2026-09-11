import React, { useState, useEffect, useRef } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SUGGESTED_SEARCHES = [
  'OVERSIZED TEE',
  'CARGO',
  'JACKET',
  'HOODIE',
  'ESSENTIALS',
  'PANTS',
  'BLACK',
];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveProduct } = useCommerce();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl text-white overflow-y-auto px-4 sm:px-8 py-8 sm:py-16"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Top Close Bar */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                KAALD INTELLIGENT SEARCH
              </span>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Title & Search Input */}
            <div className="space-y-4">
              <h2 className="text-[28px] sm:text-[42px] font-extrabold tracking-tight uppercase">
                WHAT ARE YOU LOOKING FOR?
              </h2>

              <div className="relative border-b-2 border-white/30 focus-within:border-white transition-colors pb-2">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH PRODUCTS, SILHOUETTES, COLORS..."
                  className="w-full bg-transparent pl-10 sm:pl-14 pr-4 text-[18px] sm:text-[28px] font-medium tracking-tight text-white placeholder:text-neutral-600 focus:outline-none uppercase"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Suggested Searches Chips */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                SUGGESTED SEARCHES:
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {SUGGESTED_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-1.5 bg-neutral-900 border border-white/10 hover:border-white/40 text-neutral-300 hover:text-white rounded-full text-[12px] font-mono tracking-wider transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Results Display */}
            {query.trim() && (
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-mono tracking-wider text-neutral-400 uppercase">
                    RESULTS ({filteredProducts.length})
                  </span>
                  {filteredProducts.length === 0 && (
                    <span className="text-[13px] font-mono text-neutral-500">
                      NO DIRECT MATCHES FOUND
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => {
                    const primaryColor = product.colors[0];
                    const image = primaryColor?.image || product.images[0];

                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveProduct(product);
                        }}
                        className="group cursor-pointer space-y-2.5"
                      >
                        <div className="aspect-[3/4] bg-neutral-900 overflow-hidden rounded-sm relative">
                          <img
                            src={image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                            {product.category}
                          </p>
                          <h4 className="text-[12px] font-bold text-white tracking-tight uppercase line-clamp-1 group-hover:text-neutral-300 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[12px] font-mono text-neutral-300">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
