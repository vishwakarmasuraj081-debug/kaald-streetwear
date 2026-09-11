import * as THREE from 'three';
import {
  createCottonBumpTexture,
  createFrontGraphicTexture,
  createBackGraphicTexture,
  createSleeveGraphicTexture
} from './hoodieTexture';

export interface HoodieModelBundle {
  group: THREE.Group;
  materials: {
    cotton: THREE.MeshStandardMaterial;
    ribbing: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
    frontDecal: THREE.MeshStandardMaterial;
    backDecal: THREE.MeshStandardMaterial;
  };
  setColor: (hex: string) => void;
  update: (time: number) => void;
}

export function createHoodieModel(): HoodieModelBundle {
  const group = new THREE.Group();

  // 1. Procedural textures
  const cottonBump = createCottonBumpTexture();
  const frontTexture = createFrontGraphicTexture();
  const backTexture = createBackGraphicTexture();
  const sleeveTexture = createSleeveGraphicTexture();

  // 2. Realistic 480 GSM Cotton Material (Heavyweight, matte, textured)
  const cottonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#161616'),
    roughness: 0.88,
    metalness: 0.05,
    bumpMap: cottonBump,
    bumpScale: 0.035,
  });

  // Ribbed knit material for cuffs and waist hem
  const ribbingMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#121212'),
    roughness: 0.92,
    metalness: 0.03,
    bumpMap: cottonBump,
    bumpScale: 0.05,
  });

  // Matte Anodized Silver Metal for Eyelets and Aglets
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#B8B8B4'),
    roughness: 0.25,
    metalness: 0.85,
  });

  // Front Embroidery Decal Material
  const frontDecalMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    transparent: true,
    roughness: 0.75,
    metalness: 0.1,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });

  // Back Graphic Decal Material
  const backDecalMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    transparent: true,
    roughness: 0.8,
    metalness: 0.05,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });

  // Sleeve Decal Material
  const sleeveDecalMat = new THREE.MeshStandardMaterial({
    map: sleeveTexture,
    transparent: true,
    roughness: 0.85,
    metalness: 0.05,
    depthWrite: false,
  });

  // ================= TORSO (Sculpted Oversized Boxy Silhouette) =================
  // Create body using a lathe or lofted cylinder with organic waist & chest curves
  const torsoPoints: THREE.Vector2[] = [];
  // From bottom hem (y = -1.2) up to neck (y = 0.9)
  torsoPoints.push(new THREE.Vector2(0.82, -1.2)); // waist bottom
  torsoPoints.push(new THREE.Vector2(0.85, -1.0)); // waist slight flare
  torsoPoints.push(new THREE.Vector2(0.88, -0.6)); // lower torso
  torsoPoints.push(new THREE.Vector2(0.92, 0.0));  // chest / boxy fullness
  torsoPoints.push(new THREE.Vector2(0.94, 0.5));  // upper chest / dropped shoulder line
  torsoPoints.push(new THREE.Vector2(0.84, 0.85)); // collar slope
  torsoPoints.push(new THREE.Vector2(0.48, 0.95)); // neck collar base

  const torsoGeo = new THREE.CylinderGeometry(
    0.92, // radiusTop
    0.86, // radiusBottom
    2.1,  // height
    36,   // radialSegments
    20,   // heightSegments
    false
  );

  // Deform cylinder to give natural chest projection and slightly flattened front/back
  const pos = torsoGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    let x = pos.getX(i);
    let z = pos.getZ(i);

    // Flatten depth-wise for human torso profile (depth < width)
    z *= 0.65;

    // Add gentle natural fold wave along waist
    if (y < -0.2 && y > -1.0) {
      const angle = Math.atan2(z, x);
      const wrinkle = Math.sin(angle * 4 + y * 5) * 0.025;
      x += wrinkle;
      z += wrinkle * 0.6;
    }

    // Slightly wider at shoulders
    if (y > 0.3) {
      x *= 1.08;
    }

    pos.setXYZ(i, x, y, z);
  }
  torsoGeo.computeVertexNormals();

  const torsoMesh = new THREE.Mesh(torsoGeo, cottonMaterial);
  torsoMesh.position.y = -0.1;
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  group.add(torsoMesh);

  // Bottom Ribbed Waistband Hem
  const waistHemGeo = new THREE.CylinderGeometry(0.85, 0.83, 0.18, 36);
  const waistHem = new THREE.Mesh(waistHemGeo, ribbingMaterial);
  waistHem.scale.set(1.0, 1.0, 0.65);
  waistHem.position.set(0, -1.22, 0);
  waistHem.castShadow = true;
  group.add(waistHem);

  // ================= KANGAROO POCKET =================
  const pocketShape = new THREE.Shape();
  pocketShape.moveTo(-0.52, -0.4);
  pocketShape.lineTo(0.52, -0.4);
  pocketShape.lineTo(0.50, 0.1);
  pocketShape.lineTo(0.32, 0.28); // angled hand opening
  pocketShape.lineTo(-0.32, 0.28);
  pocketShape.lineTo(-0.50, 0.1); // angled hand opening
  pocketShape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  };
  const pocketGeo = new THREE.ExtrudeGeometry(pocketShape, extrudeSettings);
  const pocketMesh = new THREE.Mesh(pocketGeo, cottonMaterial);
  pocketMesh.position.set(0, -0.45, 0.58);
  pocketMesh.castShadow = true;
  group.add(pocketMesh);

  // Pocket seam stitch bar line
  const pocketStitchGeo = new THREE.BoxGeometry(0.66, 0.015, 0.02);
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.9,
  });
  const pocketStitch = new THREE.Mesh(pocketStitchGeo, stitchMat);
  pocketStitch.position.set(0, -0.17, 0.63);
  group.add(pocketStitch);

  // ================= FRONT EMBROIDERY DECAL =================
  const frontDecalGeo = new THREE.PlaneGeometry(0.9, 0.9);
  const frontDecal = new THREE.Mesh(frontDecalGeo, frontDecalMat);
  frontDecal.position.set(0, 0.35, 0.61);
  group.add(frontDecal);

  // ================= BACK GRAPHIC DECAL =================
  const backDecalGeo = new THREE.PlaneGeometry(1.2, 1.4);
  const backDecal = new THREE.Mesh(backDecalGeo, backDecalMat);
  backDecal.rotation.y = Math.PI;
  backDecal.position.set(0, 0.08, -0.61);
  group.add(backDecal);

  // ================= HOOD (Architectural Cross-Over Collar) =================
  const hoodGroup = new THREE.Group();

  // Outer sculpted hood dome
  const hoodOuterGeo = new THREE.SphereGeometry(
    0.68,
    32,
    24,
    -Math.PI * 0.75, // phiStart
    Math.PI * 1.5,   // phiLength
    0,               // thetaStart
    Math.PI * 0.78   // thetaLength
  );

  // Deform to architectural hood shape (tall, structured peak)
  const hPos = hoodOuterGeo.attributes.position;
  for (let i = 0; i < hPos.count; i++) {
    let x = hPos.getX(i);
    let y = hPos.getY(i);
    let z = hPos.getZ(i);

    // Elongate vertically
    y *= 1.25;
    // Push back slightly
    z = z * 1.15 - 0.12;

    hPos.setXYZ(i, x, y, z);
  }
  hoodOuterGeo.computeVertexNormals();

  const hoodOuter = new THREE.Mesh(hoodOuterGeo, cottonMaterial);
  hoodOuter.position.set(0, 1.42, -0.05);
  hoodOuter.castShadow = true;
  hoodGroup.add(hoodOuter);

  // Inner hood cavity lining
  const hoodInnerGeo = hoodOuterGeo.clone();
  hoodInnerGeo.scale(0.93, 0.93, 0.93);
  const hoodInnerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101010'),
    roughness: 0.95,
    side: THREE.BackSide,
  });
  const hoodInner = new THREE.Mesh(hoodInnerGeo, hoodInnerMat);
  hoodInner.position.copy(hoodOuter.position);
  hoodGroup.add(hoodInner);

  // Cross-over front collar band
  const collarBandGeo = new THREE.TorusGeometry(0.38, 0.08, 16, 32, Math.PI * 1.1);
  const collarBand = new THREE.Mesh(collarBandGeo, cottonMaterial);
  collarBand.rotation.x = Math.PI * 0.55;
  collarBand.rotation.z = -Math.PI * 0.05;
  collarBand.position.set(0, 0.95, 0.28);
  collarBand.castShadow = true;
  hoodGroup.add(collarBand);

  // Metallic Eyelets
  const eyeletGeo = new THREE.TorusGeometry(0.024, 0.007, 12, 24);
  const eyeletLeft = new THREE.Mesh(eyeletGeo, metalMaterial);
  eyeletLeft.position.set(-0.16, 0.88, 0.44);
  eyeletLeft.rotation.y = -0.2;
  hoodGroup.add(eyeletLeft);

  const eyeletRight = new THREE.Mesh(eyeletGeo, metalMaterial);
  eyeletRight.position.set(0.16, 0.88, 0.44);
  eyeletRight.rotation.y = 0.2;
  hoodGroup.add(eyeletRight);

  // Hanging Drawstrings with Anodized Aglets
  const createDrawstring = (isLeft: boolean) => {
    const stringGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Curved tube for natural hanging gravity
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 0.16, 0.88, 0.44),
      new THREE.Vector3(sign * 0.17, 0.65, 0.49),
      new THREE.Vector3(sign * 0.15, 0.40, 0.54),
      new THREE.Vector3(sign * 0.16, 0.15, 0.56),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.012, 8, false);
    const cordMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.9,
    });
    const cordMesh = new THREE.Mesh(tubeGeo, cordMat);
    stringGroup.add(cordMesh);

    // Cylindrical silver metal aglet tip
    const agletGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.08, 16);
    const aglet = new THREE.Mesh(agletGeo, metalMaterial);
    aglet.position.set(sign * 0.16, 0.11, 0.56);
    stringGroup.add(aglet);

    return stringGroup;
  };

  const stringL = createDrawstring(true);
  const stringR = createDrawstring(false);
  hoodGroup.add(stringL);
  hoodGroup.add(stringR);

  group.add(hoodGroup);

  // ================= SLEEVES (Dropped Shoulders, Ergonomic Bend) =================
  const createSleeve = (isLeft: boolean) => {
    const armGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Construct curved arm from dropped shoulder down to wrist
    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 0.90, 0.72, 0.0),   // dropped shoulder apex
      new THREE.Vector3(sign * 1.32, 0.42, 0.08),  // upper arm
      new THREE.Vector3(sign * 1.48, -0.05, 0.14), // elbow flex
      new THREE.Vector3(sign * 1.42, -0.60, 0.18), // forearm
      new THREE.Vector3(sign * 1.34, -0.98, 0.18), // wrist
    ]);

    // Custom variable radius tube or segmented cones
    const sleeveGeo = new THREE.TubeGeometry(armCurve, 32, 0.27, 18, false);
    // Taper wrist
    const sPos = sleeveGeo.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const y = sPos.getY(i);
      if (y < -0.2) {
        const factor = Math.max(0.68, 1.0 - ((-0.2 - y) * 0.28));
        sPos.setX(i, sPos.getX(i) * factor + (sign * 0.38 * (1 - factor)));
      }
    }
    sleeveGeo.computeVertexNormals();

    const sleeveMesh = new THREE.Mesh(sleeveGeo, cottonMaterial);
    sleeveMesh.castShadow = true;
    sleeveMesh.receiveShadow = true;
    armGroup.add(sleeveMesh);

    // Ribbed Wrist Cuff
    const cuffGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.15, 24);
    const cuffMesh = new THREE.Mesh(cuffGeo, ribbingMaterial);
    cuffMesh.position.set(sign * 1.33, -1.05, 0.18);
    cuffMesh.rotation.z = sign * 0.15;
    cuffMesh.castShadow = true;
    armGroup.add(cuffMesh);

    // Sleeve Decal on Left Arm
    if (isLeft) {
      const sleevePlaneGeo = new THREE.PlaneGeometry(0.35, 0.9);
      const sleeveDecal = new THREE.Mesh(sleevePlaneGeo, sleeveDecalMat);
      sleeveDecal.position.set(-1.46, -0.25, 0.26);
      sleeveDecal.rotation.y = Math.PI * 0.45;
      armGroup.add(sleeveDecal);
    }

    return armGroup;
  };

  const sleeveLeft = createSleeve(true);
  const sleeveRight = createSleeve(false);
  group.add(sleeveLeft);
  group.add(sleeveRight);

  // Group centering & scale
  group.scale.set(0.9, 0.9, 0.9);
  group.position.y = 0.1;

  return {
    group,
    materials: {
      cotton: cottonMaterial,
      ribbing: ribbingMaterial,
      metal: metalMaterial,
      frontDecal: frontDecalMat,
      backDecal: backDecalMat,
    },
    setColor: (hex: string) => {
      cottonMaterial.color.set(hex);
      // Darken slightly for ribbing
      const c = new THREE.Color(hex);
      c.offsetHSL(0, 0, -0.05);
      ribbingMaterial.color.copy(c);
    },
    update: (time: number) => {
      // Gentle natural breathing motion in idle
      const breath = Math.sin(time * 1.4) * 0.008;
      torsoMesh.scale.set(1 + breath, 1 + breath * 0.5, 1 + breath * 1.2);
      // Subtle sway on strings
      stringL.rotation.z = Math.sin(time * 2.0) * 0.04;
      stringR.rotation.z = Math.sin(time * 2.0 + 0.8) * 0.04;
    }
  };
}
