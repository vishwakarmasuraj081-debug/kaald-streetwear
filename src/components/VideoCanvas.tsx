import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT, VIDEO_RIGHT } from '../constants/assets';

export const VideoCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftVideoRef = useRef<HTMLVideoElement | null>(null);
  const rightVideoRef = useRef<HTMLVideoElement | null>(null);

  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeSideRef = useRef<'left' | 'right'>('right');
  const targetMouseXRef = useRef<number | null>(null);

  // Check responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up touch vs desktop video interactions
  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    const container = containerRef.current;
    if (!left || !right || !container) return;

    if (isTouch) {
      // Mobile / Tablet touch interaction: alternating auto-play
      if (!prefersReducedMotion) {
        left.style.display = 'block';
        right.style.display = 'none';
        left.play().catch(() => {});

        const handleLeftEnded = () => {
          left.style.display = 'none';
          right.style.display = 'block';
          right.currentTime = 0;
          right.play().catch(() => {});
        };

        const handleRightEnded = () => {
          right.style.display = 'none';
          left.style.display = 'block';
          left.currentTime = 0;
          left.play().catch(() => {});
        };

        left.addEventListener('ended', handleLeftEnded);
        right.addEventListener('ended', handleRightEnded);

        return () => {
          left.removeEventListener('ended', handleLeftEnded);
          right.removeEventListener('ended', handleRightEnded);
        };
      }
    } else {
      // Desktop interaction: Scrubbing based on cursor X via RAF
      const onMouseMove = (e: MouseEvent) => {
        targetMouseXRef.current = e.clientX;
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      let animId: number;
      const scrubLoop = () => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // Visibility hidden once scroll passes first viewport height
        if (scrollY > vh) {
          if (container.style.visibility !== 'hidden') {
            container.style.visibility = 'hidden';
          }
        } else {
          if (container.style.visibility !== 'visible') {
            container.style.visibility = 'visible';
          }
        }

        if (targetMouseXRef.current !== null && scrollY <= vh) {
          const width = window.innerWidth;
          const cx = width / 2;
          const deadZone = Math.max(30, width * 0.05);
          const mouseX = targetMouseXRef.current;

          if (mouseX < cx - deadZone) {
            // Left of dead zone -> show RIGHT video and scrub
            activeSideRef.current = 'right';
            if (left.style.display !== 'none') left.style.display = 'none';
            if (right.style.display !== 'block') right.style.display = 'block';

            const range = cx - deadZone;
            const dist = (cx - deadZone) - mouseX;
            const progress = Math.min(1, Math.max(0, dist / range));

            if (!right.seeking && right.duration && !isNaN(right.duration)) {
              const targetTime = progress * right.duration;
              if (Math.abs(right.currentTime - targetTime) > 0.02) {
                right.currentTime = targetTime;
              }
            }
          } else if (mouseX > cx + deadZone) {
            // Right of dead zone -> show LEFT video and scrub
            activeSideRef.current = 'left';
            if (left.style.display !== 'block') left.style.display = 'block';
            if (right.style.display !== 'none') right.style.display = 'none';

            const range = width - (cx + deadZone);
            const dist = mouseX - (cx + deadZone);
            const progress = Math.min(1, Math.max(0, dist / range));

            if (!left.seeking && left.duration && !isNaN(left.duration)) {
              const targetTime = progress * left.duration;
              if (Math.abs(left.currentTime - targetTime) > 0.02) {
                left.currentTime = targetTime;
              }
            }
          } else {
            // In dead zone: keep currentTime = 0 and show last active side
            if (activeSideRef.current === 'left') {
              if (left.style.display !== 'block') left.style.display = 'block';
              if (right.style.display !== 'none') right.style.display = 'none';
            } else {
              if (left.style.display !== 'none') left.style.display = 'none';
              if (right.style.display !== 'block') right.style.display = 'block';
            }

            if (!left.seeking && left.currentTime !== 0) {
              left.currentTime = 0;
            }
            if (!right.seeking && right.currentTime !== 0) {
              right.currentTime = 0;
            }
          }
        }

        animId = requestAnimationFrame(scrubLoop);
      };

      animId = requestAnimationFrame(scrubLoop);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animId);
      };
    }
  }, []);

  const bothLoaded = leftLoaded || rightLoaded; // Smooth appearance as soon as initial video is ready

  return (
    <div
      id="main-canvas"
      ref={containerRef}
      className={`pointer-events-none overflow-hidden transition-opacity duration-300 ${
        bothLoaded ? 'opacity-100' : 'opacity-0'
      } ${
        isMobile
          ? 'fixed left-0 top-[220px] w-screen h-[calc(100vh-220px)] z-0'
          : 'fixed inset-0 w-full h-full z-0'
      }`}
    >
      {/* Left Video */}
      <video
        ref={leftVideoRef}
        src={VIDEO_LEFT}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'none' }}
        onLoadedData={() => setLeftLoaded(true)}
      />

      {/* Right Video (Starts Visible) */}
      <video
        ref={rightVideoRef}
        src={VIDEO_RIGHT}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'block' }}
        onLoadedData={() => setRightLoaded(true)}
      />
    </div>
  );
};
