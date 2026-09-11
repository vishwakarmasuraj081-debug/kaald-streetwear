import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { createHoodieModel, HoodieModelBundle } from './createHoodieModel';
import { ProductHotspot } from '../../types';

interface ProductViewer3DProps {
  initialColorHex?: string;
  hotspots?: ProductHotspot[];
  onHotspotClick?: (hotspot: ProductHotspot) => void;
  activeHotspotId?: string | null;
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  initialColorHex = '#161616',
  hotspots = [],
  onHotspotClick,
  activeHotspotId,
  interactive = true,
  showControls = true,
  className = 'w-full h-full min-h-[420px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoodieRef = useRef<HoodieModelBundle | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(3.4);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.05, y: 0 });
  const targetRotRef = useRef({ x: 0.05, y: 0 });

  useEffect(() => {
    if (hoodieRef.current) {
      hoodieRef.current.setColor(initialColorHex);
    }
  }, [initialColorHex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, zoomLevel);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0x222222, 2.0);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xFFFFFF, 3.0);
    key.position.set(3, 4, 3);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8A8E9A, 1.4);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.SpotLight(0xD6DFEC, 6.0, 12, Math.PI / 4, 0.4);
    rim.position.set(-2, 3, -3);
    rim.lookAt(0, 0, 0);
    scene.add(rim);

    // Add Hoodie Model
    const hoodie = createHoodieModel();
    hoodie.setColor(initialColorHex);
    hoodieRef.current = hoodie;
    scene.add(hoodie.group);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Pointer events for smooth drag rotation
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevPointerRef.current.x;
      const deltaY = clientY - prevPointerRef.current.y;

      targetRotRef.current.y += deltaX * 0.008;
      targetRotRef.current.x = Math.max(-0.4, Math.min(0.5, targetRotRef.current.x + deltaY * 0.006));

      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth rotation interpolation
      rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.1;
      rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.1;

      // Auto gentle idle spin when not dragging
      if (!isDraggingRef.current) {
        targetRotRef.current.y += 0.003;
      }

      hoodie.group.rotation.x = rotRef.current.x;
      hoodie.group.rotation.y = rotRef.current.y;

      // Calculate degrees for readout
      const deg = Math.round(((rotRef.current.y % (Math.PI * 2)) / (Math.PI * 2)) * 360);
      setRotationAngle(deg >= 0 ? deg : 360 + deg);

      hoodie.update(elapsed);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [interactive]);

  // Handle Zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel;
    }
  }, [zoomLevel]);

  // Handle Wireframe Toggle
  const toggleWireframe = () => {
    if (!hoodieRef.current) return;
    const next = !isWireframe;
    setIsWireframe(next);
    hoodieRef.current.materials.cotton.wireframe = next;
    hoodieRef.current.materials.ribbing.wireframe = next;
  };

  const resetView = () => {
    targetRotRef.current = { x: 0.05, y: 0 };
    setZoomLevel(3.4);
  };

  return (
    <div id="product-viewer-3d-root" className={`relative select-none ${className}`}>
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 360 Degree Indicator Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[#101010]/80 backdrop-blur-md border border-[#282828] text-xs uppercase tracking-widest text-[#969696]">
        <RotateCw className="w-3.5 h-3.5 animate-spin text-[#F4F4F1]" style={{ animationDuration: '8s' }} />
        <span>360° INTERACTIVE</span>
        <span className="text-[#F4F4F1] font-mono-tech">{rotationAngle}°</span>
      </div>

      {/* Interactive Hotspots Overlay */}
      {hotspots.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {hotspots.map((hs, idx) => {
            // Screen projected positioning estimates
            const topPositions = ['30%', '42%', '20%', '65%'];
            const leftPositions = ['52%', '36%', '48%', '50%'];
            const isActive = activeHotspotId === hs.id;

            return (
              <div
                key={hs.id}
                style={{
                  top: topPositions[idx % topPositions.length],
                  left: leftPositions[idx % leftPositions.length],
                }}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => onHotspotClick && onHotspotClick(hs)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#F4F4F1] text-[#070707] ring-4 ring-[#F4F4F1]/30 scale-110'
                      : 'bg-[#151515]/90 border border-[#3A3A3A] text-[#F4F4F1] hover:scale-110 hover:border-[#F4F4F1]'
                  }`}
                  aria-label={`Hotspot: ${hs.title}`}
                >
                  <span className="text-[11px] font-mono-tech font-bold">0{idx + 1}</span>
                  <span className="absolute -inset-1 rounded-full border border-white/20 animate-ping opacity-75" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Control Actions Bar */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 p-1 bg-[#101010]/80 backdrop-blur-md border border-[#282828]">
          <button
            onClick={() => setZoomLevel((z) => Math.max(2.2, z - 0.4))}
            className="p-2 text-[#969696] hover:text-[#F4F4F1] hover:bg-[#1A1A1A] transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(4.8, z + 0.4))}
            className="p-2 text-[#969696] hover:text-[#F4F4F1] hover:bg-[#1A1A1A] transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={toggleWireframe}
            className={`p-2 transition-colors ${
              isWireframe ? 'text-[#F4F4F1] bg-[#222]' : 'text-[#969696] hover:text-[#F4F4F1] hover:bg-[#1A1A1A]'
            }`}
            title="Wireframe View"
            aria-label="Toggle wireframe"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 text-[#969696] hover:text-[#F4F4F1] hover:bg-[#1A1A1A] transition-colors"
            title="Reset Perspective"
            aria-label="Reset view"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Desktop Drag Tip */}
      <div className="absolute bottom-4 left-4 z-10 text-[11px] uppercase tracking-widest text-[#666666] pointer-events-none hidden md:block">
        DRAG TO ROTATE // SCROLL TO INTERACT
      </div>
    </div>
  );
};
