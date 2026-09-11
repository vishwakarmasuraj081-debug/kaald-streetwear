import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants/assets';

gsap.registerPlugin(ScrollTrigger);

export function buildLayout(count: number, cols: number): number[][] {
  const grid: number[][] = [];
  let imgIdx = 0;
  let r = 0;

  while (imgIdx < count) {
    const row = new Array<number>(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imgIdx++;

    if (imgIdx < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) {
        b = (a + 1) % cols;
      }
      row[b] = imgIdx++;
    }
    grid.push(row);
    r++;
  }

  return grid;
}

export const BlackPanelGallery: React.FC = () => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const innerWrapRef = useRef<HTMLDivElement | null>(null);
  const [cols, setCols] = useState(4);

  // Determine responsive columns
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCols(2);
      } else if (w < 1024) {
        setCols(3);
      } else {
        setCols(4);
      }
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const layout = buildLayout(GALLERY_IMAGES.length, cols);

  // Initialize GSAP ScrollTrigger & RAF Scroll Engine
  useEffect(() => {
    const panel = panelRef.current;
    const innerWrap = innerWrapRef.current;
    const spacer = document.getElementById('scroll-spacer');
    if (!panel || !innerWrap || !spacer) return;

    // 1. GSAP ScrollTrigger for panel slide up during first 100vh of scroll
    const panelTween = gsap.fromTo(
      panel,
      { y: () => window.innerHeight },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    // 2. Measure and update spacer height dynamically: vh + maxScroll + 2 * vh
    let wrapScrollHeight = innerWrap.offsetHeight;
    let vh = window.innerHeight;
    let maxScroll = Math.max(0, wrapScrollHeight - vh);

    const updateMeasurements = () => {
      vh = window.innerHeight;
      wrapScrollHeight = innerWrap.offsetHeight;
      maxScroll = Math.max(0, wrapScrollHeight - vh);
      const totalSpacerHeight = vh + maxScroll + 2 * vh;
      spacer.style.height = `${totalSpacerHeight}px`;
      ScrollTrigger.refresh();
    };

    // Run measurement after DOM render and image load
    updateMeasurements();
    const resizeTimer = setTimeout(updateMeasurements, 300);
    window.addEventListener('resize', updateMeasurements);

    // Cache card positions relative to innerWrap to eliminate layout thrashing in RAF
    interface CardData {
      el: HTMLElement;
      relTop: number;
      height: number;
    }
    let cardDataList: CardData[] = [];

    const measureCards = () => {
      const cardEls = innerWrap.querySelectorAll<HTMLElement>('.bp-card');
      cardDataList = Array.from(cardEls).map((el) => {
        let top = 0;
        let curr: HTMLElement | null = el;
        while (curr && curr !== innerWrap) {
          top += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement | null;
        }
        return {
          el,
          relTop: top,
          height: el.offsetHeight,
        };
      });
    };

    measureCards();
    const measureTimer = setTimeout(measureCards, 350);

    // 3. RAF Animation Engine
    let rafId: number;

    const outroOverlay = document.getElementById('outro-overlay');
    const outroInfo = document.getElementById('outro-info');
    const outroBuy = document.getElementById('outro-buy');
    const outroFooter = document.getElementById('outro-footer');

    const updateFrames = () => {
      const scrollY = window.scrollY;
      const currentVh = window.innerHeight;

      // Phase 1 (scrollY <= vh): Panel slides up (GSAP), cards computed with panelOffset = vh - scrollY
      // Phase 2 (scrollY > vh): Panel is fixed at top, innerWrap translates up: -(scrollY - vh)
      let panelOffset = 0;
      let wrapTranslateY = 0;

      if (scrollY <= currentVh) {
        panelOffset = currentVh - scrollY;
        wrapTranslateY = 0;
        innerWrap.style.transform = 'translateY(0px)';
      } else {
        panelOffset = 0;
        wrapTranslateY = -(scrollY - currentVh);
        innerWrap.style.transform = `translateY(${wrapTranslateY}px)`;
      }

      // Card scale calculation per frame
      for (let i = 0; i < cardDataList.length; i++) {
        const item = cardDataList[i];
        const cardTop = panelOffset + wrapTranslateY + item.relTop;
        const cardBottom = cardTop + item.height;

        if (cardBottom <= 0 || cardTop >= currentVh) {
          item.el.style.transform = 'scale(0)';
        } else {
          const enter = Math.min(1, (currentVh - cardTop) / (currentVh * 0.6));
          const exit = Math.min(1, cardBottom / (currentVh * 0.4));
          const scale = Math.max(0, Math.min(1, Math.min(enter, exit)));
          item.el.style.transform = `scale(${scale})`;
        }
      }

      // Outro Phase: scrollY > vh + maxScroll
      const outroThreshold = currentVh + maxScroll;
      if (scrollY > outroThreshold) {
        const outroRange = Math.max(1, currentVh - 100);
        const progress = Math.min(1, Math.max(0, (scrollY - outroThreshold) / outroRange));

        if (outroOverlay) outroOverlay.style.opacity = progress.toString();

        if (outroInfo) {
          const outroOffset = parseFloat(
            outroInfo.getAttribute('data-outro-offset') || '166'
          );
          outroInfo.style.transform = `translateY(-${progress * outroOffset}px)`;
        }

        if (outroBuy) {
          outroBuy.style.transform = `scale(${progress})`;
        }

        if (outroFooter) {
          outroFooter.style.opacity = progress.toString();
        }
      } else {
        if (outroOverlay) outroOverlay.style.opacity = '0';
        if (outroInfo) outroInfo.style.transform = 'translateY(0px)';
        if (outroBuy) outroBuy.style.transform = 'scale(0)';
        if (outroFooter) outroFooter.style.opacity = '0';
      }

      rafId = requestAnimationFrame(updateFrames);
    };

    rafId = requestAnimationFrame(updateFrames);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      clearTimeout(measureTimer);
      window.removeEventListener('resize', updateMeasurements);
      panelTween.scrollTrigger?.kill();
      panelTween.kill();
    };
  }, [cols, layout]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-black z-10 will-change-transform overflow-hidden"
      style={{
        transform: 'translateY(100vh)',
      }}
    >
      <div
        ref={innerWrapRef}
        className="w-full will-change-transform"
        style={{
          paddingTop: 'min(400px, 40vh)',
          paddingBottom: 'min(400px, 40vh)',
        }}
      >
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <div
            className="grid gap-4 sm:gap-6 lg:gap-8"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {layout.map((row, rIdx) =>
              row.map((imgIdx, cIdx) => {
                if (imgIdx === -1) {
                  return (
                    <div
                      key={`spacer-${rIdx}-${cIdx}`}
                      className="w-full aspect-[2/3] pointer-events-none"
                      aria-hidden="true"
                    />
                  );
                }

                const isLeftHalf = cIdx < cols / 2;

                return (
                  <div
                    key={`card-${imgIdx}`}
                    className="bp-card relative w-full aspect-[2/3] overflow-hidden rounded-sm bg-neutral-900"
                    style={{
                      transformOrigin: isLeftHalf ? 'right bottom' : 'left bottom',
                      transform: 'scale(0)',
                    }}
                  >
                    <img
                      src={GALLERY_IMAGES[imgIdx]}
                      alt={`Archive Collection item ${imgIdx + 1}`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
