import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CollectionItem, ProductColor } from '../data/collectionData';
import { ArrowRight, Check, ShoppingBag, X } from 'lucide-react';

export interface CartItem {
  id: string;
  productTitle: string;
  category: string;
  colorName: string;
  size: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
}

interface ProductModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: CollectionItem | null;
  initialColorId?: string;
  onAddToCart: (item: CartItem) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const SIZES = ['S', 'M', 'L', 'XL'];

export const ProductModalDrawer: React.FC<ProductModalDrawerProps> = ({
  isOpen,
  onClose,
  product,
  initialColorId,
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Sync color when product opens or changes
  React.useEffect(() => {
    if (product) {
      if (initialColorId) {
        const found = product.colors.find((c) => c.id === initialColorId);
        setSelectedColor(found || product.colors[0]);
      } else {
        setSelectedColor(product.colors[0]);
      }
      setSelectedSize('M');
      setAddedAnimation(false);
    }
  }, [product, initialColorId, isOpen]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];

  const handleAdd = () => {
    onAddToCart({
      id: `${product.id}-${activeColor.id}-${selectedSize}`,
      productTitle: product.title,
      category: product.categoryName,
      colorName: activeColor.name,
      size: selectedSize,
      price: product.price,
      numericPrice: product.numericPrice,
      image: activeColor.image,
      quantity: 1,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="product-drawer-portal"
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[680px] h-full bg-[#0E0E10] text-[#F3F3F3] border-l border-[#262628] flex flex-col z-10 overflow-hidden shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222225] bg-[#0E0E10]/95 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#88888E]">
                  KAALD / ARCHIVE {product.categoryNumber}
                </span>
                <span className="text-[11px] text-[#4E4E54]">•</span>
                <span className="text-[11px] tracking-[0.15em] text-[#A0A0A8] uppercase">
                  {product.categoryName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {cartCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCart();
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#333338] text-[11px] tracking-wider uppercase text-[#D0D0D5] hover:border-white transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>BAG ({cartCount})</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#A0A0A8] hover:text-white hover:bg-[#1C1C20] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Product Visual Presentation */}
              <div className="relative aspect-[3/4] w-full max-w-[480px] mx-auto bg-[#161619] border border-[#222226] rounded-sm overflow-hidden group">
                <img
                  src={activeColor.image}
                  alt={`${product.title} - ${activeColor.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase text-white/90 border border-white/10">
                  {activeColor.name}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 text-[12px] tracking-wider text-white font-mono">
                  {product.price}
                </div>
              </div>

              {/* Title & Price Header */}
              <div className="border-b border-[#222226] pb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] uppercase text-white">
                    {product.title}
                  </h2>
                  <span className="text-[22px] sm:text-[26px] font-mono tracking-tight text-white">
                    {product.price}
                  </span>
                </div>
                <p className="mt-1 text-[13px] tracking-wider uppercase text-[#88888E]">
                  {product.subheading}
                </p>

                {/* Highlight Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.highlightBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase bg-[#18181C] text-[#C4C4CC] border border-[#2B2B32]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#88888E]">
                    COLORWAY
                  </span>
                  <span className="text-[11px] tracking-wider uppercase font-semibold text-white">
                    {activeColor.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = activeColor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-sm border transition-all ${
                          isSelected
                            ? 'border-white bg-[#1A1A20]'
                            : 'border-[#26262B] bg-[#121215] hover:border-[#44444D]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span
                          className={`text-[11px] tracking-wider uppercase ${
                            isSelected ? 'text-white font-medium' : 'text-[#8E8E98]'
                          }`}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#88888E]">
                    SELECT SIZE
                  </span>
                  <span className="text-[11px] tracking-wider text-[#73737C] underline cursor-pointer">
                    RELAXED TAILORING GUIDE
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-11 flex items-center justify-center text-[12px] font-mono tracking-wider border transition-all ${
                          isSelected
                            ? 'border-white bg-white text-black font-bold'
                            : 'border-[#26262B] bg-[#121215] text-[#D0D0D5] hover:border-[#4E4E58]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Garment Editorial Description */}
              <div className="space-y-2 border-t border-[#222226] pt-6">
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#88888E]">
                  DESIGN SPECIFICATION
                </h3>
                <p className="text-[13px] leading-[170%] text-[#B5B5BE]">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="border-t border-[#222226] pt-6 space-y-2.5">
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#88888E] mb-3">
                  CONSTRUCTION ATTRIBUTES
                </h3>
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between py-1.5 border-b border-[#1A1A1E] text-[12px]"
                  >
                    <span className="text-[#7A7A84] tracking-wider">{spec.label}</span>
                    <span className="text-[#D8D8DE] tracking-wide text-right font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="px-6 py-5 border-t border-[#222226] bg-[#0E0E10] flex flex-col sm:flex-row gap-3 items-center">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full h-12 flex items-center justify-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all ${
                  addedAnimation
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white text-black hover:bg-[#E5E5E5]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <span>ADD TO BAG — {product.price}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAdd();
                  onClose();
                  onOpenCart();
                }}
                className="w-full sm:w-auto sm:px-6 h-12 flex items-center justify-center text-[12px] tracking-[0.18em] uppercase border border-[#33333A] text-white hover:border-white transition-colors whitespace-nowrap"
              >
                CHECKOUT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
