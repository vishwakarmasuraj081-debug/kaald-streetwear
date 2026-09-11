import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { ProductViewer3D } from './3d/ProductViewer3D';
import { PRODUCTS } from '../data/products';
import {
  X,
  Heart,
  ShoppingBag,
  Box,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [mode3D, setMode3D] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('description');
  const [addedToast, setAddedToast] = useState(false);

  // Recommendations
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? '' : id);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div
      id="product-detail-modal-root"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#070707]/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-6"
    >
      <div className="relative w-full max-w-6xl min-h-screen md:min-h-0 bg-[#0B0B0B] border border-[#222] shadow-2xl flex flex-col my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#888] uppercase">
              SPECIFICATION ARCHIVE // {product.id}
            </span>
            {product.gsm && (
              <span className="px-2 py-0.5 bg-[#181818] border border-[#2A2A2A] text-[9px] font-mono-tech text-[#AAA]">
                {product.gsm} GSM
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888] hover:text-white hover:bg-[#1C1C1C] transition-colors"
            aria-label="Close Product View"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
          {/* LEFT: Gallery or 3D Visualizer (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-[#1E1E1E]">
            {/* 3D / 2D Switcher */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode3D(false)}
                  className={`px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase border transition-colors ${
                    !mode3D
                      ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                      : 'bg-[#141414] text-[#888] border-[#262626] hover:text-[#CCC]'
                  }`}
                >
                  STILL GALLERY
                </button>
                {product.model3dAvailable && (
                  <button
                    onClick={() => setMode3D(true)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase border transition-colors ${
                      mode3D
                        ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                        : 'bg-[#141414] text-[#888] border-[#262626] hover:text-[#CCC]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5 text-inherit" />
                    <span>VIEW IN 3D</span>
                  </button>
                )}
              </div>

              {product.model3dAvailable && (
                <span className="text-[10px] font-mono-tech text-[#666] hidden sm:inline">
                  {mode3D ? '360° INTERACTIVE ENGINE ACTIVE' : 'HIGH-RES EDITORIAL STILLS'}
                </span>
              )}
            </div>

            {/* Display Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#111] border border-[#222] overflow-hidden flex items-center justify-center">
              {mode3D ? (
                <ProductViewer3D
                  initialColorHex={selectedColor.hex}
                  hotspots={product.hotspots || []}
                  interactive={true}
                  showControls={true}
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover filter contrast-105"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Wishlist floating toggle */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border transition-colors ${
                  isWishlisted
                    ? 'bg-[#F4F4F1] border-[#F4F4F1] text-[#070707]'
                    : 'bg-[#070707]/70 backdrop-blur-md border-[#333] text-[#999] hover:text-white'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails (When 2D) */}
            {!mode3D && product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-20 border overflow-hidden transition-all flex-shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-[#F4F4F1] scale-105 ring-1 ring-[#F4F4F1]'
                        : 'border-[#222] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Metadata, Selection, & Actions (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              {/* Category & Title */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#7A7A74] uppercase">
                  {product.category} // URBAN SERIES
                </span>
                {product.tag && (
                  <span className="px-2 py-0.5 bg-[#181818] border border-[#333] text-[9px] font-mono-tech text-[#DDD] uppercase">
                    {product.tag}
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F4F4F1] leading-tight mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#1C1C1C]">
                <span className="font-mono-tech text-2xl font-bold text-[#F4F4F1]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-mono-tech text-sm text-[#555] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] font-mono-tech text-emerald-400 ml-auto">
                  INCLUSIVE OF ALL TAXES
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-display font-semibold uppercase tracking-wider text-[#C0C0B8]">
                    COLORWAY:
                  </span>
                  <span className="text-xs font-mono-tech text-[#888]">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-9 h-9 border relative transition-all ${
                          isSelected
                            ? 'border-[#F4F4F1] scale-105 ring-2 ring-[#F4F4F1]/30'
                            : 'border-[#333] hover:border-[#666]'
                        }`}
                        title={c.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-display font-semibold uppercase tracking-wider text-[#C0C0B8]">
                    SIZE:
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs font-mono-tech text-[#888] underline hover:text-[#F4F4F1] transition-colors"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-xs font-mono-tech font-bold uppercase border transition-all ${
                          isSelected
                            ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                            : 'bg-[#141414] text-[#999] border-[#2A2A2A] hover:border-[#555] hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-display font-semibold uppercase tracking-wider text-[#C0C0B8]">
                  QUANTITY:
                </span>
                <div className="flex items-center border border-[#2E2E2E] bg-[#141414]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-xs text-[#888] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono-tech text-[#F4F4F1]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-1.5 text-xs text-[#888] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs: Add to Cart & Buy Now */}
              <div className="flex flex-col gap-2.5 mb-8">
                <button
                  onClick={handleAdd}
                  className="w-full py-4 bg-[#F4F4F1] text-[#070707] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>
                <button
                  onClick={handleBuy}
                  className="w-full py-3.5 bg-[#141414] border border-[#333] text-[#F4F4F1] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#202020] hover:border-[#666] transition-all"
                >
                  BUY NOW (EXPRESS CHECKOUT)
                </button>
              </div>

              {addedToast && (
                <div className="mb-4 p-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-mono-tech uppercase tracking-wider animate-fade-in">
                  ✓ ADDED {quantity} ITEM(S) TO CART
                </div>
              )}

              {/* Accordions: Description, Material, Fit, Care, Shipping */}
              <div className="border-t border-[#1C1C1C] divide-y divide-[#1C1C1C] mb-8">
                {/* Description */}
                <div>
                  <button
                    onClick={() => toggleAccordion('description')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#E5E5E0] hover:text-white"
                  >
                    <span>PRODUCT DESCRIPTION</span>
                    {openAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'description' && (
                    <p className="pb-4 text-xs text-[#999] leading-relaxed font-light">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Material & GSM */}
                <div>
                  <button
                    onClick={() => toggleAccordion('material')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#E5E5E0] hover:text-white"
                  >
                    <span>MATERIAL & TEXTILE INTEGRITY</span>
                    {openAccordion === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'material' && (
                    <div className="pb-4 text-xs text-[#999] leading-relaxed space-y-1 font-mono-tech">
                      <p>COMPOSITION: {product.material}</p>
                      {product.gsm && <p>DENSITY: {product.gsm} GSM CUSTOM COMBED WEAVE</p>}
                      <p>ORIGIN: COMBED & KNITTED IN TAMIL NADU, INDIA</p>
                    </div>
                  )}
                </div>

                {/* Fit & Silhouette */}
                <div>
                  <button
                    onClick={() => toggleAccordion('fit')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#E5E5E0] hover:text-white"
                  >
                    <span>FIT & SILHOUETTE</span>
                    {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'fit' && (
                    <div className="pb-4 text-xs text-[#999] leading-relaxed space-y-1">
                      <p>{product.fit}</p>
                      <p className="text-[11px] text-[#777]">
                        Engineered for dropped posture with room in chest and arms. We recommend your standard size for the intended oversized drape.
                      </p>
                    </div>
                  )}
                </div>

                {/* Garment Care */}
                <div>
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#E5E5E0] hover:text-white"
                  >
                    <span>CARE INSTRUCTIONS</span>
                    {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'care' && (
                    <p className="pb-4 text-xs text-[#999] leading-relaxed font-light">
                      {product.care}
                    </p>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#E5E5E0] hover:text-white"
                  >
                    <span>SHIPPING & RETURNS</span>
                    {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <p className="pb-4 text-xs text-[#999] leading-relaxed font-light">
                      {product.shipping}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* You May Also Like Section */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-[#1C1C1C]">
                <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#777] uppercase block mb-3">
                  YOU MAY ALSO LIKE
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="group cursor-pointer bg-[#121212] border border-[#222] hover:border-[#444] p-2 flex flex-col transition-all"
                    >
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full aspect-square object-cover mb-2"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-display font-bold text-[#E5E5E0] line-clamp-1 group-hover:text-white">
                        {rel.name}
                      </span>
                      <span className="text-[9px] font-mono-tech text-[#888] mt-0.5">
                        ₹{rel.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
