import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { X, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    setActiveProduct,
  } = useCommerce();

  const handleCheckout = () => {
    alert(
      `ORDER INITIATED\nTotal: ₹${cartSubtotal.toLocaleString('en-IN')}\n\nThis would connect to your payment gateway (Razorpay / Stripe) in production.`
    );
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                    YOUR BAG
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                    [{cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}]
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
                  aria-label="Close Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-neutral-900/60 px-6 py-3 border-b border-white/5 flex items-center gap-2 text-[11px] font-mono text-neutral-300">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                {cartSubtotal >= 2499 ? (
                  <span className="text-emerald-400">
                    COMPLIMENTARY EXPRESS SHIPPING UNLOCKED
                  </span>
                ) : (
                  <span>
                    ADD ₹{(2499 - cartSubtotal).toLocaleString('en-IN')} FOR FREE
                    SHIPPING
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="py-24 text-center space-y-4">
                    <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">
                      BAG STATUS
                    </span>
                    <p className="text-[20px] font-bold text-white uppercase tracking-tight">
                      YOUR CART IS EMPTY.
                    </p>
                    <p className="text-[13px] text-neutral-400 max-w-[240px] mx-auto">
                      Discover the collection and build your uniform in motion.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById('new-arrivals');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors rounded-sm"
                    >
                      START EXPLORING <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemImage =
                      item.selectedColor.image || item.product.images[0];
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-6 border-b border-white/5 last:border-0"
                      >
                        {/* Thumbnail */}
                        <div
                          onClick={() => {
                            setIsCartOpen(false);
                            setActiveProduct(item.product);
                          }}
                          className="w-20 h-24 sm:w-24 sm:h-28 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer"
                        >
                          <img
                            src={itemImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4
                                onClick={() => {
                                  setIsCartOpen(false);
                                  setActiveProduct(item.product);
                                }}
                                className="text-[13px] font-bold text-white uppercase tracking-tight line-clamp-1 hover:text-neutral-300 cursor-pointer"
                              >
                                {item.product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1">
                              {item.selectedColor.name} · SIZE {item.selectedSize}
                            </p>

                            <p className="text-[13px] font-mono text-neutral-200 mt-2">
                              ₹{item.product.price.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center border border-white/20 rounded-sm overflow-hidden font-mono text-[12px]">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 text-white font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[12px] font-mono text-neutral-400 ml-auto font-bold">
                              ₹
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#070707] space-y-4">
                  <div className="space-y-2 text-[12px] font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>SUBTOTAL</span>
                      <span className="text-white font-bold">
                        ₹{cartSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>SHIPPING</span>
                      <span>
                        {cartSubtotal >= 2499 ? (
                          <span className="text-emerald-400">COMPLIMENTARY</span>
                        ) : (
                          '₹150'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>TAXES</span>
                      <span>INCLUDED</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-[14px] text-white font-bold">
                      <span>ESTIMATED TOTAL</span>
                      <span>
                        ₹
                        {(
                          cartSubtotal + (cartSubtotal >= 2499 ? 0 : 150)
                        ).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-4 bg-white text-black font-extrabold text-[13px] tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow-lg active:scale-[0.99]"
                  >
                    <span>CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-wider pt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SECURE 256-BIT ENCRYPTION · EASY RETURNS</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
