import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { Caption } from './components/Caption';
import { HeaderNav } from './components/HeaderNav';
import { ProductInfo } from './components/ProductInfo';
import { ViewButton } from './components/ViewButton';
import { VideoCanvas } from './components/VideoCanvas';
import { GalleryPanel } from './components/GalleryPanel';
import { OutroOverlay } from './components/OutroOverlay';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // DOM Element references for direct RAF manipulation
    const blackPanel = document.getElementById('black-panel');
    const panelInner = document.getElementById('panel-inner');
    const mainCanvas = document.getElementById('main-canvas');
    const outroOverlay = document.getElementById('outro-overlay');
    const outroInfo = document.getElementById('outro-info');
    const outroBuy = document.getElementById('outro-buy');
    const outroFooter = document.getElementById('outro-footer');
    const circleSymbol = document.getElementById('circle-symbol');

    let animationFrameId: number;
    let lastScrollY = -1;
    let lastSymbolUpdate = 0;
    const symbols = ['8', '$', '^^', '%', '/'];

    const updateSpacerHeight = () => {
      const vh = window.innerHeight;
      const wrapScrollHeight = panelInner ? panelInner.offsetHeight : vh * 3;
      const maxScroll = Math.max(0, wrapScrollHeight - vh);
      const totalHeight = vh + maxScroll + 2 * vh;

      if (spacerRef.current) {
        spacerRef.current.style.height = `${totalHeight}px`;
      }
      return { vh, maxScroll, totalHeight };
    };

    updateSpacerHeight();
    window.addEventListener('resize', updateSpacerHeight);

    const resizeObserver = new ResizeObserver(() => {
      updateSpacerHeight();
    });
    if (panelInner) {
      resizeObserver.observe(panelInner);
    }

    const tick = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight;
      const wrapScrollHeight = panelInner ? panelInner.offsetHeight : vh * 3;
      const maxScroll = Math.max(0, wrapScrollHeight - vh);

      // 1. Throttled Circle Symbol Randomization on Scroll
      if (scrollY !== lastScrollY) {
        const now = performance.now();
        if (now - lastSymbolUpdate > 80 && circleSymbol) {
          lastSymbolUpdate = now;
          const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
          circleSymbol.textContent = randomSymbol;
        }
        lastScrollY = scrollY;
      }

      // 2. Scroll Phase Orchestration (RAF-based)
      if (scrollY <= vh) {
        // --- PHASE 1: 0 to 100vh ---
        // Black panel slides up from 100vh to 0
        const panelOffset = vh - scrollY;
        if (blackPanel) {
          blackPanel.style.transform = `translateY(${panelOffset}px)`;
        }
        if (panelInner) {
          panelInner.style.transform = 'translateY(0px)';
        }
        if (mainCanvas) {
          mainCanvas.style.visibility = 'visible';
        }
        if (outroOverlay) {
          outroOverlay.style.opacity = '0';
        }
        if (outroInfo) {
          outroInfo.style.transform = 'translateY(0px)';
        }
        if (outroBuy) {
          outroBuy.style.transform = 'scale(0)';
        }
        if (outroFooter) {
          outroFooter.style.opacity = '0';
        }
      } else if (scrollY > vh && scrollY <= vh + maxScroll) {
        // --- PHASE 2: vh to vh + maxScroll ---
        // Black panel pinned at top; inner grid scrolls up
        if (blackPanel) {
          blackPanel.style.transform = 'translateY(0px)';
        }
        if (mainCanvas) {
          mainCanvas.style.visibility = 'hidden';
        }
        const innerOffset = -(scrollY - vh);
        if (panelInner) {
          panelInner.style.transform = `translateY(${innerOffset}px)`;
        }
        if (outroOverlay) {
          outroOverlay.style.opacity = '0';
        }
        if (outroInfo) {
          outroInfo.style.transform = 'translateY(0px)';
        }
        if (outroBuy) {
          outroBuy.style.transform = 'scale(0)';
        }
        if (outroFooter) {
          outroFooter.style.opacity = '0';
        }
      } else {
        // --- OUTRO PHASE: scrollY > vh + maxScroll ---
        // White overlay fades in, outro button scales up, outro info slides up, footer fades in
        if (blackPanel) {
          blackPanel.style.transform = 'translateY(0px)';
        }
        if (panelInner) {
          panelInner.style.transform = `translateY(${-maxScroll}px)`;
        }
        if (mainCanvas) {
          mainCanvas.style.visibility = 'hidden';
        }

        const outroRange = Math.max(1, vh - 100);
        const p = Math.min(1, Math.max(0, (scrollY - vh - maxScroll) / outroRange));

        if (outroOverlay) {
          outroOverlay.style.opacity = `${p}`;
        }

        const outroOffsetAttr = outroInfo?.getAttribute('data-outro-offset');
        const outroOffset = outroOffsetAttr
          ? parseFloat(outroOffsetAttr)
          : window.innerWidth < 640
          ? 132
          : 166;

        if (outroInfo) {
          outroInfo.style.transform = `translateY(-${p * outroOffset}px)`;
        }
        if (outroBuy) {
          outroBuy.style.transform = `scale(${p})`;
        }
        if (outroFooter) {
          outroFooter.style.opacity = `${p}`;
        }
      }

      // 3. Card Scaling Computation
      // Compute each card's scale based on its unscaled wrapper position
      const cardWrappers = document.querySelectorAll('.card-wrapper');
      for (let i = 0; i < cardWrappers.length; i++) {
        const wrapper = cardWrappers[i] as HTMLElement;
        const rect = wrapper.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        const card = wrapper.querySelector('.bp-card') as HTMLElement | null;

        if (!card) continue;

        if (bottom <= 0 || top >= vh) {
          // Fully off-screen
          card.style.transform = 'scale(0)';
        } else {
          // Enter: Math.min(1, (vh - top) / (vh * 0.6))
          const enter = Math.min(1, (vh - top) / (vh * 0.6));
          // Exit: Math.min(1, bottom / (vh * 0.4))
          const exit = Math.min(1, bottom / (vh * 0.4));
          // Final: Math.min(enter, exit)
          const scale = Math.max(0, Math.min(enter, exit));
          card.style.transform = `scale(${scale})`;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', updateSpacerHeight);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spacerRef}
      id="scroll-spacer"
      className="relative user-select-none bg-white min-h-[500vh] lg:cursor-none select-none"
      style={{ userSelect: 'none' }}
    >
      {/* 1A. Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 1B. Brand Logo (Top Left) */}
      <Logo />

      {/* 1C. Caption (Below Logo, Left Side) */}
      <Caption />

      {/* 1D. Header Navigation (Top Right) */}
      <HeaderNav />

      {/* 1E. Product Info (Bottom Right) */}
      <ProductInfo />

      {/* 1F. View Button (Bottom Right, Outro Phase) */}
      <ViewButton />

      {/* 1G & 1H. Dual Video Hero Container */}
      <VideoCanvas />

      {/* SECTION 2: Black Panel & Scattered Grid Gallery */}
      <GalleryPanel />

      {/* 1I. White Outro Overlay */}
      <OutroOverlay />

      {/* 1J. Outro Footer */}
      <Footer />
    </div>
  );
}
