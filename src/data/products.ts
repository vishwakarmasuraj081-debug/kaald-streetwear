import { Product } from '../types';
import pantsBlackImg from '../assets/images/pants_black_1789119087466.jpg';
import pantsCharcoalImg from '../assets/images/pants_charcoal_1789119105055.jpg';
import pantsStoneImg from '../assets/images/pants_stone_1789119123652.jpg';
import shirtBlackImg from '../assets/images/shirt_black_1789119141186.jpg';
import shirtBoneImg from '../assets/images/shirt_bone_1789119158855.jpg';
import jacketDarkImg from '../assets/images/jacket_dark_1789119174160.jpg';

export const PRODUCTS: Product[] = [
  // ================= ICONIC HERO GARMENTS (Drop 01 Real Campaign Pieces) =================
  {
    id: 'kld-pant-hero',
    name: 'KAALD UTILITY RELAXED PANT',
    category: 'PANTS',
    collection: 'DROP 01',
    price: 2999,
    compareAtPrice: 3999,
    tag: 'DROP 01',
    isNew: true,
    featured: true,
    shortDescription: '420 GSM Combed Cotton Twill with architectural knee seam articulation and magnetic cargo pockets.',
    description: 'Engineered with a relaxed wide-leg profile and architectural knee seam articulation. Cut from high-density 420 GSM combed cotton twill, featuring low-profile magnetic cargo utility pockets, deep side hand pockets, and custom tonal stitching throughout.',
    gsm: 420,
    fit: 'Relaxed Wide-Leg with Subtle Lower Taper',
    fitType: 'RELAXED FIT',
    material: '100% Combed Cotton Twill (420 GSM)',
    fabric: '420 GSM Heavyweight Combed Cotton Twill',
    details: [
      'Architectural knee seam articulation',
      'Dual low-profile magnetic cargo pockets',
      'Deep reinforced slash hand pockets',
      'Reinforced webbed drawstring waistband & belt loops',
      'Cut & sewn in Mumbai, India'
    ],
    care: 'Machine wash cold with similar dark colors. Line dry inside out.',
    shipping: 'Complimentary express shipping across India. Dispatched within 24 hours in recycled mailer.',
    returns: '10-day complimentary hassle-free exchange & return policy.',
    colors: [
      { id: 'black', name: 'BLACK', label: '01 / BLACK', hex: '#141414', image: pantsBlackImg },
      { id: 'charcoal', name: 'CHARCOAL', label: '02 / CHARCOAL', hex: '#373739', image: pantsCharcoalImg },
      { id: 'stone', name: 'STONE', label: '03 / STONE', hex: '#D1CDC5', image: pantsStoneImg }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [pantsBlackImg, pantsCharcoalImg, pantsStoneImg]
  },
  {
    id: 'kld-shirt-hero',
    name: 'SIGNATURE OVERSIZED SHIRT',
    category: 'SHIRTS',
    collection: 'DROP 01',
    price: 1999,
    compareAtPrice: 2799,
    tag: 'DROP 01',
    isNew: true,
    featured: true,
    shortDescription: '280 GSM Compact Organic Cotton Jersey with boxy dropped shoulders and bound ribbed neckband.',
    description: 'The foundation of daily motion. Built from custom 280 GSM compact cotton jersey with a structured hand feel that drapes cleanly without clinging. Features dropped shoulder seams, elongated sleeves, and a reinforced 1.25" ribbed collar.',
    gsm: 280,
    fit: 'Boxy Drop-Shoulder Relaxed Silhouette',
    fitType: 'BOX FIT',
    material: '100% Compact Organic Cotton Jersey (280 GSM)',
    fabric: '280 GSM Compact Organic Cotton Jersey',
    details: [
      'Boxy drop-shoulder relaxed silhouette',
      'High-density 1.25" bound ribbed neckband',
      'Tonal micro-silkscreen KAALD typography',
      'Pre-shrunk to retain dimensional stability',
      'Loomed & assembled in Tirupur / Mumbai'
    ],
    care: 'Machine wash cold delicate. Tumble dry low or line dry in shade.',
    shipping: 'Complimentary shipping across India on orders above ₹2,499.',
    returns: '10-day complimentary hassle-free exchange & return policy.',
    colors: [
      { id: 'black', name: 'BLACK', label: '01 / BLACK', hex: '#151515', image: shirtBlackImg },
      { id: 'bone', name: 'BONE', label: '02 / BONE', hex: '#E0DDD6', image: shirtBoneImg }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [shirtBlackImg, shirtBoneImg]
  },
  {
    id: 'kld-jacket-hero',
    name: 'DISCIPLINE UTILITY JACKET',
    category: 'JACKETS',
    collection: 'DROP 01',
    price: 3499,
    compareAtPrice: 4799,
    tag: 'LIMITED',
    isNew: true,
    featured: true,
    shortDescription: 'Water-resistant technical micro-faille with two-way gunmetal YKK zips and stand collar.',
    description: 'A tactical outerwear piece engineered for night climates and urban navigation. Constructed from weather-resistant matte technical nylon blend with taped two-way industrial front zips, an articulated stand collar, and interior utility holster compartments.',
    gsm: 320,
    fit: 'Structured Relaxed Outerwear Layer',
    fitType: 'RELAXED FIT',
    material: '65% Technical Nylon, 35% Combed Cotton Micro-Faille',
    fabric: 'Weather-Resistant Technical Micro-Faille Shell',
    details: [
      'Matte gunmetal YKK two-way reverse coil front zippers',
      'Ergonomic stand storm collar with dual throat latch',
      'Triple modular chest & waist flap utility pockets',
      'Concealed interior passport and tech compartments',
      'Handcrafted in Mumbai, India'
    ],
    care: 'Dry clean recommended or gentle cold hand rinse. Air dry flat.',
    shipping: 'Complimentary insured express shipping across India.',
    returns: '10-day complimentary hassle-free exchange & return policy.',
    colors: [
      { id: 'black-charcoal', name: 'DARK CHARCOAL', label: '01 / DARK CHARCOAL', hex: '#1E1E20', image: jacketDarkImg }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [jacketDarkImg]
  },

  // ================= HOODIES (8 Items) =================
  {
    id: 'kld-hoodie-01',
    name: 'MOTION HOODIE — SIGNATURE DROP 01',
    category: 'HOODIES',
    price: 2499,
    compareAtPrice: 3499,
    tag: 'DROP 01',
    shortDescription: '480 GSM Heavyweight French Terry with dropped silhouette and high-density micro embroidery.',
    description: 'The definitive KAALD silhouette. Constructed from 480 GSM custom-loomed organic Indian cotton French Terry, offering an architectural drape that retains shape over years of movement. Features twin-needle reinforcement, double-layered structured hood without exposed cords, and signature typographic coordinates at the cuff.',
    gsm: 480,
    fit: 'Signature Oversized — Boxy Torso, Dropped Shoulders',
    material: '100% Combed Indian Cotton (480 GSM French Terry)',
    care: 'Machine wash cold inside-out. Line dry in shade. Do not iron directly on print or embroidery.',
    shipping: 'Complimentary shipping across India on orders above ₹2,499. Dispatched in sustainable recycled packaging within 24 hours.',
    colors: [
      { name: 'Washed Charcoal Black', hex: '#161616' },
      { name: 'Raw Concrete Grey', hex: '#424242' },
      { name: 'Nocturne Ash', hex: '#262629' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop'
    ],
    model3dAvailable: true,
    featured: true,
    hotspots: [
      {
        id: 'hs-1',
        title: '01 / HEAVYWEIGHT COTTON',
        tagline: '480 GSM Terry',
        description: 'Knitted from long-staple Indian cotton in Tamil Nadu, double-pre-shrunk for a permanent structured drape.',
        position: [0, 0.2, 0.4]
      },
      {
        id: 'hs-2',
        title: '02 / SIGNATURE EMBROIDERY',
        tagline: 'High-Density Matte Stitching',
        description: 'Tone-on-tone KAALD micro-typography with 12,000 stitch count on the left chest.',
        position: [-0.3, 0.5, 0.35]
      },
      {
        id: 'hs-3',
        title: '03 / ARCHITECTURAL HOOD',
        tagline: 'Double-Layer Self Fabric',
        description: 'Cross-over collar structure engineered to stand upright without collapsing.',
        position: [0, 1.1, 0.1]
      },
      {
        id: 'hs-4',
        title: '04 / UTILITY REINFORCEMENT',
        tagline: 'Twin-Needle Bar Tacking',
        description: 'Deep kangaroo pouch with concealed inner zip pocket for phone and essentials.',
        position: [0, -0.3, 0.38]
      }
    ]
  },
  {
    id: 'kld-hoodie-02',
    name: 'METRIC OVERSIZED HOODIE',
    category: 'HOODIES',
    price: 2899,
    tag: 'NEW',
    shortDescription: 'Structured 500 GSM loopback fleece with articulated elbow darting.',
    description: 'A study in ergonomic street tailoring. Features ergonomic arm seams inspired by motorcycle racing gear and an asymmetric rib hem that flexes with human motion.',
    gsm: 500,
    fit: 'Extreme Oversized Drape',
    material: '100% Indian Combed Loopback Cotton',
    care: 'Cold gentle wash. Do not tumble dry.',
    shipping: 'Ships in 1-2 business days via Express.',
    colors: [
      { name: 'Onyx Black', hex: '#0D0D0D' },
      { name: 'Slate Grey', hex: '#383A3E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    model3dAvailable: true,
    featured: true
  },
  {
    id: 'kld-hoodie-03',
    name: 'CIPHER DUAL-ZIP TECHNICAL HOODIE',
    category: 'HOODIES',
    price: 3199,
    compareAtPrice: 3899,
    tag: 'LIMITED',
    shortDescription: 'Double-ended matte black YKK zip closure with high funnel neck.',
    description: 'Engineered for variable urban climates. Split or close at will with dual two-way heavy-gauge industrial zips and water-resistant sleeve panels.',
    gsm: 450,
    fit: 'Structured Boxy',
    material: 'Cotton-Poly Technical Double Knit',
    care: 'Machine wash cold. Line dry.',
    shipping: 'Express shipping included.',
    colors: [
      { name: 'Matte Carbon', hex: '#1C1D1F' }
    ],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop'
    ],
    model3dAvailable: true
  },
  {
    id: 'kld-hoodie-04',
    name: 'NOCTURNE BRUTALIST HOODIE',
    category: 'HOODIES',
    price: 2799,
    tag: 'BESTSELLER',
    shortDescription: 'Raw distressed hemline with distressed rib accents.',
    description: 'Hand-treated stone-washed finish giving each garment a unique mineral patina reminiscent of concrete urban monoliths.',
    gsm: 480,
    fit: 'Relaxed Drop-Shoulder',
    material: '100% Organic Heavy Cotton',
    care: 'Cold wash inside-out.',
    shipping: 'Free delivery pan-India.',
    colors: [
      { name: 'Washed Coal', hex: '#222224' },
      { name: 'Muted Earth', hex: '#3D3833' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop'
    ],
    model3dAvailable: true
  },
  {
    id: 'kld-hoodie-05',
    name: 'CHRONO THERMAL HOODIE',
    category: 'HOODIES',
    price: 2699,
    shortDescription: 'Waffle-lined interior with high wind-shield collar.',
    description: 'Designed for midnight city rides. The bonded thermal lining retains body heat while allowing vapor release.',
    gsm: 460,
    fit: 'Relaxed Streetwear Fit',
    material: 'Dual-Layered Cotton/Thermal Fleece',
    care: 'Wash cold, flat dry.',
    shipping: 'Dispatched within 24 hours.',
    colors: [{ name: 'Night Pitch', hex: '#111111' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-hoodie-06',
    name: 'VECTOR GRADIENT HOODIE',
    category: 'HOODIES',
    price: 2999,
    shortDescription: 'Monochrome screen-printed vector back graphic with tonal gloss details.',
    description: 'Subtle typographic exploration celebrating the geometric grit of metropolitan elevated expressways.',
    gsm: 480,
    fit: 'Oversized',
    material: '100% Combed Heavy Terry',
    care: 'Cold wash. Dry flat.',
    shipping: 'Free shipping across India.',
    colors: [{ name: 'Deep Graphite', hex: '#18191B' }],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-hoodie-07',
    name: 'TACTILE KANGAROO HOODIE',
    category: 'HOODIES',
    price: 2599,
    shortDescription: 'Nylon ripstop pouch overlay with fidlock-inspired pull tabs.',
    description: 'Combining heavy jersey with industrial nylon contrast for functional utility on the move.',
    gsm: 440,
    fit: 'Boxy Drop',
    material: 'Cotton Terry with Ripstop Accents',
    care: 'Machine wash delicate.',
    shipping: 'Free delivery.',
    colors: [{ name: 'Jet Black', hex: '#0B0B0C' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-hoodie-08',
    name: 'MONOLITH HEAVYWEIGHT PULLOVER',
    category: 'HOODIES',
    price: 2899,
    tag: 'LIMITED',
    shortDescription: '520 GSM Ultra-Heavy organic terry with seamless cuffs.',
    description: 'Our most substantial garment yet. Dense, sheltering, built like armour for the modern city dweller.',
    gsm: 520,
    fit: 'Substantial Oversized Silhouette',
    material: '100% Organic Super-Combed Indian Terry',
    care: 'Dry clean recommended or gentle hand wash.',
    shipping: 'Free express shipping.',
    colors: [{ name: 'Charcoal Core', hex: '#1F2022' }],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ================= T-SHIRTS (12 Items) =================
  {
    id: 'kld-tee-01',
    name: 'SIGNATURE TEE — BORN IN MOTION',
    category: 'T-SHIRTS',
    price: 1499,
    compareAtPrice: 1999,
    tag: 'DROP 01',
    shortDescription: '280 GSM Heavyweight Combed Cotton with high rib neck collar.',
    description: 'The foundation of the KAALD daily uniform. Heavyweight 280 GSM jersey that hangs cleanly without clinging. Finished with a tight 1.25" rib collar that never sags after dozens of washes.',
    gsm: 280,
    fit: 'Boxy Oversized Fit with Drop Shoulders',
    material: '100% Indian Combed Cotton Jersey',
    care: 'Machine wash cold with similar dark colors.',
    shipping: 'Ships within 24 hours.',
    colors: [
      { name: 'Deep Pitch Black', hex: '#0A0A0A' },
      { name: 'Raw Bone Off-White', hex: '#E2DFD8' },
      { name: 'Washed Ash', hex: '#4A4A4A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-tee-02',
    name: 'ARCHITECTURE OVERSIZED TEE',
    category: 'T-SHIRTS',
    price: 1799,
    tag: 'NEW',
    shortDescription: 'Architectural back typography referencing Delhi brutalism.',
    description: 'Minimalist front with high-contrast architectural technical blueprint layout printed on the rear in archival water-based ink.',
    gsm: 300,
    fit: 'Architectural Boxy Cut',
    material: '100% Ring-Spun Indian Cotton',
    care: 'Wash cold inside out. Do not tumble dry.',
    shipping: 'Free delivery on orders over ₹2499.',
    colors: [
      { name: 'Obsidian Black', hex: '#121212' },
      { name: 'Chalk White', hex: '#ECEAE4' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-tee-03',
    name: 'CHRONICLE GRAPHIC TEE',
    category: 'T-SHIRTS',
    price: 1899,
    tag: 'BESTSELLER',
    shortDescription: 'Vintage-washed finish with high-density tonal puff print.',
    description: 'Pre-washed with volcanic pumice stones to achieve an authentic vintage drape and velvety hand-feel.',
    gsm: 280,
    fit: 'Relaxed Drop Shoulder',
    material: '100% Heavy Combed Cotton',
    care: 'Cold wash only.',
    shipping: 'Express delivery available.',
    colors: [{ name: 'Faded Black', hex: '#252527' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-04',
    name: 'MONOLITH RAW-EDGE TEE',
    category: 'T-SHIRTS',
    price: 1599,
    shortDescription: 'Raw-cut sleeve cuffs with reinforced edge stitching.',
    description: 'Subtle deconstruction meets precision tailoring. Clean horizontal chest seam and lowered armholes.',
    gsm: 290,
    fit: 'Wide Boxy Cut',
    material: '100% Organic Indian Cotton',
    care: 'Cold machine wash.',
    shipping: 'Dispatched in 24 hours.',
    colors: [{ name: 'Dark Slate', hex: '#2B2D31' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-05',
    name: 'MOTION BLUR GRAPHIC TEE',
    category: 'T-SHIRTS',
    price: 1699,
    shortDescription: 'Displaced typography expressing relentless forward kinetic drive.',
    description: 'High-contrast monochrome typographic print that visualizes speed and perpetual urban motion.',
    gsm: 280,
    fit: 'Standard Oversized',
    material: '100% Combed Cotton',
    care: 'Wash cold inside out.',
    shipping: 'Standard delivery 2-4 business days.',
    colors: [{ name: 'Jet Black', hex: '#0B0B0C' }, { name: 'Optic White', hex: '#F0EFEB' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-06',
    name: 'TACTICAL SPLIT-HEM TEE',
    category: 'T-SHIRTS',
    price: 1799,
    shortDescription: 'Reinforced side slits with herringbone tape reinforcement.',
    description: 'Engineered for seamless layering under hoodies or jackets without binding at the hips.',
    gsm: 290,
    fit: 'Elongated Boxy',
    material: '100% Combed Cotton',
    care: 'Cold gentle wash.',
    shipping: 'Ships next business day.',
    colors: [{ name: 'Charcoal Black', hex: '#1C1C1E' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-07',
    name: 'ROOTS & ATTITUDE TEE',
    category: 'T-SHIRTS',
    price: 1599,
    tag: 'ICONIC',
    shortDescription: 'Subtle micro-print honoring subcontinent street culture.',
    description: 'Minimalist breast coordinate print pointing to the birthplace of the KAALD movement.',
    gsm: 275,
    fit: 'Relaxed Streetwear Fit',
    material: '100% Cotton',
    care: 'Machine wash cold.',
    shipping: 'Free shipping above ₹2,499.',
    colors: [{ name: 'Pitch Black', hex: '#121212' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-08',
    name: 'DISCIPLINE HEAVY TEE',
    category: 'T-SHIRTS',
    price: 1899,
    shortDescription: 'Thick 320 GSM heavyweight knit for structured drape.',
    description: 'For those who demand uncompromising garment thickness that stands entirely independent of body contour.',
    gsm: 320,
    fit: 'Sculptural Heavy Boxy',
    material: '320 GSM Double-Combed Terry Knit',
    care: 'Wash cold, line dry.',
    shipping: 'Free delivery on qualifying orders.',
    colors: [{ name: 'Carbon Black', hex: '#171719' }],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-09',
    name: 'SUB-ZERO MESH LAYER TEE',
    category: 'T-SHIRTS',
    price: 1699,
    shortDescription: 'Breathable technical sports mesh layered sleeves.',
    description: 'Athletic street crossover piece featuring ventilated mesh paneling on inner arms.',
    gsm: 260,
    fit: 'Athletic Street Oversized',
    material: 'Cotton & Technical Poly Mesh',
    care: 'Cold wash only.',
    shipping: 'Dispatched within 24 hours.',
    colors: [{ name: 'Matte Night', hex: '#131315' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-10',
    name: 'GRIDLINE VECTOR TEE',
    category: 'T-SHIRTS',
    price: 1599,
    shortDescription: 'Industrial isometric grid line graphic on back shoulder.',
    description: 'Clean typographic system inspired by Delhi Metro structural blueprints.',
    gsm: 280,
    fit: 'Standard Oversized',
    material: '100% Combed Cotton',
    care: 'Machine wash cold.',
    shipping: 'Ships in 1-2 business days.',
    colors: [{ name: 'Black Core', hex: '#0F0F10' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-11',
    name: 'KINETIC STRIPE LONG-TEE',
    category: 'T-SHIRTS',
    price: 1799,
    shortDescription: 'Dropped sleeve length reaching just below elbow.',
    description: 'Modern silhouette with relaxed elongated sleeves and blind hem stitching.',
    gsm: 290,
    fit: 'Relaxed Drop Elbow',
    material: '100% Super-Combed Indian Cotton',
    care: 'Gentle cold wash.',
    shipping: 'Free shipping above ₹2,499.',
    colors: [{ name: 'Deep Smoke', hex: '#2C2D30' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-tee-12',
    name: 'NOISE PROTOCOL GRAPHIC TEE',
    category: 'T-SHIRTS',
    price: 1999,
    tag: 'LIMITED',
    shortDescription: 'High-density micro-screen print with tactile tactile grain.',
    description: 'Limited edition print examining digital interference in late-night megalopolises.',
    gsm: 300,
    fit: 'Sculptural Oversized',
    material: '100% Combed Cotton',
    care: 'Dry flat in shade.',
    shipping: 'Express dispatch.',
    colors: [{ name: 'Tar Black', hex: '#0B0B0D' }],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ================= CARGOS (6 Items) =================
  {
    id: 'kld-cargo-01',
    name: 'UTILITY CARGO PANTS — MK II',
    category: 'CARGOS',
    price: 2999,
    compareAtPrice: 3999,
    tag: 'BESTSELLER',
    shortDescription: '8-Pocket heavy cotton twill cargo with articulated knee darts and cinch ankles.',
    description: 'Engineered for unrestrained mobility. Cut from custom 340 GSM heavy cotton twill with bar-tacked stress points, magnetic bellows pockets, and bungee-toggle cuff cinches that adapt instantly between sneakers and boots.',
    gsm: 340,
    fit: 'Tapered Utility — Roomy Thigh, Adjustable Cuff',
    material: '100% Heavyweight Cotton Twill (340 GSM)',
    care: 'Machine wash cold inside out. Hang dry.',
    shipping: 'Free express shipping across India.',
    colors: [
      { name: 'Matte Carbon Black', hex: '#161617' },
      { name: 'Industrial Olive Moss', hex: '#3B3D34' },
      { name: 'Urban Slate', hex: '#36383D' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-cargo-02',
    name: 'ARCHITECT WIDE-LEG CARGO',
    category: 'CARGOS',
    price: 3299,
    tag: 'NEW',
    shortDescription: 'Wide-leg flowing silhouette with deep origami pleats.',
    description: 'Voluminous street trouser with tailored waistband and double-entry cargo pockets that maintain clean lines even when loaded.',
    gsm: 320,
    fit: 'Wide Leg Relaxed Drape',
    material: 'Cotton-Tencel Structural Weave',
    care: 'Cold gentle wash. Line dry.',
    shipping: 'Ships in 24 hours.',
    colors: [
      { name: 'Pitch Black', hex: '#0E0F10' },
      { name: 'Stone Khaki', hex: '#636056' }
    ],
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-cargo-03',
    name: 'KINETIC PARACHUTE PANT',
    category: 'CARGOS',
    price: 2799,
    tag: 'DROP 01',
    shortDescription: 'Lightweight technical ripstop with water-repellent DWR coating.',
    description: 'Ultra-lightweight yet tear-proof. Designed for extreme climate transitions with knee venting and drawstring waistband.',
    gsm: 220,
    fit: 'Balloon Parachute Fit',
    material: 'Technical Nylon Ripstop',
    care: 'Cold wash. Quick drying.',
    shipping: 'Free delivery.',
    colors: [{ name: 'Deep Asphalt', hex: '#212224' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-cargo-04',
    name: 'TACTILE MULTI-POCKET TROUSER',
    category: 'CARGOS',
    price: 3499,
    tag: 'LIMITED',
    shortDescription: '10-pocket modular system with detachable tactical key leash.',
    description: 'Heavy utility trouser featuring reinforced seat panels, dual cargo pockets with webbing pulls, and hidden passport pocket.',
    gsm: 360,
    fit: 'Straight Relaxed',
    material: '100% Heavy Twill Cotton',
    care: 'Machine wash cold.',
    shipping: 'Free express shipping.',
    colors: [{ name: 'Onyx', hex: '#111213' }],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-cargo-05',
    name: 'STEALTH SWEAT CARGO',
    category: 'CARGOS',
    price: 2699,
    shortDescription: '450 GSM French Terry cargo sweatpants with zippered pockets.',
    description: 'Loungewear comfort meets street utility. Clean rib cuffs and hidden zip pocket closures.',
    gsm: 450,
    fit: 'Tapered Sweatpant Fit',
    material: '100% Combed Cotton Terry',
    care: 'Wash cold inside out.',
    shipping: 'Ships next day.',
    colors: [{ name: 'Washed Charcoal', hex: '#1E1F21' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-cargo-06',
    name: 'FLUID OVERSIZE CARGO SHORT',
    category: 'CARGOS',
    price: 2199,
    shortDescription: 'Below-the-knee heavyweight cargo short with elasticated drawcord.',
    description: 'Built for intense Indian summers. Generous leg opening that ensures maximum air circulation.',
    gsm: 300,
    fit: 'Baggy Longline Short',
    material: '100% Cotton Canvas',
    care: 'Machine wash cold.',
    shipping: 'Free shipping above ₹2,499.',
    colors: [{ name: 'Carbon Black', hex: '#141416' }],
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ================= JACKETS (5 Items) =================
  {
    id: 'kld-jacket-01',
    name: 'DISCIPLINE BOMBER JACKET',
    category: 'JACKETS',
    price: 3499,
    compareAtPrice: 4499,
    tag: 'ICONIC',
    shortDescription: 'Oversized flight jacket silhouette in matte technical nylon with orange safety lining.',
    description: 'A homage to timeless flight jackets, reimagined through contemporary Indian streetwear proportions. Features a water-resistant matte shell, heavy metal front zipper, utility arm pocket with branded KAALD flight ribbon, and ribbed wool collar.',
    fit: 'Cropped Body, Extreme Dropped Shoulders',
    material: 'Matte Industrial Nylon Shell, Primaloft Polyfill',
    care: 'Dry clean only.',
    shipping: 'Free express delivery across India.',
    colors: [
      { name: 'Matte Jet Black', hex: '#111213' },
      { name: 'Dark Sage Green', hex: '#343831' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-jacket-02',
    name: 'URBAN SHELL WINDBREAKER',
    category: 'JACKETS',
    price: 3299,
    tag: 'NEW',
    shortDescription: 'Packable technical shell with waterproof taping and reflective back logo.',
    description: 'Engineered for monsoons and high-speed commutes. Fully seam-sealed 2.5-layer breathable fabric with an adjustable 3-point storm hood.',
    fit: 'Loose Technical Fit',
    material: '3-Layer Waterproof Technical Membrane',
    care: 'Cold gentle wash. Line dry.',
    shipping: 'Ships in 24 hours.',
    colors: [{ name: 'Obsidian', hex: '#151618' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-jacket-03',
    name: 'FIELD OVERSIZED OVERSHIRT',
    category: 'JACKETS',
    price: 2699,
    shortDescription: 'Heavyweight cotton canvas workshirt jacket with dual 3D chest pockets.',
    description: 'Substantial enough to serve as an outer jacket or a structured mid-layer during cool evenings.',
    gsm: 380,
    fit: 'Straight Oversized Shacket',
    material: '100% Indian Duck Canvas',
    care: 'Machine wash cold.',
    shipping: 'Free delivery pan-India.',
    colors: [
      { name: 'Washed Charcoal', hex: '#212224' },
      { name: 'Raw Natural', hex: '#DDD9D0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-jacket-04',
    name: 'TECHNICAL PUFFER COAT',
    category: 'JACKETS',
    price: 4499,
    tag: 'LIMITED',
    shortDescription: 'High-loft baffle box insulation with water-shedding ripstop exterior.',
    description: 'Uncompromising warmth for northern Indian winters and high-altitude travel. Boxy cut with inner fleece storm cuffs.',
    fit: 'Boxy Puffer Fit',
    material: 'Recycled Polyfill with Ripstop Shell',
    care: 'Dry clean recommended.',
    shipping: 'Free express shipping.',
    colors: [{ name: 'Deep Carbon', hex: '#161718' }],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-jacket-05',
    name: 'BORDERLESS TRACK JACKET',
    category: 'JACKETS',
    price: 2999,
    shortDescription: 'Stand-collar track jacket with geometric nylon paneling.',
    description: 'Inspired by retro Indian athletic training kits of the 1990s, sharpened with modern monochrome minimalism.',
    fit: 'Retro Boxy Track Fit',
    material: 'Polyester Tricot with Micro-Mesh Lining',
    care: 'Machine wash cold.',
    shipping: 'Free delivery above ₹2,499.',
    colors: [{ name: 'Black / Silver Grey', hex: '#1D1E20' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ================= ACCESSORIES (7 Items) =================
  {
    id: 'kld-acc-01',
    name: 'CORE EMBROIDERED CAP',
    category: 'ACCESSORIES',
    price: 999,
    compareAtPrice: 1299,
    tag: 'BESTSELLER',
    shortDescription: 'Unstructured 6-panel low profile cotton cap with metal buckle strap.',
    description: 'Constructed from heavy brushed cotton with high-density embroidered KAALD logo on front crown and "BORN IN MOTION" above the rear arch.',
    fit: 'Adjustable One Size',
    material: '100% Heavy Brushed Cotton Chino',
    care: 'Spot clean with damp cloth.',
    shipping: 'Ships within 24 hours.',
    colors: [
      { name: 'Washed Black', hex: '#1A1A1B' },
      { name: 'Raw Sand', hex: '#CDC8BE' }
    ],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-acc-02',
    name: 'METROPOLIS CROSSBODY SLING',
    category: 'ACCESSORIES',
    price: 1499,
    tag: 'NEW',
    shortDescription: 'Water-resistant Cordura nylon sling with quick-release magnetic Fidlock buckle.',
    description: 'Compact urban chest pack with separate padded tablet compartment, quick-access key clip, and concealed RFID-blocking rear passport pocket.',
    fit: 'Adjustable Ergonomic Strap',
    material: '1000D Cordura Nylon & Matte Metal Buckle',
    care: 'Wipe clean.',
    shipping: 'Free delivery on qualifying orders.',
    colors: [{ name: 'Stealth Black', hex: '#131415' }],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-acc-03',
    name: 'TECHNICAL WEBBING BELT',
    category: 'ACCESSORIES',
    price: 899,
    shortDescription: 'Heavy-duty military-grade nylon belt with quick-release alloy buckle.',
    description: 'Subtle laser-etched coordinates on the anodized matte buckle. Cut-to-fit length with heat-sealed tip.',
    fit: 'Cut to Fit (Up to 44" Waist)',
    material: 'High-Tensile Nylon Webbing & Zinc Alloy',
    care: 'Wipe clean.',
    shipping: 'Dispatched in 24 hours.',
    colors: [{ name: 'Matte Black', hex: '#101011' }],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-acc-04',
    name: 'DUAL CUSHION CREW SOCKS (PACK OF 2)',
    category: 'ACCESSORIES',
    price: 599,
    shortDescription: 'Cushioned French terry footbed with jacquard typography on rear calf.',
    description: 'Engineered arch compression band prevents slipping inside high-top sneakers. Breathable mesh top.',
    fit: 'Crew Length (Fits UK 7-11)',
    material: '80% Combed Cotton, 17% Polyamide, 3% Elastane',
    care: 'Machine wash warm.',
    shipping: 'Dispatched in 24 hours.',
    colors: [{ name: 'Black & Off-White Pack', hex: '#1C1C1D' }],
    sizes: ['ONE SIZE (UK 7-11)'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-acc-05',
    name: 'REFLECTIVE HEAVY CANVAS TOTE',
    category: 'ACCESSORIES',
    price: 1299,
    shortDescription: '20L reinforced duck canvas tote with 3M reflective typographic print.',
    description: 'Double-layered shoulder handles and an interior zippered valuables pocket. Carries up to a 16" laptop comfortably.',
    fit: '20 Liters Capacity',
    material: '450 GSM Raw Indian Canvas',
    care: 'Spot clean only.',
    shipping: 'Free delivery above ₹2,499.',
    colors: [{ name: 'Tar Black', hex: '#121213' }],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-acc-06',
    name: 'TACTICAL KEY CARABINER LEASH',
    category: 'ACCESSORIES',
    price: 699,
    shortDescription: 'Anodized aluminum locking carabiner with woven technical jacquard strap.',
    description: 'Fastens securely to belt loops or cargo straps for swift key and badge access.',
    fit: 'Standard 18cm Length',
    material: 'Aluminum & Jacquard Woven Poly',
    care: 'No special care required.',
    shipping: 'Ships in 24 hours.',
    colors: [{ name: 'Gunmetal Silver / Black', hex: '#2A2B2D' }],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-acc-07',
    name: 'NOCTURNE RIBBED BEANIE',
    category: 'ACCESSORIES',
    price: 899,
    shortDescription: 'Tight 2x2 gauge rib knit with folded cuff and rubberized logo patch.',
    description: 'Soft itch-free acrylic-wool blend with snug low-profile fit.',
    fit: 'Fitted Skull Cap Silhouette',
    material: '50% Merino Wool, 50% Anti-Pilling Acrylic',
    care: 'Hand wash cold.',
    shipping: 'Dispatched within 24 hours.',
    colors: [{ name: 'Pitch Black', hex: '#0F0F10' }],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ================= FOOTWEAR (3 Items) =================
  {
    id: 'kld-footwear-01',
    name: 'K-MOVE CHUNKY SNEAKERS',
    category: 'FOOTWEAR',
    price: 3999,
    compareAtPrice: 5499,
    tag: 'DROP 01',
    shortDescription: 'Sculpted EVA midsole with tumbled leather and ballistic mesh uppers.',
    description: 'The foundation of the KAALD street stride. Engineered in collaboration with specialized footwear craftsmen, featuring an aggressive tread design inspired by tire tread geometries and high-rebound cushioning for all-day urban exploration.',
    fit: 'True to Size (Size up if between sizes)',
    material: 'Tumbled Indian Nappa Leather, Cordura Mesh, Vibram-Grade Rubber Outsole',
    care: 'Clean with specialized sneaker foam cleaner. Dry naturally.',
    shipping: 'Complimentary premium insured shipping in special presentation box.',
    colors: [
      { name: 'Monochrome Carbon', hex: '#18191A' },
      { name: 'Concrete & Chalk', hex: '#D7D5CF' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'kld-footwear-02',
    name: 'VORTEX LOW-TOP TRAINERS',
    category: 'FOOTWEAR',
    price: 3499,
    tag: 'NEW',
    shortDescription: 'Deconstructed low-top silhouette with waxed cotton laces.',
    description: 'Clean architectural lines with vulcanized gum rubber sole and padded collar. Understated branding for everyday versatility.',
    fit: 'Standard Fit',
    material: 'Heavy Duck Canvas & Vulcanized Gum Rubber',
    care: 'Spot clean only.',
    shipping: 'Free express shipping across India.',
    colors: [{ name: 'Washed Black Canvas', hex: '#1C1D1E' }],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'kld-footwear-03',
    name: 'TERRAIN TACTICAL RUNNER',
    category: 'FOOTWEAR',
    price: 4299,
    tag: 'LIMITED',
    shortDescription: 'GORE-TEX equivalent waterproof lining with speed-lacing cord system.',
    description: 'Trail-running performance married to ruthless street aesthetics. Lugged deep rubber sole grips wet asphalt and gravel effortlessly.',
    fit: 'Snug Athletic Fit',
    material: 'Ripstop Synthetic, TPU Welded Overlays, Lugged Rubber',
    care: 'Rinse off mud under cold tap. Air dry.',
    shipping: 'Free express delivery.',
    colors: [{ name: 'Triple Pitch Black', hex: '#0B0B0C' }],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];
