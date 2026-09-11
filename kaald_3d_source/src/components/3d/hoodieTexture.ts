import * as THREE from 'three';

/**
 * Procedural texture generator for realistic 480 GSM cotton and bespoke KAALD branding
 */

// Generate 480 GSM Cotton weave bump map
export function createCottonBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  // Draw diagonal twill / terry knit micro pattern
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      // High frequency textile noise + diagonal weave ribbing
      const diagonal = Math.sin((x + y * 1.5) * 0.4) * 15;
      const vertical = Math.cos(x * 0.8) * 10;
      const noise = (Math.random() - 0.5) * 25;
      const value = Math.max(0, Math.min(255, 128 + diagonal + vertical + noise));

      data[idx] = value;
      data[idx + 1] = value;
      data[idx + 2] = value;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  texture.needsUpdate = true;
  return texture;
}

// Generate Front Chest Embroidery & Branding Texture
export function createFrontGraphicTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Transparent background
  ctx.clearRect(0, 0, 1024, 1024);

  // Subtle tonal high-density chest embroidery
  ctx.save();
  ctx.translate(340, 360); // Left chest placement

  // Subtle embroidery embossed shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  // "KAALD" Wordmark
  ctx.font = '800 52px "Syne", sans-serif';
  ctx.fillStyle = '#E8E8E4';
  ctx.letterSpacing = '8px';
  ctx.fillText('KAALD', 0, 0);

  // Micro technical coordinate
  ctx.font = '500 16px "Space Grotesk", monospace';
  ctx.fillStyle = '#9C9C98';
  ctx.letterSpacing = '3px';
  ctx.fillText('BORN IN MOTION // 28.6139° N', 0, 30);
  ctx.fillText('480 GSM TERRY // SPEC.01', 0, 52);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate Back Artwork (Original abstract architectural streetwear graphic)
export function createBackGraphicTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 1024, 1024);

  ctx.save();
  ctx.translate(512, 512);

  // Abstract Architectural Frame
  ctx.strokeStyle = '#323232';
  ctx.lineWidth = 3;
  ctx.strokeRect(-280, -320, 560, 640);

  // Inner technical lines
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;
  for (let i = -240; i <= 240; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, -300);
    ctx.lineTo(i, 300);
    ctx.stroke();
  }

  // Geometric center crosshair
  ctx.strokeStyle = '#E2E2DC';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -60, 140, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-160, -60);
  ctx.lineTo(160, -60);
  ctx.moveTo(0, -220);
  ctx.lineTo(0, 100);
  ctx.stroke();

  // Bold Back Typography: KAALD
  ctx.font = '900 84px "Syne", sans-serif';
  ctx.fillStyle = '#F4F4F0';
  ctx.textAlign = 'center';
  ctx.fillText('KAALD', 0, -180);

  // Secondary Tagline
  ctx.font = '700 24px "Syne", sans-serif';
  ctx.fillStyle = '#C8C8C2';
  ctx.fillText('BORN IN MOTION', 0, 160);

  // Subtitle & Ethos
  ctx.font = '500 16px "Space Grotesk", monospace';
  ctx.fillStyle = '#8E8E8A';
  ctx.fillText('INDIAN ROOTS. GLOBAL ATTITUDE.', 0, 200);
  ctx.fillText('FOR WHAT MOVES YOU — METROPOLITAN SPECIFICATION', 0, 230);
  ctx.fillText('COGNIZANT OF FORM // UNCOMPROMISED STRUCTURE', 0, 260);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate Sleeve technical text
export function createSleeveGraphicTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 512, 512);

  ctx.save();
  ctx.translate(256, 256);
  ctx.rotate(-Math.PI / 2);

  ctx.font = '600 24px "Space Grotesk", monospace';
  ctx.fillStyle = '#AAAAAA';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('FOR WHAT MOVES YOU  —  [ 01/26 ]', 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
