import { IceLevel, Product, ProductCategory, SugarLevel, Topping } from "./types";

export const TOPPINGS: Topping[] = [
  { id: 'boba', name: 'Honey Boba', price: 0.5 },
  { id: 'pudding', name: 'Egg Pudding', price: 0.75 },
  { id: 'jelly', name: 'Coconut Jelly', price: 0.5 },
  { id: 'aloe', name: 'Aloe Vera', price: 0.6 },
  { id: 'foam', name: 'Cheese Foam', price: 1.0 },
];

export const SUGAR_OPTIONS = Object.values(SugarLevel);
export const ICE_OPTIONS = Object.values(IceLevel);

export const MENU_ITEMS: Product[] = [
  {
    id: '1',
    name: 'Golden Oolong Milk Tea',
    description: 'Premium roasted oolong tea blended with fresh milk.',
    price: 5.50,
    category: ProductCategory.MILK_TEA,
    image: 'https://picsum.photos/400/400?random=1',
    isDrink: true,
    calories: 280,
    flavorProfile: [
      { attribute: 'Sweetness', value: 60 },
      { attribute: 'Aroma', value: 90 },
      { attribute: 'Creaminess', value: 70 },
      { attribute: 'Bitterness', value: 30 },
    ]
  },
  {
    id: '2',
    name: 'Brown Sugar Boba Latte',
    description: 'Fresh milk with slow-cooked brown sugar pearls. Caffeine-free option available.',
    price: 6.25,
    category: ProductCategory.SIGNATURE,
    image: 'https://picsum.photos/400/400?random=2',
    isDrink: true,
    calories: 450,
    flavorProfile: [
      { attribute: 'Sweetness', value: 90 },
      { attribute: 'Aroma', value: 50 },
      { attribute: 'Creaminess', value: 85 },
      { attribute: 'Chewiness', value: 100 },
    ]
  },
  {
    id: '3',
    name: 'Passion Fruit Green Tea',
    description: 'Refreshing jasmine green tea with real passion fruit seeds.',
    price: 5.75,
    category: ProductCategory.FRUIT_TEA,
    image: 'https://picsum.photos/400/400?random=3',
    isDrink: true,
    calories: 220,
    flavorProfile: [
      { attribute: 'Sweetness', value: 50 },
      { attribute: 'Sourness', value: 80 },
      { attribute: 'Aroma', value: 70 },
      { attribute: 'Freshness', value: 90 },
    ]
  },
  {
    id: '4',
    name: 'Signature Cold Brew',
    description: 'Steeped for 18 hours for a smooth, rich flavor profile.',
    price: 4.50,
    category: ProductCategory.COFFEE,
    image: 'https://picsum.photos/400/400?random=4',
    isDrink: true,
    calories: 10,
    flavorProfile: [
      { attribute: 'Sweetness', value: 10 },
      { attribute: 'Acidity', value: 30 },
      { attribute: 'Aroma', value: 85 },
      { attribute: 'Bitterness', value: 60 },
    ]
  },
  {
    id: '5',
    name: 'Matcha Crepe Cake',
    description: 'Twenty layers of delicate handmade crepes with premium matcha cream.',
    price: 7.95,
    category: ProductCategory.DESSERT,
    image: 'https://picsum.photos/400/400?random=5',
    isDrink: false,
    calories: 380,
    flavorProfile: [
      { attribute: 'Sweetness', value: 50 },
      { attribute: 'Creaminess', value: 80 },
      { attribute: 'Texture', value: 90 },
      { attribute: 'Bitterness', value: 20 },
    ]
  },
  {
    id: '6',
    name: 'Strawberry Cheese Foam Slush',
    description: 'Icy strawberry blend topped with savory house-made cheese foam.',
    price: 6.75,
    category: ProductCategory.FRUIT_TEA,
    image: 'https://picsum.photos/400/400?random=6',
    isDrink: true,
    calories: 420,
    flavorProfile: [
      { attribute: 'Sweetness', value: 80 },
      { attribute: 'Sourness', value: 40 },
      { attribute: 'Saltiness', value: 30 },
      { attribute: 'Coldness', value: 100 },
    ]
  }
];
