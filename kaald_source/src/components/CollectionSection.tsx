import React, { useState } from 'react';
import { CollectionIntro } from './CollectionIntro';
import { PantsSection } from './PantsSection';
import { ShirtSection } from './ShirtSection';
import { JacketSection } from './JacketSection';
import { CollectionCTA } from './CollectionCTA';
import { ProductModalDrawer, CartItem } from './ProductModalDrawer';
import { CartDrawer } from './CartDrawer';
import {
  CollectionItem,
  PANTS_PRODUCT,
  SHIRT_PRODUCT,
  JACKET_PRODUCT,
  ALL_COLLECTION_ITEMS,
} from '../data/collectionData';
import { ShoppingBag } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  const [activeModalProduct, setActiveModalProduct] = useState<CollectionItem | null>(null);
  const [initialModalColorId, setInitialModalColorId] = useState<string | undefined>();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleOpenProduct = (product: CollectionItem, colorId?: string) => {
    setActiveModalProduct(product);
    setInitialModalColorId(colorId);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleShopAll = () => {
    // Open product modal with the Pants as entry or scroll to Pants section
    handleOpenProduct(PANTS_PRODUCT);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="kaald-collection-container" className="relative w-full text-white bg-black">
      {/* Floating Bag Pill if user has added items */}
      {totalCartCount > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-30 px-4 py-2.5 bg-white text-black rounded-full shadow-2xl flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase font-bold hover:bg-[#EAEAEA] transition-transform hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>BAG ({totalCartCount})</span>
        </button>
      )}

      {/* 1. Collection Intro: KAALD / COLLECTION 01 + BUILT TO MOVE. */}
      <CollectionIntro />

      {/* 2. 01 / PANTS (3 Colors: BLACK, CHARCOAL, STONE) */}
      <PantsSection
        onOpenProductModal={(colorId) => handleOpenProduct(PANTS_PRODUCT, colorId)}
      />

      {/* 3. 02 / SHIRTS (2 Colors: BLACK, BONE) */}
      <ShirtSection
        onOpenProductModal={(colorId) => handleOpenProduct(SHIRT_PRODUCT, colorId)}
      />

      {/* 4. 03 / JACKET (1 Color: BLACK / DARK CHARCOAL) */}
      <JacketSection
        onOpenProductModal={() => handleOpenProduct(JACKET_PRODUCT)}
      />

      {/* 5. Final CTA: THE COLLECTION IS IN MOTION. */}
      <CollectionCTA onShopAll={handleShopAll} />

      {/* Interactive E-commerce Product Modal Drawer */}
      <ProductModalDrawer
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={activeModalProduct}
        initialColorId={initialModalColorId}
        onAddToCart={handleAddToCart}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenItem={(title) => {
          const item = ALL_COLLECTION_ITEMS.find((i) => i.title === title);
          if (item) {
            setIsCartOpen(false);
            handleOpenProduct(item);
          }
        }}
      />
    </div>
  );
};
