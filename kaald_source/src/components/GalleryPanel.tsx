import React, { useMemo, useEffect, useState, useRef } from 'react';
import { GALLERY_IMAGES } from '../types';
import { CollectionSection } from './CollectionSection';

interface GalleryPanelProps {
  onMeasureHeight?: (totalHeight: number) => void;
}

// Layout algorithm specified by prompt:
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let imgIdx = 0;
  let r = 0;
  while (imgIdx < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imgIdx++;
    if (r % 3 === 0 && imgIdx < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = imgIdx++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

export const GalleryPanel: React.FC<GalleryPanelProps> = ({ onMeasureHeight }) => {
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Update cols on window resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const newCols = w < 640 ? 2 : w < 1024 ? 3 : 4;
      setCols(newCols);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute grid rows
  const rows = useMemo(() => {
    return buildLayout(GALLERY_IMAGES.length, cols);
  }, [cols]);

  return (
    <div
      ref={panelRef}
      id="black-panel"
      className="fixed inset-0 bg-black z-10 overflow-hidden pointer-events-none"
      style={{
        transform: 'translateY(100vh)',
        willChange: 'transform',
      }}
    >
      <div
        ref={innerRef}
        id="panel-inner"
        className="w-full pt-[min(120px,15vh)] pb-[min(200px,20vh)] pointer-events-auto"
        style={{
          willChange: 'transform',
        }}
      >
        {/* New Premium Fashion Collection Section */}
        <CollectionSection />

        {/* Editorial Divider & Heading for Existing Archive Gallery */}
        <div className="w-full max-w-[1800px] mx-auto pt-20 pb-12 px-4 sm:px-8 lg:px-12 border-t border-[#222226] mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#73737E] uppercase block mb-1">
              ARCHIVE VISUAL INDEX
            </span>
            <h3 className="text-[24px] sm:text-[32px] font-bold tracking-tight uppercase text-white">
              RUNWAY & ARTIFACTS
            </h3>
          </div>
          <span className="text-[12px] font-mono text-[#73737E]">
            10 PIECES // 2026
          </span>
        </div>

        <div
          className="grid gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {rows.map((row, rowIndex) =>
            row.map((imgIndex, colIndex) => {
              if (imgIndex === -1) {
                return (
                  <div
                    key={`spacer-${rowIndex}-${colIndex}`}
                    className="aspect-[2/3] w-full pointer-events-none"
                    aria-hidden="true"
                  />
                );
              }

              const isLeftHalf = colIndex < cols / 2;
              const transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';
              const imageUrl = GALLERY_IMAGES[imgIndex];

              return (
                <div
                  key={`card-wrapper-${imgIndex}`}
                  className="card-wrapper relative aspect-[2/3] w-full overflow-hidden"
                  data-card-index={imgIndex}
                >
                  <div
                    className="bp-card w-full h-full overflow-hidden"
                    style={{
                      transformOrigin,
                      transform: 'scale(0)',
                      willChange: 'transform',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Archive piece ${imgIndex + 1}`}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-300"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
