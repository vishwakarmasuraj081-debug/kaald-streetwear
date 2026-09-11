import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandBenefitStrip } from './components/BrandBenefitStrip';
import { DropShowcase } from './components/DropShowcase';
import { CategoryExperience } from './components/CategoryExperience';
import { CollectionSection } from './components/CollectionSection';
import { FashionFilmSection } from './components/FashionFilmSection';
import { FeaturedDropsHorizontal } from './components/FeaturedDropsHorizontal';
import { BrandStorySection } from './components/BrandStorySection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { JournalSection } from './components/JournalSection';
import { CommunitySection } from './components/CommunitySection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Modals and Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';

// Data & Types
import { PRODUCTS } from './data/products';
import { Product, ProductColor, CartItem, ProductCategory, JournalArticle } from './types';
import { toggleAmbientSound, playClickSound, playFabricRustle } from './utils/sound';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kaald_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage (array of product IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kaald_wishlist_v1');
      return saved ? JSON.parse(saved) : [PRODUCTS[0].id, PRODUCTS[2].id];
    } catch {
      return [PRODUCTS[0].id, PRODUCTS[2].id];
    }
  });

  // Audio / Sound Design State
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Active Category Filter for Collection
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('ALL');

  // Modals / Drawers Open States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Order Complete Receipt
  const [orderCompleteData, setOrderCompleteData] = useState<{
    total: number;
    items: CartItem[];
    orderId: string;
  } | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kaald_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kaald_wishlist_v1', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Handle Sound Toggle
  const handleToggleAudio = () => {
    const newState = !isAudioMuted;
    setIsAudioMuted(newState);
    toggleAmbientSound(!newState);
  };

  // Cart Management
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity = 1
  ) => {
    playFabricRustle();
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });
  };

  const handleBuyNow = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity = 1
  ) => {
    handleAddToCart(product, color, size, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    playClickSound();
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    playClickSound();
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutSuccess = (orderTotal: number, items: CartItem[]) => {
    const randomId = `KLD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompleteData({
      total: orderTotal,
      items: [...items],
      orderId: randomId,
    });
    handleClearCart();
  };

  // Wishlist Management
  const handleToggleWishlist = (product: Product) => {
    playClickSound();
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Navigation Helper
  const handleNavigate = (sectionId: string) => {
    playClickSound();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat: ProductCategory) => {
    setActiveCategory(cat);
    handleNavigate('collection');
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#F4F4F1] selection:bg-[#F4F4F1] selection:text-[#070707] font-sans antialiased overflow-x-hidden">
      {/* 01 — Luxury Navigation Header */}
      <Header
        cartCount={cart.reduce((total, i) => total + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => {
          playClickSound();
          setIsCartOpen(true);
        }}
        onOpenWishlist={() => {
          playClickSound();
          setIsWishlistOpen(true);
        }}
        onOpenSearch={() => {
          playClickSound();
          setIsSearchOpen(true);
        }}
        onNavigate={handleNavigate}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* 02 — Cinematic 3D Scroll Hero */}
      <HeroSection
        onExploreDrop={() => handleNavigate('drop')}
        onShopCollection={() => handleNavigate('collection')}
      />

      {/* 03 — Minimal Brand Benefits Strip */}
      <BrandBenefitStrip />

      {/* 04 — The Drop (Featured 3D Product Showcase with Hotspots) */}
      <DropShowcase
        onAddToCart={(product, color, size) => handleAddToCart(product, color, size, 1)}
        onOpenProductDetail={(prod) => {
          playClickSound();
          setSelectedProduct(prod);
        }}
        onOpenSizeGuide={() => {
          playClickSound();
          setIsSizeGuideOpen(true);
        }}
      />

      {/* 05 — Interactive 3D Category Experience */}
      <CategoryExperience onSelectCategory={handleCategorySelect} />

      {/* 06 — Full Collection with Minimal Cards, 4 Cols, Filters */}
      <CollectionSection
        initialCategory={activeCategory}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickAdd={(prod, color, size) => handleAddToCart(prod, color, size, 1)}
        onSelectProduct={(prod) => {
          playClickSound();
          setSelectedProduct(prod);
        }}
        onView3D={(prod) => {
          playClickSound();
          setSelectedProduct(prod);
        }}
      />

      {/* 07 — Cinematic Full-Screen Model Fashion Film */}
      <FashionFilmSection />

      {/* 08 — Featured Drops Horizontal Scroll Carousel */}
      <FeaturedDropsHorizontal
        onSelectProduct={(prod) => {
          playClickSound();
          setSelectedProduct(prod);
        }}
      />

      {/* 09 — Brand Story Manifesto (Modern Indian Urban Roots) */}
      <BrandStorySection />

      {/* 10 — Sustainability & Craftsmanship (480 GSM Cotton, Coimbatore Knit Lab) */}
      <SustainabilitySection />

      {/* 11 — Editorial Journal (Stories, People, Culture) */}
      <JournalSection />

      {/* 12 — Community @KAALD Photography Grid */}
      <CommunitySection />

      {/* 13 — Minimalist VIP Newsletter Subscription */}
      <NewsletterSection />

      {/* 14 — Large Luxury Footer */}
      <Footer
        onSelectCategory={handleCategorySelect}
        onNavigate={handleNavigate}
        onOpenSizeGuide={() => {
          playClickSound();
          setIsSizeGuideOpen(true);
        }}
      />

      {/* DRAWERS & MODALS */}

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={(prod, color, size) => handleAddToCart(prod, color, size, 1)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Full-Screen Minimalist Live Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onSelectArticle={() => {
          // Scroll down to journal
          handleNavigate('journal');
        }}
      />

      {/* Architectural Unit-Converting Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultCategory={selectedProduct?.category || 'HOODIES'}
      />

      {/* Product Detail Page Modal with 3D / 2D Switcher & Accordions */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, col, sz, qty) => handleAddToCart(prod, col, sz, qty)}
          onBuyNow={(prod, col, sz, qty) => {
            handleBuyNow(prod, col, sz, qty);
            setSelectedProduct(null);
          }}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />
      )}

      {/* Celebratory Order Confirmation Receipt Modal */}
      {orderCompleteData && (
        <OrderSuccessModal
          isOpen={!!orderCompleteData}
          onClose={() => setOrderCompleteData(null)}
          orderTotal={orderCompleteData.total}
          items={orderCompleteData.items}
          orderId={orderCompleteData.orderId}
        />
      )}
    </div>
  );
}
