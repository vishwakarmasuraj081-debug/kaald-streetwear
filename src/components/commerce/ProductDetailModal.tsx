import React, { useState, useEffect } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductColor } from '../../types';
import {
  X,
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProduct,
    setActiveProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsSizeGuideOpen,
  } = useCommerce();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Collapsible accordions state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    description: true,
    fit: true,
    fabric: false,
    details: false,
    care: false,
    shipping: false,
    reviews: false,
  });

  // Pin Code Checker State
  const [pinCode, setPinCode] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  useEffect(() => {
    if (activeProduct) {
      setSelectedColor(activeProduct.colors[0] || null);
      setSelectedSize(activeProduct.sizes[0] || 'M');
      setSelectedImageIdx(0);
      setPinStatus(null);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const currentWishlisted = isWishlisted(activeProduct.id);

  // Available images combining color-specific images and product image gallery
  const allImages = [
    ...(selectedColor?.image ? [selectedColor.image] : []),
    ...activeProduct.images,
  ].filter((v, i, a) => a.indexOf(v) === i); // unique

  const activeImage = allImages[selectedImageIdx] || allImages[0];

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
      setPinStatus(`Delivery available to ${pinCode}: Dispatches within 24 hours (Free Express Delivery)`);
    } else {
      setPinStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-6xl bg-[#0A0A0A] text-white border border-white/15 rounded-sm shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Top Bar Close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E] flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                {activeProduct.category}
              </span>
              <span className="text-neutral-600">/</span>
              <span className="text-[11px] font-mono tracking-widest text-white uppercase">
                {activeProduct.collection || 'DROP 01'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Main Content (Split Desktop, Stacked Mobile) */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* LEFT COLUMN: Gallery */}
            <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 space-y-4">
              {/* Active Large Display */}
              <div className="w-full aspect-[3/4] max-h-[640px] bg-neutral-900 overflow-hidden rounded-sm relative">
                <img
                  src={activeImage}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover select-none"
                />
                {activeProduct.tag && (
                  <span className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[10px] font-bold font-mono tracking-widest uppercase rounded-sm">
                    {activeProduct.tag}
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-20 h-24 sm:w-24 sm:h-28 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIdx === idx
                          ? 'border-white scale-102'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Info & Purchase Workflow */}
            <div className="lg:col-span-5 p-6 lg:p-8 space-y-6 lg:overflow-y-auto">
              {/* Product Header */}
              <div className="space-y-2">
                <h1 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight uppercase leading-tight font-sans">
                  {activeProduct.name}
                </h1>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[22px] font-bold text-white">
                    ₹{activeProduct.price.toLocaleString('en-IN')}
                  </span>
                  {activeProduct.compareAtPrice && (
                    <span className="text-[14px] text-neutral-500 line-through">
                      ₹{activeProduct.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[11px] text-neutral-400 pl-2 border-l border-white/20">
                    TAXES INCLUDED
                  </span>
                </div>
              </div>

              {/* Fit Indicator */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  SILHOUETTE:
                </span>
                <span className="px-2 py-0.5 bg-white/10 text-white rounded-sm text-[10px] font-mono tracking-wider uppercase font-bold">
                  {activeProduct.fitType || activeProduct.fit}
                </span>
                {activeProduct.gsm && (
                  <span className="px-2 py-0.5 bg-neutral-900 border border-white/15 text-neutral-300 rounded-sm text-[10px] font-mono tracking-wider uppercase">
                    {activeProduct.gsm} GSM
                  </span>
                )}
              </div>

              {/* COLOR SELECTION */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400 uppercase tracking-wider">
                    COLOR: <strong className="text-white">{selectedColor?.name}</strong>
                  </span>
                  <span className="text-neutral-500">
                    {activeProduct.colors.length} {activeProduct.colors.length === 1 ? 'COLORWAY' : 'COLORWAYS'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {activeProduct.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedImageIdx(0);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'border-white bg-white/15 text-white font-bold'
                            : 'border-white/20 text-neutral-400 hover:border-white/50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SIZE SELECTION */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400 uppercase tracking-wider">
                    SELECT SIZE: <strong className="text-white">{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-white hover:text-neutral-300 transition-colors underline cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>FIND YOUR SIZE / GUIDE</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {activeProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-center text-[12px] font-mono uppercase tracking-wider font-bold rounded-sm border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-md scale-102'
                            : 'border-white/20 text-neutral-300 hover:border-white/50 hover:bg-white/5'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTION BUTTONS (ADD TO BAG + SAVE) */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedColor) {
                      addToCart(activeProduct, selectedColor, selectedSize, 1);
                    }
                  }}
                  className="flex-1 py-4 bg-white text-black font-extrabold text-[13px] tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow-lg active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className={`px-5 py-4 border rounded-sm transition-colors flex items-center justify-center cursor-pointer ${
                    currentWishlisted
                      ? 'bg-red-500/10 border-red-500 text-red-400'
                      : 'border-white/20 text-white hover:border-white hover:bg-white/5'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      currentWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* DELIVERY PIN CODE CHECKER */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ESTIMATE DELIVERY TO YOUR PIN CODE</span>
                </div>
                <form onSubmit={handleCheckPin} className="flex gap-2 font-mono">
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="ENTER 6-DIGIT PIN CODE"
                    className="flex-1 bg-black border border-white/20 px-3 py-2 text-[12px] text-white rounded-sm focus:border-white focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 border border-white/20 hover:border-white text-[11px] uppercase tracking-wider font-bold text-white rounded-sm"
                  >
                    CHECK
                  </button>
                </form>
                {pinStatus && (
                  <p className="text-[11px] font-mono text-emerald-400 pt-1">
                    {pinStatus}
                  </p>
                )}
              </div>

              {/* STRUCTURED ACCORDIONS */}
              <div className="border-t border-white/10 divide-y divide-white/10 font-mono text-[12px]">
                {/* Description */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('description')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>DESCRIPTION</span>
                    {openAccordions.description ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.description && (
                    <div className="pb-4 text-neutral-400 leading-relaxed font-sans text-[13px]">
                      {activeProduct.description}
                    </div>
                  )}
                </div>

                {/* Fit & Silhouette */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('fit')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>FIT & SILHOUETTE</span>
                    {openAccordions.fit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.fit && (
                    <div className="pb-4 space-y-2 text-neutral-400">
                      <p className="font-bold text-white">{activeProduct.fit}</p>
                      <p className="text-[11px] text-neutral-400">
                        Engineered for free movement across urban landscapes. True to size for intentional oversized silhouette.
                      </p>
                    </div>
                  )}
                </div>

                {/* Fabric & Material */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>FABRIC & WEIGHT</span>
                    {openAccordions.fabric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.fabric && (
                    <div className="pb-4 space-y-1 text-neutral-400">
                      <p className="font-bold text-white">
                        {activeProduct.fabric || activeProduct.material}
                      </p>
                      {activeProduct.gsm && (
                        <p className="text-[11px] text-neutral-400">
                          Knitted at {activeProduct.gsm} GSM for heavyweight drape and zero fabric collapse.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Details */}
                {activeProduct.details && activeProduct.details.length > 0 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleAccordion('details')}
                      className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                    >
                      <span>CONSTRUCTION DETAILS</span>
                      {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openAccordions.details && (
                      <ul className="pb-4 space-y-1 text-neutral-400 list-disc list-inside text-[11px]">
                        {activeProduct.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Care */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('care')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>CARE INSTRUCTIONS</span>
                    {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.care && (
                    <div className="pb-4 text-neutral-400 text-[11px] leading-relaxed">
                      {activeProduct.care}
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>SHIPPING & RETURNS</span>
                    {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.shipping && (
                    <div className="pb-4 space-y-2 text-neutral-400 text-[11px] leading-relaxed">
                      <p>{activeProduct.shipping}</p>
                      <p>{activeProduct.returns || '10-day exchange and return window on unworn garments.'}</p>
                    </div>
                  )}
                </div>

                {/* Verified Reviews */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('reviews')}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold tracking-wider uppercase text-neutral-300 hover:text-white"
                  >
                    <span>REVIEWS & FIT FEEDBACK (4.9 / 5.0)</span>
                    {openAccordions.reviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.reviews && (
                    <div className="pb-4 space-y-4 text-neutral-400 text-[11px]">
                      {/* Fit Feedback Indicator */}
                      <div className="bg-neutral-900/60 p-3 rounded-sm space-y-1">
                        <span className="text-[10px] text-neutral-500 uppercase block tracking-wider">
                          CUSTOMER FIT CONSENSUS:
                        </span>
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                          <span>RUNS SMALL</span>
                          <span className="text-white font-bold">TRUE TO OVERSIZED</span>
                          <span>RUNS LARGE</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-800 rounded-full relative my-1">
                          <div className="absolute left-[54%] -top-1 w-3 h-3 bg-white rounded-full -translate-x-1/2" />
                        </div>
                      </div>

                      {/* Verified Review Sample */}
                      <div className="border border-white/5 p-3 rounded-sm space-y-1 bg-black/40">
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-neutral-500">MUMBAI · VERIFIED</span>
                        </div>
                        <p className="text-[12px] text-neutral-200 font-sans italic">
                          "The weight and collar firmness is unmatched in Indian streetwear. Drapes exactly like shown."
                        </p>
                        <span className="text-[10px] text-neutral-500 block">Karan M. — Ordered Size L</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
