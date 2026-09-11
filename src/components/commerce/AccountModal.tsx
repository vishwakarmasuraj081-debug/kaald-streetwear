import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { X, Package, Heart, MapPin, User, LogOut, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'ORDERS' | 'WISHLIST' | 'ADDRESSES' | 'PROFILE';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, wishlist, setIsWishlistOpen } = useCommerce();
  const [activeTab, setActiveTab] = useState<Tab>('ORDERS');

  return (
    <AnimatePresence>
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl bg-[#0D0D0D] border border-white/10 text-white rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-[20px] font-bold tracking-tight uppercase">
                  MY ACCOUNT
                </h3>
                <p className="text-[11px] font-mono text-neutral-400 tracking-wider mt-0.5">
                  KAALD CLUB MEMBERSHIP · GUEST ACTIVE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAccountOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-neutral-900/40 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('ORDERS')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'ORDERS'
                    ? 'border-white text-white font-bold bg-white/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>ORDERS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('WISHLIST')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'WISHLIST'
                    ? 'border-white text-white font-bold bg-white/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>WISHLIST ({wishlist.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ADDRESSES')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'ADDRESSES'
                    ? 'border-white text-white font-bold bg-white/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>ADDRESSES</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('PROFILE')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'PROFILE'
                    ? 'border-white text-white font-bold bg-white/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>PROFILE</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 space-y-6 min-h-[260px]">
              {activeTab === 'ORDERS' && (
                <div className="space-y-4">
                  <div className="p-4 border border-white/10 rounded-sm bg-neutral-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        ORDER #KLD-90248 · 09 SEPT 2026
                      </span>
                      <h4 className="text-[14px] font-bold text-white uppercase mt-1">
                        MOTION HOODIE (480 GSM) — L
                      </h4>
                      <p className="text-[12px] font-mono text-neutral-300">
                        ₹2,499 · PAID (UPI)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded-full border border-emerald-500/30">
                      DISPATCHED
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-neutral-500 text-center pt-2">
                    Orders dispatch within 24 hours from our Mumbai facility.
                  </p>
                </div>
              )}

              {activeTab === 'WISHLIST' && (
                <div className="text-center py-8 space-y-3">
                  <p className="text-[14px] text-neutral-300">
                    You have <span className="text-white font-bold">{wishlist.length} items</span> saved in your personal archive.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAccountOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-200"
                  >
                    <span>VIEW FULL WISHLIST</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {activeTab === 'ADDRESSES' && (
                <div className="space-y-4 font-mono text-[12px]">
                  <div className="p-4 border border-white/10 rounded-sm bg-neutral-900/30">
                    <span className="text-[10px] text-neutral-400 uppercase block tracking-wider">
                      PRIMARY SHIPPING ADDRESS
                    </span>
                    <p className="text-white font-bold mt-1">ARJUN SHARMA</p>
                    <p className="text-neutral-300">Flat 402, Signature Heights, Bandra West</p>
                    <p className="text-neutral-300">Mumbai, Maharashtra — 400050</p>
                    <p className="text-neutral-400 mt-1">+91 98200 XXXXX</p>
                  </div>
                </div>
              )}

              {activeTab === 'PROFILE' && (
                <div className="space-y-4 font-mono text-[12px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-500 text-[10px]">FULL NAME</label>
                      <input
                        type="text"
                        readOnly
                        value="Arjun Sharma"
                        className="w-full bg-black border border-white/10 p-2 text-neutral-300 rounded-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-500 text-[10px]">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        readOnly
                        value="arjun@kaald.com"
                        className="w-full bg-black border border-white/10 p-2 text-neutral-300 rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-500">READY FOR API AUTH INTEGRATION</span>
              <button
                type="button"
                onClick={() => setIsAccountOpen(false)}
                className="text-neutral-400 hover:text-white flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
