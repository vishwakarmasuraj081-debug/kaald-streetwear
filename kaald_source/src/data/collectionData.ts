import pantsBlackImg from '../assets/images/pants_black_1789119087466.jpg';
import pantsCharcoalImg from '../assets/images/pants_charcoal_1789119105055.jpg';
import pantsStoneImg from '../assets/images/pants_stone_1789119123652.jpg';
import shirtBlackImg from '../assets/images/shirt_black_1789119141186.jpg';
import shirtBoneImg from '../assets/images/shirt_bone_1789119158855.jpg';
import jacketDarkImg from '../assets/images/jacket_dark_1789119174160.jpg';

export interface ProductColor {
  id: string;
  name: string;
  label: string;
  hex: string;
  image: string;
}

export interface CollectionItem {
  id: string;
  categoryNumber: string;
  categoryName: string;
  subheading: string;
  title: string;
  price: string;
  numericPrice: number;
  highlightBadges: string[];
  description: string;
  specs: { label: string; value: string }[];
  detailLabels?: string[];
  colors: ProductColor[];
}

export const PANTS_PRODUCT: CollectionItem = {
  id: 'utility-pant',
  categoryNumber: '01',
  categoryName: 'PANTS',
  subheading: 'THREE COLORS. ONE SILHOUETTE.',
  title: 'UTILITY PANT',
  price: '₹2,999',
  numericPrice: 2999,
  highlightBadges: ['RELAXED FIT', 'HEAVYWEIGHT COTTON', 'UTILITY POCKETS'],
  description:
    'Engineered with a relaxed wide-leg profile and architectural knee seam articulation. Cut from high-density 420 GSM combed cotton twill, featuring low-profile magnetic cargo utility pockets, deep side hand pockets, and custom tonal stitching throughout.',
  specs: [
    { label: 'FABRIC', value: '420 GSM Heavyweight Combed Cotton Twill' },
    { label: 'FIT', value: 'Relaxed Wide-Leg with Subtle Lower Taper' },
    { label: 'STORAGE', value: 'Dual Angular Cargo Pockets + Coin Welt' },
    { label: 'WAISTBAND', value: 'Reinforced Webbed Drawstring & Belt Loops' },
    { label: 'ORIGIN', value: 'Cut & Sewn in Mumbai, India' },
  ],
  colors: [
    {
      id: 'black',
      name: 'BLACK',
      label: '01 / BLACK',
      hex: '#141414',
      image: pantsBlackImg,
    },
    {
      id: 'charcoal',
      name: 'CHARCOAL',
      label: '02 / CHARCOAL',
      hex: '#373739',
      image: pantsCharcoalImg,
    },
    {
      id: 'stone',
      name: 'STONE',
      label: '03 / STONE',
      hex: '#D1CDC5',
      image: pantsStoneImg,
    },
  ],
};

export const SHIRT_PRODUCT: CollectionItem = {
  id: 'signature-oversized-shirt',
  categoryNumber: '02',
  categoryName: 'SHIRTS',
  subheading: 'THE EVERYDAY ESSENTIAL.',
  title: 'SIGNATURE OVERSIZED SHIRT',
  price: '₹1,999',
  numericPrice: 1999,
  highlightBadges: ['HEAVYWEIGHT FABRIC', 'OVERSIZED FIT', 'ORIGINAL KAALD GRAPHIC'],
  description:
    'The foundation of daily motion. Built from custom 280 GSM compact cotton jersey with a structured hand feel that drapes cleanly without clinging. Features dropped shoulder seams, elongated sleeves, and a reinforced 1.25" ribbed collar.',
  specs: [
    { label: 'FABRIC', value: '280 GSM Compact Organic Cotton Jersey' },
    { label: 'FIT', value: 'Boxy Drop-Shoulder Relaxed Silhouette' },
    { label: 'COLLAR', value: 'High-Density 1.25" Bound Ribbed Neckband' },
    { label: 'GRAPHIC', value: 'Tonal Micro-Silkscreen KAALD Motif' },
    { label: 'ORIGIN', value: 'Loomed & Assembled in Tirupur / Mumbai' },
  ],
  colors: [
    {
      id: 'black',
      name: 'BLACK',
      label: '01 / BLACK',
      hex: '#151515',
      image: shirtBlackImg,
    },
    {
      id: 'bone',
      name: 'BONE',
      label: '02 / BONE',
      hex: '#E0DDD6',
      image: shirtBoneImg,
    },
  ],
};

export const JACKET_PRODUCT: CollectionItem = {
  id: 'discipline-jacket',
  categoryNumber: '03',
  categoryName: 'JACKET',
  subheading: 'BUILT FOR AFTER DARK.',
  title: 'DISCIPLINE JACKET',
  price: '₹3,499',
  numericPrice: 3499,
  highlightBadges: [
    'UTILITY CONSTRUCTION',
    'PREMIUM TECHNICAL FABRIC',
    'RELAXED FIT',
  ],
  detailLabels: ['01 / COLLAR', '02 / UTILITY POCKET', '03 / HARDWARE'],
  description:
    'A tactical outerwear piece engineered for night climates and urban navigation. Constructed from weather-resistant matte technical nylon blend with taped two-way industrial front zips, an articulated stand collar, and interior utility holster compartments.',
  specs: [
    { label: 'SHELL', value: 'Water-Resistant Technical Micro-Faille (65% Nylon, 35% Cotton)' },
    { label: 'HARDWARE', value: 'Matte Gunmetal YKK Two-Way Reverse Coil Zippers' },
    { label: 'COLLAR', value: 'Ergonomic Stand Collar with Storm Guard' },
    { label: 'STORAGE', value: 'Triple Modular Chest & Waist Flap Utility Pockets' },
    { label: 'ORIGIN', value: 'Handcrafted in Mumbai, India' },
  ],
  colors: [
    {
      id: 'black-charcoal',
      name: 'BLACK / DARK CHARCOAL',
      label: '01 / DARK CHARCOAL',
      hex: '#1E1E20',
      image: jacketDarkImg,
    },
  ],
};

export const ALL_COLLECTION_ITEMS: CollectionItem[] = [
  PANTS_PRODUCT,
  SHIRT_PRODUCT,
  JACKET_PRODUCT,
];
