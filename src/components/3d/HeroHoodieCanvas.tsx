import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createHoodieModel, HoodieModelBundle } from './createHoodieModel';

interface HeroHoodieCanvasProps {
  scrollProgress: number; // 0.0 to 1.0 mapped from hero scroll track
}

export const HeroHoodieCanvas: React.FC<HeroHoodieCanvasProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);
  const targetProgressRef = useRef(scrollProgress);
  const currentProgressRef = useRef(0);

  // Mouse tilt interaction
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    targetProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
        return;
      }
    } catch {
      setWebglError(true);
      return;
    }

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Dark studio atmosphere with subtle fog for depth
    scene.fog = new THREE.FogExp2(0x070707, 0.06);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Initial camera position at 0%
    camera.position.set(0.6, -0.2, 4.4);
    camera.lookAt(0, 0.1, 0);

    // ================= LIGHTING RIG (Cinematic Fashion Studio) =================
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x181818, 1.4);
    scene.add(ambientLight);

    // Key Light (Warm neutral soft box)
    const keyLight = new THREE.DirectionalLight(0xF4F4EC, 3.2);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light (Cool dark fill from opposite side)
    const fillLight = new THREE.DirectionalLight(0x8A92A0, 1.2);
    fillLight.position.set(-3.5, 1, 2.5);
    scene.add(fillLight);

    // Rim / Edge Sheen Light (Crucial for highlighting heavyweight fabric silhouette & shoulders)
    const rimLight = new THREE.SpotLight(0xD8E0EA, 6.0, 14, Math.PI / 4, 0.5, 1);
    rimLight.position.set(-2.5, 3.5, -3.5);
    rimLight.lookAt(0, 0.2, 0);
    scene.add(rimLight);

    // Subtle Under-Floor Bounce
    const floorBounce = new THREE.PointLight(0x222226, 1.8, 6);
    floorBounce.position.set(0, -1.8, 1.5);
    scene.add(floorBounce);

    // Studio Floor Ground with subtle reflection
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.85,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    floor.receiveShadow = true;
    scene.add(floor);

    // Add Hoodie Model
    let hoodie: HoodieModelBundle | null = null;
    try {
      hoodie = createHoodieModel();
      scene.add(hoodie.group);
    } catch (err) {
      console.error('Failed to create hoodie model', err);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Mouse tilt tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.25;
      mouseRef.current.targetY = y * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Touch support for mobile tilt
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.2;
        mouseRef.current.targetY = y * 0.15;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth progress interpolation
      const target = targetProgressRef.current;
      currentProgressRef.current += (target - currentProgressRef.current) * 0.085;
      const p = Math.max(0, Math.min(1, currentProgressRef.current));

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (hoodie) {
        hoodie.update(elapsed);

        // ================= HERO 3D SCROLL TIMELINE =================
        // At 0%: Camera starts slightly low, front 3/4 view, hoodie centered
        // At 20%: Camera begins orbiting around hoodie, fabric catches light
        // At 40%: Camera moves closer: fabric texture, embroidery, drawstrings
        // At 60%: Camera moves toward back: reveal large back graphic
        // At 75%: Camera moves upward: reveal complete silhouette
        // At 90%: Camera pulls back: reveal larger environment
        // At 100%: Return to powerful hero composition

        let camX = 0;
        let camY = 0;
        let camZ = 4.4;
        let lookY = 0.1;
        let rotY = 0;
        let rotX = 0;

        if (p < 0.2) {
          // 0% -> 20%: Front 3/4 view, slight low angle, subtle turn
          const subT = p / 0.2;
          camX = 0.7 - subT * 0.3;
          camY = -0.2 + subT * 0.3;
          camZ = 4.4 - subT * 0.4;
          rotY = -0.35 + subT * 0.55;
          rotX = 0.05 - subT * 0.03;
          lookY = 0.1;
        } else if (p < 0.4) {
          // 20% -> 40%: Zoom in close on chest embroidery & fabric folds
          const subT = (p - 0.2) / 0.2;
          camX = 0.4 - subT * 0.35;
          camY = 0.1 + subT * 0.25;
          camZ = 4.0 - subT * 1.6; // close zoom ~2.4m
          rotY = 0.2 - subT * 0.35;
          lookY = 0.25 + subT * 0.15;
        } else if (p < 0.6) {
          // 40% -> 60%: Orbit around to the back to showcase original back graphic
          const subT = (p - 0.4) / 0.2;
          const angle = subT * Math.PI; // smooth half turn
          const radius = 2.4 + subT * 0.8;
          camX = Math.sin(angle) * radius * 0.8;
          camY = 0.35 - subT * 0.1;
          camZ = Math.cos(angle) * radius;
          rotY = -0.15 + subT * 3.14; // rotates to back
          lookY = 0.3;
        } else if (p < 0.75) {
          // 60% -> 75%: Camera moves upward looking down at structured silhouette
          const subT = (p - 0.6) / 0.15;
          camX = 0.2 - subT * 0.4;
          camY = 0.25 + subT * 1.2; // elevated perspective
          camZ = -3.2 + subT * 1.2;
          rotY = Math.PI - 0.2 + subT * 0.8;
          rotX = subT * 0.15;
          lookY = 0.0;
        } else if (p < 0.9) {
          // 75% -> 90%: Pull back into cinematic wide perspective
          const subT = (p - 0.75) / 0.15;
          camX = -0.2 + subT * 0.4;
          camY = 1.45 - subT * 1.2;
          camZ = -2.0 + subT * 6.6; // pulled back out to front
          rotY = Math.PI + 0.6 + subT * 2.5; // completing full circle
          rotX = 0.15 - subT * 0.15;
          lookY = 0.1;
        } else {
          // 90% -> 100%: Strong, balanced iconic hero stance
          const subT = (p - 0.9) / 0.1;
          camX = 0.2 * (1 - subT);
          camY = 0.25 - subT * 0.15;
          camZ = 4.6 - subT * 0.3;
          rotY = Math.PI * 2 - 0.2 + subT * 0.2;
          rotX = 0;
          lookY = 0.1;
        }

        // Apply mouse tilt
        camX += mouseRef.current.x * 0.8;
        camY += mouseRef.current.y * 0.5;

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, lookY, 0);

        // Apply garment rotation
        hoodie.group.rotation.y = rotY + mouseRef.current.x * 0.2;
        hoodie.group.rotation.x = rotX - mouseRef.current.y * 0.15;

        // Dynamic light adjustments along timeline
        keyLight.intensity = 2.8 + Math.sin(p * Math.PI) * 1.2;
        rimLight.intensity = 5.0 + Math.cos(p * Math.PI * 2) * 2.0;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-3d-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-0"
    >
      {webglError && (
        <div className="w-full h-full flex items-center justify-center bg-[#070707]">
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop"
            alt="KAALD Signature Oversized Hoodie"
            className="w-full h-full object-cover opacity-60 filter contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/80" />
        </div>
      )}
    </div>
  );
};
