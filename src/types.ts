export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  category?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  loginType: 'google' | 'standard';
  avatar?: string;
}
