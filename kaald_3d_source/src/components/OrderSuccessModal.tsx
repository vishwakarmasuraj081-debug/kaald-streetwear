import React from 'react';
import { CartItem } from '../types';
import { CheckCircle, Package, ArrowRight, Printer, ShieldCheck } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  items: CartItem[];
  orderId: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderTotal,
  items,
  orderId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070707]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0D0D0D] border border-[#262626] p-6 sm:p-10 shadow-2xl my-auto">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/80 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mb-1">
            ORDER CONFIRMATION // DISPATCH QUEUE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F4F4F1] uppercase">
            BORN IN MOTION
          </h2>
          <p className="text-xs font-mono-tech text-[#888] mt-2">
            THANK YOU FOR SUPPORTING INDEPENDENT STREETWEAR.
          </p>
        </div>

        {/* Order Identifier & Timelines Box */}
        <div className="p-4 bg-[#121212] border border-[#222] mb-6 flex items-center justify-between text-xs font-mono-tech">
          <div>
            <span className="text-[#666] block">ORDER NUMBER:</span>
            <span className="text-[#F4F4F1] font-bold text-sm">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[#666] block">ESTIMATED DISPATCH:</span>
            <span className="text-emerald-400 font-bold">24–48 HOURS</span>
          </div>
        </div>

        {/* Items Summary */}
        <div className="mb-6 border-y border-[#1C1C1C] py-4 max-h-48 overflow-y-auto space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-10 h-12 object-cover bg-[#161616]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[#DDD] font-bold block">{item.product.name}</span>
                  <span className="text-[#777] text-[10px]">
                    {item.selectedSize} // {item.selectedColor.name} (QTY: {item.quantity})
                  </span>
                </div>
              </div>
              <span className="text-[#F4F4F1] font-bold">
                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between font-mono-tech text-base font-bold text-[#F4F4F1] mb-8 pb-4 border-b border-[#1C1C1C]">
          <span>TOTAL PAID</span>
          <span className="text-lg">₹{orderTotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Security & Logistics Tag */}
        <div className="p-3 bg-[#111] border border-[#222] flex items-center gap-3 text-[11px] font-mono-tech text-[#888] mb-8">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Track and dispatch updates sent via SMS & Email. 7-day hassle-free returns on all garments.</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-[#F4F4F1] text-[#070707] font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            <span>CONTINUE EXPLORING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 bg-[#141414] border border-[#282828] text-xs font-mono-tech text-[#AAA] hover:text-white hover:border-[#444] transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT RECEIPT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
