import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { PRODUCTS } from '../../data/products';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setActiveProduct,
  } = useCommerce();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-[#0C0C0C] text-white border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[18px] font-bold tracking-tight uppercase">
                    YOUR WISHLIST
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                    [{wishlist.length}]
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
                  aria-label="Close Wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {wishlistedProducts.length === 0 ? (
                  <div className="py-24 text-center space-y-4">
                    <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">
                      WISHLIST STATUS
                    </span>
                    <p className="text-[20px] font-bold text-white uppercase tracking-tight">
                      YOUR WISHLIST IS EMPTY.
                    </p>
                    <p className="text-[13px] text-neutral-400 max-w-[240px] mx-auto">
                      Discover something worth keeping for the city.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        const el = document.getElementById('new-arrivals');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors rounded-sm"
                    >
                      EXPLORE NEW ARRIVALS <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => {
                    const primaryColor = product.colors[0];
                    const image = primaryColor?.image || product.images[0];

                    return (
                      <div
                        key={product.id}
                        className="flex gap-4 pb-6 border-b border-white/5 last:border-0"
                      >
                        {/* Thumbnail */}
                        <div
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setActiveProduct(product);
                          }}
                          className="w-20 h-24 sm:w-24 sm:h-28 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4
                                onClick={() => {
                                  setIsWishlistOpen(false);
                                  setActiveProduct(product);
                                }}
                                className="text-[13px] font-bold text-white uppercase tracking-tight line-clamp-1 hover:text-neutral-300 cursor-pointer"
                              >
                                {product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                                aria-label="Remove from wishlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1">
                              {product.category} · {product.colors.length} COLORS
                            </p>

                            <p className="text-[13px] font-mono text-neutral-200 mt-2">
                              ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* Quick Move to Bag */}
                          <button
                            type="button"
                            onClick={() => {
                              const size = product.sizes[0] || 'M';
                              addToCart(product, primaryColor, size, 1);
                              toggleWishlist(product.id);
                            }}
                            className="mt-3 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-white text-white hover:text-black transition-colors rounded-sm text-[11px] font-mono uppercase tracking-wider font-bold"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>MOVE TO BAG</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
