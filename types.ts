export enum ProductCategory {
  SIGNATURE = 'Signature Tea',
  MILK_TEA = 'Milk Tea',
  FRUIT_TEA = 'Fruit Tea',
  COFFEE = 'Coffee',
  DESSERT = 'Dessert'
}

export enum SugarLevel {
  ZERO = '0%',
  SLIGHT = '30%',
  HALF = '50%',
  LESS = '70%',
  REGULAR = '100%'
}

export enum IceLevel {
  HOT = 'Hot',
  NO_ICE = 'No Ice',
  LESS_ICE = 'Less Ice',
  REGULAR_ICE = 'Regular Ice',
  EXTRA_ICE = 'Extra Ice'
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface FlavorProfile {
  attribute: string;
  value: number; // 0-100
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isDrink: boolean;
  calories: number;
  flavorProfile?: FlavorProfile[];
}

export interface CartItem {
  id: string; // Unique cart item ID
  product: Product;
  sugar?: SugarLevel;
  ice?: IceLevel;
  toppings: Topping[];
  quantity: number;
  totalPrice: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
