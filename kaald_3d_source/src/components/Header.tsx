import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="kaald-main-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#070707]/85 backdrop-blur-xl border-b border-[#1F1F1F] py-3.5'
            : 'bg-gradient-to-b from-[#070707]/80 via-[#070707]/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* LEFT: Brand Identity */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex flex-col text-left group focus:outline-none"
            aria-label="KAALD Home"
          >
            <span className="font-display font-extrabold text-2xl tracking-[-0.05em] text-[#F4F4F1] group-hover:text-white transition-colors">
              KAALD
            </span>
            <span className="text-[9px] font-mono-tech tracking-[0.25em] text-[#888888] uppercase -mt-1 group-hover:text-[#AAA] transition-colors">
              BORN IN MOTION
            </span>
          </button>

          {/* CENTER: Editorial Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase text-[#B2B2AC]">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-[#F4F4F1] transition-colors py-1 relative group"
            >
              <span>HOME</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F4F4F1] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className="hover:text-[#F4F4F1] transition-colors py-1 relative group"
            >
              <span>COLLECTION</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F4F4F1] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="hover:text-[#F4F4F1] transition-colors py-1 relative group"
            >
              <span>ABOUT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F4F4F1] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className="hover:text-[#F4F4F1] transition-colors py-1 relative group"
            >
              <span>JOURNAL</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F4F4F1] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#F4F4F1] transition-colors py-1 relative group"
            >
              <span>CONTACT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F4F4F1] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] tracking-[0.15em] uppercase text-[#B2B2AC]">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 hover:text-[#F4F4F1] transition-colors py-1"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 text-[#C2C2BD]" />
              <span className="hidden lg:inline">SEARCH</span>
            </button>

            {/* Currency INR Badge */}
            <div className="hidden sm:flex items-center px-2 py-0.5 border border-[#262626] text-[10px] font-mono-tech text-[#888]">
              <span>INR ₹</span>
            </div>

            {/* Wishlist Link */}
            <button
              onClick={onOpenWishlist}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#F4F4F1] transition-colors py-1"
              aria-label="View Wishlist"
            >
              <span>SAVED</span>
              {wishlistCount > 0 && (
                <span className="text-[10px] font-mono-tech bg-[#222] px-1.5 py-0.2 text-[#F4F4F1]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-1.5 hover:text-[#F4F4F1] transition-colors py-1"
              aria-label="User Account"
            >
              <User className="w-4 h-4 text-[#C2C2BD]" />
              <span className="hidden lg:inline">ACCOUNT</span>
            </button>

            {/* Cart with Count */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 hover:text-[#F4F4F1] transition-colors py-1 px-2.5 bg-[#151515] border border-[#282828] hover:border-[#444]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F4F4F1]" />
              <span className="font-mono-tech text-[12px] font-semibold text-[#F4F4F1]">
                CART ({cartCount})
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#F4F4F1] hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6 text-xl font-display uppercase tracking-wider text-[#E8E8E4]">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              COLLECTION
            </button>
            <button
              onClick={() => handleNavClick('drop')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              THE DROP (3D)
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              ABOUT KAALD
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              JOURNAL
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#1A1A1A] hover:text-white"
            >
              CONTACT & STUDIOS
            </button>
          </div>

          <div className="pt-8 border-t border-[#1F1F1F] flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[#888]">
              <span>CURRENCY: INR (₹)</span>
              <span>FREE SHIPPING ABOVE ₹2499</span>
            </div>
            <div className="text-[10px] text-[#555] uppercase tracking-widest">
              INDIAN ROOTS. GLOBAL ATTITUDE. © 2026 KAALD.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
