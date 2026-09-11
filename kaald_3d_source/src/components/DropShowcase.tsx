import React, { useState } from 'react';
import { ProductViewer3D } from './3d/ProductViewer3D';
import { PRODUCTS } from '../data/products';
import { Product, ProductColor, ProductHotspot } from '../types';
import { Check, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface DropShowcaseProps {
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const DropShowcase: React.FC<DropShowcaseProps> = ({
  onAddToCart,
  onOpenProductDetail,
  onOpenSizeGuide,
}) => {
  const featuredProduct = PRODUCTS[0]; // MOTION HOODIE — SIGNATURE DROP 01
  const [selectedColor, setSelectedColor] = useState<ProductColor>(featuredProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [activeHotspot, setActiveHotspot] = useState<ProductHotspot | null>(
    featuredProduct.hotspots ? featuredProduct.hotspots[0] : null
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(featuredProduct, selectedColor, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section
      id="drop"
      className="relative w-full py-28 bg-[#0A0A0A] text-[#F4F4F1] border-b border-[#1E1E1E] overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#222]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2D2D2D] text-[10px] font-mono-tech tracking-[0.25em] text-[#AAA] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIMITED QUANTITY // IN STOCK</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em]">
              THE DROP — DROP 01
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <span className="text-xs font-mono-tech tracking-[0.2em] text-[#888] block">
              SIGNATURE HERO PIECE
            </span>
            <span className="font-display font-bold text-2xl sm:text-3xl text-[#F4F4F1]">
              ₹2,499
            </span>
            <span className="text-xs font-mono-tech text-[#666] line-through ml-2">
              ₹3,499
            </span>
          </div>
        </div>

        {/* Main 3D Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Model Stage (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#0E0E0E] border border-[#242424] shadow-2xl overflow-hidden">
              <ProductViewer3D
                initialColorHex={selectedColor.hex}
                hotspots={featuredProduct.hotspots || []}
                onHotspotClick={(hs) => setActiveHotspot(hs)}
                activeHotspotId={activeHotspot?.id}
                interactive={true}
                showControls={true}
                className="w-full h-full"
              />
            </div>

            {/* Active Hotspot Mini Overlay Card */}
            {activeHotspot && (
              <div className="mt-4 p-5 bg-[#121212] border border-[#262626] flex items-start justify-between gap-4 transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono-tech font-bold text-[#E5E5E0] bg-[#222] px-2 py-0.5">
                      FEATURE HOTSPOT
                    </span>
                    <span className="text-xs font-display font-bold uppercase tracking-wider text-[#F4F4F1]">
                      {activeHotspot.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-tech tracking-wider text-[#A0A09A] block mb-1">
                    {activeHotspot.tagline}
                  </span>
                  <p className="text-xs text-[#8E8E88] font-light leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-xs font-mono-tech text-[#666] hover:text-[#AAA] px-2 py-1"
                >
                  DISMISS
                </button>
              </div>
            )}
          </div>

          {/* Product Specifications & Order Module (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#111111] p-6 sm:p-8 border border-[#222]">
            {/* Title & Tag */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#7A7A74] uppercase">
                  UNISEX // HEAVYWEIGHT 480 GSM
                </span>
                <span className="text-xs font-mono-tech text-[#AAA] border border-[#333] px-2 py-0.5">
                  100% INDIAN COTTON
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4F4F1] mt-2">
                {featuredProduct.name}
              </h3>
              <p className="text-xs text-[#9E9E98] mt-3 leading-relaxed font-light">
                {featuredProduct.description}
              </p>
            </div>

            {/* Color Swatches */}
            <div className="mb-6 pb-6 border-b border-[#1E1E1E]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-display font-semibold uppercase tracking-wider text-[#C0C0B8]">
                  COLORWAY:
                </span>
                <span className="text-xs font-mono-tech text-[#888]">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featuredProduct.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-9 h-9 border relative transition-all ${
                        isSelected
                          ? 'border-[#F4F4F1] scale-105 ring-2 ring-[#F4F4F1]/40'
                          : 'border-[#333] hover:border-[#666]'
                      }`}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto mix-blend-difference" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-display font-semibold uppercase tracking-wider text-[#C0C0B8]">
                  SELECT SIZE:
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs font-mono-tech text-[#888] underline hover:text-[#F4F4F1] transition-colors"
                >
                  SIZE GUIDE (CM / INCH)
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {featuredProduct.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-mono-tech font-semibold tracking-wider uppercase border transition-all ${
                        isSelected
                          ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                          : 'bg-[#151515] text-[#999] border-[#2A2A2A] hover:border-[#555] hover:text-[#FFF]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-[#F4F4F1] text-[#070707] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART — ₹2,499</span>
              </button>
              <button
                onClick={() => onOpenProductDetail(featuredProduct)}
                className="w-full py-3.5 bg-transparent border border-[#333] text-[#CCC] font-display font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#1C1C1C] hover:text-[#FFF] hover:border-[#666] transition-all"
              >
                VIEW FULL SPECIFICATIONS
              </button>
            </div>

            {/* Added Toast Feedback */}
            {addedNotice && (
              <div className="mt-3 p-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-mono-tech uppercase tracking-wider animate-fade-in">
                ✓ ADDED TO BAG // CART PERSISTED
              </div>
            )}

            {/* Reassurance Footer */}
            <div className="mt-8 pt-6 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono-tech text-[#666]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#AAA]" />
                GENUINE 480 GSM TERRY
              </span>
              <span>7-DAY HASSLE-FREE RETURNS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
