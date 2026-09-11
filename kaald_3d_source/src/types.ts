export type ProductCategory = 
  | 'ALL'
  | 'T-SHIRTS'
  | 'HOODIES'
  | 'CARGOS'
  | 'JACKETS'
  | 'ACCESSORIES'
  | 'FOOTWEAR';

export interface ProductColor {
  name: string;
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
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  tag?: 'DROP 01' | 'LIMITED' | 'BESTSELLER' | 'ICONIC' | 'NEW';
  description: string;
  shortDescription: string;
  gsm?: number;
  fit: string;
  material: string;
  care: string;
  shipping: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  model3dAvailable?: boolean;
  hotspots?: ProductHotspot[];
  featured?: boolean;
}

export interface CartItem {
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
