export type ProductCategory =
  | 'ALL'
  | 'T-SHIRTS'
  | 'SHIRTS'
  | 'PANTS'
  | 'JACKETS'
  | 'HOODIES'
  | 'ACCESSORIES';

export type ProductFit =
  | 'REGULAR FIT'
  | 'RELAXED FIT'
  | 'OVERSIZED FIT'
  | 'BOX FIT'
  | 'STRAIGHT FIT'
  | 'WIDE FIT';

export interface ProductColor {
  id?: string;
  name: string;
  label?: string;
  hex: string;
  image?: string;
}

export interface ProductHotspot {
  id: string;
  title: string;
  tagline: string;
  description: string;
  position: [number, number, number]; // 3D coordinates
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: ProductCategory;
  collection?: 'DROP 01' | 'ESSENTIALS' | 'UTILITY' | 'AFTER DARK' | 'MONOCHROME';
  price: number;
  compareAtPrice?: number;
  tag?: 'DROP 01' | 'LIMITED' | 'BESTSELLER' | 'ICONIC' | 'NEW';
  isNew?: boolean;
  featured?: boolean;
  shortDescription: string;
  description: string;
  gsm?: number;
  fit: string;
  fitType?: ProductFit;
  material?: string;
  fabric?: string;
  details?: string[];
  care: string;
  shipping: string;
  returns?: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  model3dAvailable?: boolean;
  hotspots?: ProductHotspot[];
}

export interface CartItem {
  id: string; // composite key: `${productId}-${color}-${size}`
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: {
    heading?: string;
    paragraphs: string[];
    quote?: string;
    image?: string;
  }[];
}

export interface OrderItem {
  id: string;
  productName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Dispatched' | 'Delivered';
  items: OrderItem[];
  trackingNumber: string;
}
