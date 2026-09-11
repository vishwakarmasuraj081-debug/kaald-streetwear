import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from './ProductModalDrawer';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenItem: (productTitle: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [checkoutStep, setCheckoutStep] = React.useState<'cart' | 'success'>('cart');

  React.useEffect(() => {
    if (isOpen) {
      setCheckoutStep('cart');
    }
  }, [isOpen]);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.numericPrice * item.quantity,
    0
  );

  const formattedTotal = `₹${totalAmount.toLocaleString('en-IN')}`;

  const handleCheckout = () => {
    setCheckoutStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cart-drawer-portal"
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[520px] h-full bg-[#0E0E10] text-[#F3F3F3] border-l border-[#262628] flex flex-col z-10 shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222225] bg-[#0E0E10]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-white" />
                <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-white">
                  BAG ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#A0A0A8] hover:text-white hover:bg-[#1C1C20] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            {checkoutStep === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-[20px] tracking-[0.1em] uppercase font-semibold text-white">
                  ORDER RESERVED
                </h3>
                <p className="text-[13px] leading-relaxed text-[#A4A4AE] max-w-xs">
                  Your KAALD archive allocation is staged. Confirmation sent to your contact for express delivery.
                </p>
                <div className="p-4 bg-[#161619] border border-[#2B2B30] w-full text-left space-y-1 mt-4">
                  <div className="text-[10px] tracking-widest text-[#787882] uppercase">ORDER ID</div>
                  <div className="font-mono text-[13px] text-white">KAALD-2026-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full h-11 bg-white text-black text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#E5E5E5] transition-colors"
                >
                  RETURN TO ARCHIVE
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#4E4E56] stroke-1" />
                <p className="text-[13px] tracking-wider uppercase text-[#8E8E98]">
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <p className="text-[12px] text-[#606068] max-w-xs">
                  Explore the collection and select your preferred colorway and sizing.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-6 h-10 border border-[#333338] text-[11px] tracking-[0.18em] uppercase text-white hover:border-white transition-colors"
                >
                  EXPLORE COLLECTION
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#1F1F24]">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-start">
                      <div className="w-20 aspect-[3/4] bg-[#17171A] border border-[#2A2A30] overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-[13px] font-semibold tracking-wider uppercase text-white truncate">
                            {item.productTitle}
                          </h4>
                          <span className="text-[13px] font-mono text-white">
                            {item.price}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8C8C96] tracking-wider uppercase">
                          <span>{item.colorName}</span>
                          <span>•</span>
                          <span>SIZE {item.size}</span>
                        </div>

                        {/* Quantity and Remove */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#2B2B32] rounded-sm bg-[#121215]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#A0A0A8] hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[12px] font-mono text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#A0A0A8] hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#7A7A84] hover:text-red-400 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Summary */}
                <div className="px-6 py-5 border-t border-[#222226] bg-[#0E0E10] space-y-4">
                  <div className="space-y-1.5 text-[12px]">
                    <div className="flex justify-between text-[#8E8E98] tracking-wider">
                      <span>SHIPPING (INDIA DOMESTIC)</span>
                      <span className="text-white">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-[#8E8E98] tracking-wider">
                      <span>TAXES</span>
                      <span className="text-white">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold text-[14px] pt-2 border-t border-[#1C1C20]">
                      <span className="tracking-wider">SUBTOTAL</span>
                      <span className="font-mono">{formattedTotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full h-12 bg-white text-black text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
