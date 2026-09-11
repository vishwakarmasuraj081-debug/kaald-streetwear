import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (orderTotal: number, items: CartItem[]) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 2499;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shipping;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BORNINMOTION') {
      setDiscountPercent(15);
      setPromoMessage('15% MOTION DISCOUNT APPLIED');
    } else {
      setPromoMessage('INVALID CODE. TRY "BORNINMOTION"');
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      onCheckoutSuccess(total, cart);
      setIsCheckingOut(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#070707]/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="relative w-full max-w-md h-full bg-[#0B0B0B] border-l border-[#222] shadow-2xl flex flex-col justify-between p-6 sm:p-8">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F4F4F1]" />
              <span className="font-display font-bold text-lg uppercase tracking-wider text-[#F4F4F1]">
                YOUR BAG ({cart.reduce((n, i) => n + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="py-4 border-b border-[#1C1C1C]">
            <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-400 font-bold">✓ YOU HAVE UNLOCKED FREE SHIPPING</span>
                ) : (
                  <span className="text-[#AAA]">
                    ADD ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} MORE FOR FREE DELIVERY
                  </span>
                )}
              </span>
              <span className="text-[#777]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1 bg-[#1A1A1A] overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <ShoppingBag className="w-12 h-12 text-[#2A2A2A] mb-4" />
              <span className="font-display font-bold text-lg text-[#F4F4F1] uppercase">
                YOUR BAG IS EMPTY
              </span>
              <p className="text-xs font-mono-tech text-[#777] mt-2 max-w-xs">
                EXPLORE DROP 01 TO DISCOVER 480 GSM HEAVYWEIGHT HOODIES AND CARGOS.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-[#F4F4F1] text-[#070707] text-xs font-display font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                DISCOVER THE COLLECTION
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}-${idx}`}
                className="flex gap-4 p-3 bg-[#111111] border border-[#202020] relative group"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 aspect-[4/5] bg-[#161616] overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#F4F4F1] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] font-mono-tech text-[#888]">
                      <span>COLOR: {item.selectedColor.name}</span>
                      <span>•</span>
                      <span>SIZE: {item.selectedSize}</span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#2A2A2A] bg-[#161616]">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#888] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-mono-tech text-[#F4F4F1]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#888] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#F4F4F1]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="absolute top-2 right-2 p-1 text-[#666] hover:text-rose-400 transition-colors"
                  title="Remove"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#1C1C1C] space-y-4">
            {/* Promo Code input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (BORNINMOTION)"
                className="flex-1 px-3 py-2 bg-[#121212] border border-[#282828] text-xs font-mono-tech uppercase text-[#FFF] placeholder-[#555] focus:outline-none focus:border-[#555]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#1C1C1C] border border-[#333] text-xs font-mono-tech text-[#AAA] hover:text-white transition-colors"
              >
                APPLY
              </button>
            </form>
            {promoMessage && (
              <p className={`text-[10px] font-mono-tech uppercase ${discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {promoMessage}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-mono-tech text-[#888]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#DDD]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>MOTION PROMO (-{discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ESTIMATED SHIPPING</span>
                <span className="text-[#DDD]">
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#222] flex justify-between text-sm font-bold text-[#F4F4F1]">
                <span>TOTAL</span>
                <span className="font-mono-tech text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCompleteOrder}
                disabled={isCheckingOut}
                className="w-full py-4 bg-[#F4F4F1] text-[#070707] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>PROCESSING ENCRYPTED ORDER...</span>
                ) : (
                  <>
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-[11px] font-mono-tech text-[#888] hover:text-white uppercase tracking-wider text-center"
              >
                CONTINUE SHOPPING
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-[#666]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% SECURE ENCRYPTED CHECKOUT // PAN-INDIA EXPRESS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
