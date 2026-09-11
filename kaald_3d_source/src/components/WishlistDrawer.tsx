import React from 'react';
import { Product, ProductColor } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onMoveToCart: (product: Product, color: ProductColor, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#070707]/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="relative w-full max-w-md h-full bg-[#0B0B0B] border-l border-[#222] shadow-2xl flex flex-col justify-between p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F4F4F1] fill-current" />
            <span className="font-display font-bold text-lg uppercase tracking-wider text-[#F4F4F1]">
              SAVED PIECES ({wishlistProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Heart className="w-12 h-12 text-[#2A2A2A] mb-4" />
              <span className="font-display font-bold text-lg text-[#F4F4F1] uppercase">
                NOTHING SAVED YET.
              </span>
              <p className="text-xs font-mono-tech text-[#777] mt-2 max-w-xs">
                TAP THE HEART ON ANY GARMENT TO SAVE PIECES TO YOUR PRIVATE ARCHIVE.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-[#F4F4F1] text-[#070707] text-xs font-display font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                DISCOVER THE COLLECTION →
              </button>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex gap-4 p-3 bg-[#111111] border border-[#202020] relative group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="relative w-20 aspect-[4/5] bg-[#161616] overflow-hidden flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="font-display font-bold text-xs sm:text-sm text-[#F4F4F1] line-clamp-1 cursor-pointer hover:underline"
                    >
                      {prod.name}
                    </h4>
                    <span className="text-[10px] font-mono-tech text-[#888] uppercase block mt-1">
                      {prod.category} {prod.gsm ? `// ${prod.gsm} GSM` : ''}
                    </span>
                    <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#F4F4F1] block mt-1">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Actions: Move to bag & remove */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        onMoveToCart(prod, prod.colors[0], prod.sizes[0]);
                        onRemoveWishlist(prod);
                      }}
                      className="flex-1 py-2 bg-[#F4F4F1] text-[#070707] text-[10px] font-display font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>MOVE TO BAG</span>
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(prod)}
                      className="p-2 border border-[#2A2A2A] text-[#888] hover:text-rose-400 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-[#1C1C1C]">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#141414] border border-[#262626] text-[#CCC] text-xs font-display font-bold uppercase tracking-widest hover:text-white hover:border-[#444] transition-colors"
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
