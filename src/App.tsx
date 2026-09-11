import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { Caption } from './components/Caption';
import { HeaderNav } from './components/HeaderNav';
import { ProductInfo } from './components/ProductInfo';
import { ViewButton } from './components/ViewButton';
import { VideoCanvas } from './components/VideoCanvas';
import { WhiteOverlay } from './components/WhiteOverlay';
import { Footer } from './components/Footer';
import { BlackPanelGallery } from './components/BlackPanelGallery';

export const App: React.FC = () => {
  return (
    <div
      id="scroll-spacer"
      className="relative select-none bg-white cursor-desktop-none overflow-x-hidden min-h-screen"
      style={{
        height: '500vh',
      }}
    >
      {/* 1A. Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 1B. Logo (Top Left) */}
      <Logo />

      {/* 1C. Caption (Below Logo, Left Side) */}
      <Caption />

      {/* 1D. Header Navigation (Top Right) */}
      <HeaderNav />

      {/* 1E. Product Info (Bottom Right) */}
      <ProductInfo />

      {/* 1F. View Button (Bottom Right, Initially Hidden) */}
      <ViewButton />

      {/* 1I. White Overlay */}
      <WhiteOverlay />

      {/* 1J. Footer (Bottom Left) */}
      <Footer />

      {/* Section 2: Black Panel Gallery */}
      <BlackPanelGallery />

      {/* 1G & 1H. Video Canvas */}
      <VideoCanvas />
    </div>
  );
};

export default App;
