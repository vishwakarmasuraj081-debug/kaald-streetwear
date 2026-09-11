import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT_URL, VIDEO_RIGHT_URL } from '../types';

export const VideoCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const leftLoadedRef = useRef(false);
  const rightLoadedRef = useRef(false);

  // Tracks active side ('left' or 'right'). Starts with 'right' because right starts display: block
  const activeSideRef = useRef<'left' | 'right'>('right');
  const mouseXRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef<boolean>(false);

  // Check if both videos are ready to display
  const checkLoaded = () => {
    if (leftLoadedRef.current && rightLoadedRef.current) {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    // Fallback: If network or caching delays event, make visible after 1.2s anyway
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    isTouchDeviceRef.current = isTouch;

    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;

    if (isTouch) {
      // Mobile / Touch behavior: alternate playback
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Start with Left video playing
      leftVid.style.display = 'block';
      rightVid.style.display = 'none';
      leftVid.play().catch(() => {});

      const handleLeftEnded = () => {
        leftVid.style.display = 'none';
        rightVid.style.display = 'block';
        rightVid.currentTime = 0;
        rightVid.play().catch(() => {});
      };

      const handleRightEnded = () => {
        rightVid.style.display = 'none';
        leftVid.style.display = 'block';
        leftVid.currentTime = 0;
        leftVid.play().catch(() => {});
      };

      leftVid.addEventListener('ended', handleLeftEnded);
      rightVid.addEventListener('ended', handleRightEnded);

      return () => {
        leftVid.removeEventListener('ended', handleLeftEnded);
        rightVid.removeEventListener('ended', handleRightEnded);
      };
    }

    // Desktop non-touch behavior: Scrubbing on RAF based on mouse X position
    const onMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;

    const tick = () => {
      const cursorX = mouseXRef.current;
      const width = window.innerWidth;
      const centerX = width / 2;
      const deadZone = Math.max(30, width * 0.05);

      const leftEdge = centerX - deadZone;
      const rightEdge = centerX + deadZone;

      if (cursorX !== null) {
        if (cursorX < leftEdge) {
          // Cursor is left of dead zone -> show RIGHT video
          activeSideRef.current = 'left'; // moved towards left
          if (rightVid.style.display !== 'block') {
            rightVid.style.display = 'block';
            leftVid.style.display = 'none';
          }

          const distance = leftEdge - cursorX;
          const range = leftEdge;
          const progress = Math.max(0, Math.min(1, distance / (range || 1)));

          if (!rightVid.seeking && Number.isFinite(rightVid.duration) && rightVid.duration > 0) {
            rightVid.currentTime = progress * rightVid.duration;
          }
        } else if (cursorX > rightEdge) {
          // Cursor is right of dead zone -> show LEFT video
          activeSideRef.current = 'right'; // moved towards right
          if (leftVid.style.display !== 'block') {
            leftVid.style.display = 'block';
            rightVid.style.display = 'none';
          }

          const distance = cursorX - rightEdge;
          const range = width - rightEdge;
          const progress = Math.max(0, Math.min(1, distance / (range || 1)));

          if (!leftVid.seeking && Number.isFinite(leftVid.duration) && leftVid.duration > 0) {
            leftVid.currentTime = progress * leftVid.duration;
          }
        } else {
          // Cursor is in dead zone: keep both videos at currentTime = 0, show whichever was last active
          if (activeSideRef.current === 'right') {
            if (leftVid.style.display !== 'block') {
              leftVid.style.display = 'block';
              rightVid.style.display = 'none';
            }
            if (!leftVid.seeking) {
              leftVid.currentTime = 0;
            }
          } else {
            if (rightVid.style.display !== 'block') {
              rightVid.style.display = 'block';
              leftVid.style.display = 'none';
            }
            if (!rightVid.seeking) {
              rightVid.currentTime = 0;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="main-canvas"
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden fixed z-0 transition-opacity duration-300 ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } left-0 top-[220px] w-screen h-[calc(100vh-220px)] lg:inset-0 lg:top-0 lg:w-full lg:h-full`}
    >
      {/* Left video: initially display: none */}
      <video
        ref={leftVideoRef}
        id="hero-video-left"
        src={VIDEO_LEFT_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'none' }}
        onLoadedData={() => {
          leftLoadedRef.current = true;
          checkLoaded();
        }}
        onCanPlay={() => {
          leftLoadedRef.current = true;
          checkLoaded();
        }}
      />

      {/* Right video: initially display: block */}
      <video
        ref={rightVideoRef}
        id="hero-video-right"
        src={VIDEO_RIGHT_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'block' }}
        onLoadedData={() => {
          rightLoadedRef.current = true;
          checkLoaded();
        }}
        onCanPlay={() => {
          rightLoadedRef.current = true;
          checkLoaded();
        }}
      />
    </div>
  );
};
