import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only track on devices with fine pointer (mouse / desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      aria-hidden="true"
      className="fixed pointer-events-none z-50 hidden lg:block opacity-0 transition-opacity duration-150"
      style={{
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'exclusion',
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Outer Circle: r=22.75, strokeWidth=2.5 */}
        <circle
          cx="24"
          cy="24"
          r="22.75"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Custom Japanese / Decorative Glyph: balanced aesthetic seal */}
        <g fill="#FFFFFF">
          {/* Top horizontal crown bar */}
          <rect x="15" y="14.5" width="18" height="2.2" rx="1.1" />
          {/* Central vertical stem */}
          <rect x="22.9" y="14.5" width="2.2" height="19" rx="1" />
          {/* Upper left & right accents */}
          <rect x="17.5" y="18.5" width="5" height="2" rx="0.5" />
          <rect x="25.5" y="18.5" width="5" height="2" rx="0.5" />
          {/* Mid cross horizontal bar */}
          <rect x="13.5" y="22.5" width="21" height="2.2" rx="1" />
          {/* Lower gate frame strokes */}
          <rect x="16" y="26.5" width="2" height="7" rx="0.5" />
          <rect x="30" y="26.5" width="2" height="7" rx="0.5" />
          {/* Inner horizontal rungs */}
          <rect x="18" y="27" width="12" height="1.8" rx="0.5" />
          <rect x="18" y="30.5" width="12" height="1.8" rx="0.5" />
        </g>
      </svg>
    </div>
  );
};
