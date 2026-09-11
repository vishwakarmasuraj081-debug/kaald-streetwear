export interface CollectionMeta {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  itemsCount: number;
}

export const COLLECTIONS_DATA: CollectionMeta[] = [
  {
    id: 'drop-01',
    name: 'DROP 01',
    subtitle: 'BORN IN MOTION',
    description: 'The foundational launch. Architectural oversized hoodies, heavy cotton cargos, and modular technical shells.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1400&auto=format&fit=crop',
    badge: 'CURRENT CAMPAIGN',
    itemsCount: 14,
  },
  {
    id: 'essentials',
    name: 'ESSENTIALS',
    subtitle: 'EVERYDAY UNIFORM',
    description: 'Structured 280 GSM compact cotton tees and heavy fleece sweats calibrated for relentless daily wear.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1400&auto=format&fit=crop',
    badge: 'CORE LINE',
    itemsCount: 18,
  },
  {
    id: 'utility',
    name: 'UTILITY',
    subtitle: 'FUNCTION × FORM',
    description: 'Ergonomic articulated seams, magnetic closures, and water-repellent micro-faille outerwear.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1400&auto=format&fit=crop',
    badge: 'TECHNICAL',
    itemsCount: 9,
  },
  {
    id: 'after-dark',
    name: 'AFTER DARK',
    subtitle: 'CITY AFTER HOURS',
    description: 'Pitch black mineral-washed garments with tonal reflective detailing engineered for urban night navigation.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1400&auto=format&fit=crop',
    badge: 'NIGHT RUN',
    itemsCount: 11,
  },
  {
    id: 'monochrome',
    name: 'MONOCHROME',
    subtitle: 'BLACK / BONE / GREY',
    description: 'Strict achromatic discipline. Eliminating visual noise to highlight premium texture, silhouette, and drape.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
    badge: 'LIMITED PALETTE',
    itemsCount: 12,
  },
];

export interface ModelCampaignData {
  id: string;
  modelCode: string;
  title: string;
  garment: string;
  quote: string;
  specs: string;
  image: string;
  productId: string;
}

export const FOUR_MODELS_DATA: ModelCampaignData[] = [
  {
    id: 'model-01',
    modelCode: 'MODEL 01 / ARJUN',
    title: 'THE ARCHITECTURAL HOODIE',
    garment: 'Motion Hoodie (480 GSM) in Washed Charcoal',
    quote: 'Structured weight creates an aura of calm in chaotic metropolitan motion.',
    specs: 'Double-pre-shrunk Indian loopback terry / Deep kangaroo utility pocket',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
    productId: 'kld-hoodie-01',
  },
  {
    id: 'model-02',
    modelCode: 'MODEL 02 / RHEA',
    title: 'THE HEAVYWEIGHT TEE',
    garment: 'Signature Oversized Shirt (280 GSM) in Bone',
    quote: 'Drape is everything. It holds its own structure and moves cleanly with you.',
    specs: 'Compact organic cotton / 1.25" bound rib collar / Drop-shoulder',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    productId: 'kld-shirt-hero',
  },
  {
    id: 'model-03',
    modelCode: 'MODEL 03 / KABIR',
    title: 'THE UTILITY JACKET',
    garment: 'Discipline Jacket in Dark Charcoal',
    quote: 'Engineered for night air, rain bursts, and continuous navigation across Mumbai and Delhi.',
    specs: 'Two-way gunmetal zips / Articulated storm stand collar / Triple pockets',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
    productId: 'kld-jacket-hero',
  },
  {
    id: 'model-04',
    modelCode: 'MODEL 04 / TARA',
    title: 'THE COMPLETE UNIFORM',
    garment: 'Utility Relaxed Pant in Black + Box Fit Top',
    quote: 'Everyday armor. Functional storage without unsightly bulk.',
    specs: '420 GSM cotton twill / Low-profile magnetic cargo compartments',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    productId: 'kld-pant-hero',
  },
];

export interface ShopTheLookItem {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  size: string;
  image: string;
}

export const SHOP_THE_LOOK_DATA = {
  title: 'THE COMPLETE URBAN UNIFORM',
  subtitle: 'DROP 01 — LOOK 04',
  description: 'A cohesive three-piece ensemble calibrated for form, temperature adaptation, and ease of physical motion.',
  lookImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1400&auto=format&fit=crop',
  items: [
    {
      id: 'kld-jacket-hero',
      name: 'DISCIPLINE UTILITY JACKET',
      category: 'JACKETS',
      price: 3499,
      color: 'DARK CHARCOAL',
      size: 'L',
    },
    {
      id: 'kld-shirt-hero',
      name: 'SIGNATURE OVERSIZED SHIRT',
      category: 'SHIRTS',
      price: 1999,
      color: 'BONE',
      size: 'XL',
    },
    {
      id: 'kld-pant-hero',
      name: 'KAALD UTILITY RELAXED PANT',
      category: 'PANTS',
      price: 2999,
      color: 'BLACK',
      size: 'M',
    },
  ],
};

export const CATEGORIES_DATA = [
  {
    id: 'T-SHIRTS',
    name: 'T-SHIRTS',
    tag: '280 GSM',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'SHIRTS',
    name: 'SHIRTS',
    tag: 'OVERSIZED',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'PANTS',
    name: 'PANTS',
    tag: '420 GSM TWILL',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'JACKETS',
    name: 'JACKETS',
    tag: 'WEATHER-RESISTANT',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'HOODIES',
    name: 'HOODIES',
    tag: '480-500 GSM',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'ACCESSORIES',
    name: 'ACCESSORIES',
    tag: 'HARDWARE',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
  },
];
