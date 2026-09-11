import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only active on desktop (width >= 1024px and non-touch)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || window.innerWidth < 1024) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = '1';
      }
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        cursor.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 hidden lg:block opacity-0 transition-opacity duration-150"
      style={{
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'exclusion',
      }}
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="22.75"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Stylized Japanese/decorative glyph path representing prompt / prmpt */}
        <path
          d="M17 17H31V20H25.5V31H22.5V20H17V17ZM19 23.5H29V26H19V23.5Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};
