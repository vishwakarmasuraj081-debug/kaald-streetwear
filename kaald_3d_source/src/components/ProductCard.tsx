import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { Heart, Eye, ShoppingBag, Box } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size: string) => void;
  onClick: (product: Product) => void;
  onView3D?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onClick,
  onView3D,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [hovered, setHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  // Secondary image on hover
  const displayImage = hovered && product.images[1] ? product.images[1] : product.images[0];

  const handleSizeSelect = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedColor, size);
    setShowSizePicker(false);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizePicker(false);
      }}
      className="group relative flex flex-col bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#333] transition-all duration-300"
    >
      {/* Product Image Frame */}
      <div
        onClick={() => onClick(product)}
        className="relative aspect-[4/5] w-full bg-[#121212] overflow-hidden cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Tag / Badge Top Left */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 bg-[#070707]/80 backdrop-blur-md border border-[#282828] text-[9px] font-mono-tech tracking-[0.2em] uppercase text-[#E5E5E0]">
              {product.tag}
            </span>
          </div>
        )}

        {/* 3D Available Badge */}
        {product.model3dAvailable && (
          <div className="absolute top-3 right-12 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onView3D) onView3D(product);
                else onClick(product);
              }}
              className="flex items-center gap-1 px-2 py-0.5 bg-[#070707]/80 backdrop-blur-md border border-[#282828] text-[9px] font-mono-tech tracking-wider uppercase text-[#CCC] hover:text-white transition-colors"
              title="Interactive 3D model available"
            >
              <Box className="w-3 h-3 text-[#E5E5E0]" />
              <span className="hidden sm:inline">3D</span>
            </button>
          </div>
        )}

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center border transition-colors ${
            isWishlisted
              ? 'bg-[#F4F4F1] border-[#F4F4F1] text-[#070707]'
              : 'bg-[#070707]/70 backdrop-blur-md border-[#282828] text-[#999] hover:text-[#F4F4F1] hover:border-[#444]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!showSizePicker ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSizePicker(true);
                }}
                className="flex-1 py-2.5 bg-[#F4F4F1] text-[#070707] text-[10px] font-display font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(product);
                }}
                className="w-10 py-2.5 bg-[#141414] border border-[#282828] text-[#F4F4F1] hover:bg-[#202020] flex items-center justify-center transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-2 bg-[#070707]/95 border border-[#333] flex flex-col gap-1.5 animate-fade-in">
              <span className="text-[9px] font-mono-tech text-[#888] text-center tracking-widest uppercase">
                SELECT SIZE
              </span>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => handleSizeSelect(s, e)}
                    className="py-1 text-[10px] font-mono-tech font-bold bg-[#181818] border border-[#2E2E2E] text-[#DDD] hover:bg-[#F4F4F1] hover:text-[#070707] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: c.hex }}
                className={`w-3 h-3 rounded-full border transition-transform ${
                  selectedColor.name === c.name
                    ? 'border-[#F4F4F1] scale-125'
                    : 'border-[#333] hover:scale-110'
                }`}
                title={c.name}
              />
            ))}
            {product.gsm && (
              <span className="ml-auto text-[9px] font-mono-tech text-[#666]">
                {product.gsm} GSM
              </span>
            )}
          </div>

          {/* Product Name */}
          <h4
            onClick={() => onClick(product)}
            className="font-display font-bold text-sm tracking-tight text-[#E8E8E4] group-hover:text-white transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h4>

          {/* Subtitle / Short description */}
          <p className="text-[11px] text-[#787872] line-clamp-1 mt-1 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2.5 border-t border-[#181818] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-tech text-sm font-bold text-[#F4F4F1]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono-tech text-xs text-[#555] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono-tech text-[#555] uppercase">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};
