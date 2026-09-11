import React, { useState, useEffect } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    setActiveCategory,
  } = useCommerce();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent to frosted black when scrolling past 150px
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, category?: string) => {
    setIsMobileMenuOpen(false);
    if (category) {
      setActiveCategory(category);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-xl'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* LEFT: KAALD Brand Wordmark */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            aria-label="KAALD Home"
          >
            <span className="font-extrabold text-[20px] sm:text-[24px] tracking-[-0.05em] text-white uppercase font-sans">
              KAALD
            </span>
            <span className="hidden md:inline-block text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono pl-1 border-l border-white/20">
              BORN IN MOTION
            </span>
          </button>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <button
              type="button"
              onClick={() => scrollToSection('new-arrivals')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              NEW ARRIVALS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('shop-all')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              SHOP ALL
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('collections')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              COLLECTIONS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('campaign-drop01')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              DROP 01
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('material-craft')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              CRAFT
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kaald-world')}
              className="text-[13px] tracking-[0.08em] uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              ABOUT
            </button>
          </nav>

          {/* RIGHT: Actions (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* SEARCH */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="hidden xl:inline-block text-[12px] uppercase tracking-wider font-mono">
                SEARCH
              </span>
            </button>

            {/* ACCOUNT */}
            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              className="text-neutral-300 hover:text-white transition-colors p-1 hidden sm:block cursor-pointer"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* WISHLIST */}
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-neutral-300 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-neutral-200 transition-transform active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-wider font-mono">
                BAG [{cartCount}]
              </span>
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('new-arrivals')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                NEW ARRIVALS
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('shop-all')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                SHOP ALL
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('shop-by-category')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                CATEGORIES
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('collections')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                COLLECTIONS
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('campaign-drop01')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                DROP 01
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('material-craft')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                CRAFT STORY
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('kaald-world')}
                className="text-left text-[24px] font-bold tracking-tight text-white hover:text-neutral-300"
              >
                ABOUT KAALD
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="text-[13px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                ACCOUNT
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="text-[13px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                WISHLIST ({wishlist.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-[13px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                SEARCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
