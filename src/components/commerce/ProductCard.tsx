import React, { useState } from 'react';
import { Product, ProductColor } from '../../types';
import { useCommerce } from '../../context/CommerceContext';
import { Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProduct, toggleWishlist, isWishlisted, addToCart } = useCommerce();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(product.id);

  // Dynamic image resolution
  const primaryImage = selectedColor?.image || product.images[0];
  const hoverImage = product.images[1] || primaryImage;
  const currentImage = isHovered && hoverImage ? hoverImage : primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, selectedColor, defaultSize, 1);
  };

  return (
    <div
      onClick={() => setActiveProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col justify-between space-y-3 relative"
    >
      {/* Image Display */}
      <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden rounded-sm">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
        />

        {/* Tag / Badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white text-black px-2.5 py-0.5 text-[9px] font-bold font-mono tracking-widest uppercase rounded-sm z-10">
            {product.tag}
          </span>
        )}

        {/* Quick Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            wishlisted
              ? 'bg-black/80 text-red-500 scale-100 opacity-100'
              : 'bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black'
          }`}
          aria-label="Save product"
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white/95 hover:bg-white text-black font-extrabold text-[11px] font-mono tracking-widest uppercase rounded-sm flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>QUICK ADD ({product.sizes[0] || 'M'})</span>
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="space-y-1.5 text-left">
        {/* Color Dots */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 py-0.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3 h-3 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'border-white scale-110 shadow-sm'
                    : 'border-white/30 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[10px] font-mono text-neutral-500 ml-1">
              {product.colors.length}
            </span>
          </div>
        )}

        <h3 className="text-[13px] font-bold text-white tracking-tight uppercase line-clamp-1 group-hover:text-neutral-300 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between font-mono text-[12px]">
          <span className="text-neutral-300 font-bold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span className="text-neutral-500 line-through text-[11px]">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
