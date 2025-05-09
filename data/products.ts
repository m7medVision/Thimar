// Dummy data for products
export const allProducts = [
  {
    id: 'fruit1',
    name: 'Fresh Apples',
    description: 'Crisp and sweet red apples, perfect for snacking or baking. These locally-grown apples are harvested at peak ripeness to ensure the best flavor and texture. Each apple is carefully selected for quality and freshness.',
    price: 2.49,
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat1',
    sellerId: 'seller1', // Ahmed Farms
    rating: 4.7,
    isOrganic: true,
    minQuantity: 2,
    nutrition: [
      { name: 'Calories', value: '52 kcal' },
      { name: 'Fiber', value: '2.4g' },
      { name: 'Vitamin C', value: '8%' },
      { name: 'Potassium', value: '107mg' },
      { name: 'Sugar', value: '10.4g' },
      { name: 'Carbs', value: '14g' },
    ]
  },
  {
    id: 'fruit2',
    name: 'Ripe Bananas',
    description: 'Sweet, yellow bananas perfect for breakfast or a quick energy boost. Each bunch is selected at the optimal ripeness to ensure they\'re ready to eat when they arrive at your doorstep. Rich in potassium and essential vitamins.',
    price: 1.99,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat1',
    sellerId: 'seller4', // Fresh & Organic Co.
    rating: 4.5,
    isOrganic: false,
    minQuantity: 3,
    nutrition: [
      { name: 'Calories', value: '89 kcal' },
      { name: 'Fiber', value: '2.6g' },
      { name: 'Vitamin C', value: '10%' },
      { name: 'Potassium', value: '358mg' },
      { name: 'Sugar', value: '12g' },
      { name: 'Carbs', value: '23g' },
    ]
  },
  {
    id: 'fruit3',
    name: 'Juicy Oranges',
    description: 'Sweet and tangy oranges packed with vitamin C. These bright, juicy oranges are hand-picked from local orchards and delivered fresh to your door. They\'re perfect for juicing, adding to salads, or enjoying as a refreshing snack.',
    price: 3.49,
    image: 'https://images.pexels.com/photos/42059/citrus-diet-food-fresh-42059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat1',
    sellerId: 'seller1', // Ahmed Farms
    rating: 4.8,
    isOrganic: true,
    isSeasonal: true,
    minQuantity: 3,
    nutrition: [
      { name: 'Calories', value: '47 kcal' },
      { name: 'Fiber', value: '2.4g' },
      { name: 'Vitamin C', value: '89%' },
      { name: 'Potassium', value: '181mg' },
      { name: 'Sugar', value: '9.4g' },
      { name: 'Carbs', value: '12g' },
    ]
  },
  {
    id: 'fruit4',
    name: 'Ripe Strawberries',
    description: 'Vibrant red strawberries that are sweet and succulent. These juicy, plump strawberries are carefully selected for their bright red color, sweet aroma, and delectable taste. Perfect for desserts, smoothies, or eating fresh.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat2',
    sellerId: 'seller3', // Berry Good Farms
    rating: 4.9,
    isOrganic: true,
    isSeasonal: true,
    minQuantity: 1,
    nutrition: [
      { name: 'Calories', value: '32 kcal' },
      { name: 'Fiber', value: '2g' },
      { name: 'Vitamin C', value: '98%' },
      { name: 'Potassium', value: '153mg' },
      { name: 'Sugar', value: '4.9g' },
      { name: 'Carbs', value: '7.7g' },
    ]
  },
  {
    id: 'fruit5',
    name: 'Fresh Blueberries',
    description: 'Plump and sweet blueberries rich in antioxidants. These small but mighty berries pack a powerful nutritional punch and deliver a burst of sweet-tart flavor in every bite. Our blueberries are harvested at peak ripeness for maximum flavor and nutritional value.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/53961/blueberries-fruit-berries-blue-53961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat2',
    sellerId: 'seller3', // Berry Good Farms
    rating: 4.7,
    isOrganic: true,
    minQuantity: 1,
    nutrition: [
      { name: 'Calories', value: '57 kcal' },
      { name: 'Fiber', value: '2.4g' },
      { name: 'Vitamin C', value: '24%' },
      { name: 'Potassium', value: '77mg' },
      { name: 'Sugar', value: '10g' },
      { name: 'Carbs', value: '14.5g' },
    ]
  },
  {
    id: 'fruit6',
    name: 'Sweet Grapes',
    description: 'Plump, sweet grapes perfect for snacking. These seedless grapes are juicy and bursting with natural sweetness. Each bunch is hand-selected for quality and freshness, ensuring you receive only the best. Great for snacking, adding to fruit salads, or freezing for a refreshing treat.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat2',
    sellerId: 'seller4', // Fresh & Organic Co.
    rating: 4.5,
    isOrganic: false,
    minQuantity: 2,
    nutrition: [
      { name: 'Calories', value: '69 kcal' },
      { name: 'Fiber', value: '0.9g' },
      { name: 'Vitamin C', value: '18%' },
      { name: 'Potassium', value: '191mg' },
      { name: 'Sugar', value: '15g' },
      { name: 'Carbs', value: '18g' },
    ]
  },
  {
    id: 'fruit7',
    name: 'Fresh Avocados',
    description: 'Creamy avocados perfect for guacamole or toast. Our avocados are sourced from sustainable farms and delivered at the perfect stage of ripeness. They\'re rich in healthy fats, fiber, and various essential nutrients, making them both delicious and nutritious.',
    price: 6.99,
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat3',
    sellerId: 'seller4', // Fresh & Organic Co.
    rating: 4.8,
    isOrganic: true,
    minQuantity: 3,
    nutrition: [
      { name: 'Calories', value: '160 kcal' },
      { name: 'Fiber', value: '6.7g' },
      { name: 'Vitamin C', value: '10%' },
      { name: 'Potassium', value: '485mg' },
      { name: 'Sugar', value: '0.7g' },
      { name: 'Carbs', value: '8.5g' },
    ]
  },
  {
    id: 'fruit8',
    name: 'Ripe Mangoes',
    description: 'Sweet, tropical mangoes with vibrant flavor. These aromatic, juicy mangoes are a true tropical delight. Each mango is selected for its perfect balance of sweetness and tanginess, ensuring an explosion of flavor with every bite. Perfect for smoothies, desserts, or eating fresh.',
    price: 2.99,
    image: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat3',
    sellerId: 'seller2', // Tropical Delights
    rating: 4.9,
    isOrganic: false,
    isSeasonal: true,
    minQuantity: 2,
    nutrition: [
      { name: 'Calories', value: '99 kcal' },
      { name: 'Fiber', value: '2.6g' },
      { name: 'Vitamin C', value: '67%' },
      { name: 'Potassium', value: '257mg' },
      { name: 'Sugar', value: '22.5g' },
      { name: 'Carbs', value: '24.7g' },
    ]
  },
  {
    id: 'fruit9',
    name: 'Fresh Pineapple',
    description: 'Sweet and tangy pineapple, freshly cut. Our pineapples are harvested at peak ripeness, ensuring the perfect balance of sweetness and acidity. Each pineapple is hand-selected for its aroma, color, and quality. Ready to eat, with no need for additional preparation.',
    price: 4.49,
    image: 'https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat3',
    sellerId: 'seller2', // Tropical Delights
    rating: 4.6,
    isOrganic: true,
    minQuantity: 1,
    nutrition: [
      { name: 'Calories', value: '82 kcal' },
      { name: 'Fiber', value: '2.3g' },
      { name: 'Vitamin C', value: '131%' },
      { name: 'Potassium', value: '180mg' },
      { name: 'Sugar', value: '16g' },
      { name: 'Carbs', value: '21.6g' },
    ]
  },
  {
    id: 'fruit10',
    name: 'Sweet Watermelon',
    description: 'Juicy, refreshing watermelon, perfect for hot days. Our watermelons are naturally sweet and incredibly hydrating, with bright red flesh and minimal seeds. Each melon is hand-selected for ripeness, ensuring maximum sweetness and juiciness. A perfect summer treat!',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat4',
    sellerId: 'seller2', // Tropical Delights
    rating: 4.7,
    isOrganic: false,
    isSeasonal: true,
    minQuantity: 3,
    nutrition: [
      { name: 'Calories', value: '30 kcal' },
      { name: 'Fiber', value: '0.4g' },
      { name: 'Vitamin C', value: '25%' },
      { name: 'Potassium', value: '112mg' },
      { name: 'Sugar', value: '6.2g' },
      { name: 'Carbs', value: '7.6g' },
    ]
  },
  {
    id: 'fruit11',
    name: 'Ripe Kiwi',
    description: 'Tangy-sweet kiwi fruits loaded with vitamin C. These vibrant green kiwis have a unique sweet-tart flavor and a pleasant, slightly crunchy texture from the tiny black seeds. Each kiwi is carefully selected for ripeness and quality. Packed with nutrients and ready to enjoy.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/51312/kiwi-fruit-vitamins-healthy-eating-51312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat4',
    sellerId: 'seller2', // Tropical Delights
    rating: 4.5,
    isOrganic: true,
    minQuantity: 5,
    nutrition: [
      { name: 'Calories', value: '42 kcal' },
      { name: 'Fiber', value: '2.1g' },
      { name: 'Vitamin C', value: '64%' },
      { name: 'Potassium', value: '215mg' },
      { name: 'Sugar', value: '6.2g' },
      { name: 'Carbs', value: '10.1g' },
    ]
  },
  {
    id: 'fruit12',
    name: 'Fresh Cherries',
    description: 'Sweet, plump cherries with deep red color. Our cherries are carefully hand-picked at peak ripeness for maximum sweetness and flavor. Each cherry boasts a perfect balance of sweet and tart notes, with firm, juicy flesh and smooth skin. A seasonal treat you won\'t want to miss!',
    price: 7.99,
    image: 'https://images.pexels.com/photos/109274/pexels-photo-109274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categoryId: 'cat2',
    sellerId: 'seller3', // Berry Good Farms
    rating: 4.8,
    isOrganic: false,
    isSeasonal: true,
    minQuantity: 1,
    nutrition: [
      { name: 'Calories', value: '50 kcal' },
      { name: 'Fiber', value: '1.6g' },
      { name: 'Vitamin C', value: '7%' },
      { name: 'Potassium', value: '173mg' },
      { name: 'Sugar', value: '8g' },
      { name: 'Carbs', value: '12g' },
    ]
  }
];

export const featuredProducts = [
  allProducts[0],  // Apples
  allProducts[2],  // Oranges
  allProducts[6],  // Avocados
  allProducts[7],  // Mangoes
  allProducts[9],  // Watermelon
  allProducts[11], // Cherries
];

export const seasonalProducts = [
  allProducts[2],  // Oranges
  allProducts[3],  // Strawberries
  allProducts[7],  // Mangoes
  allProducts[9],  // Watermelon
  allProducts[11], // Cherries
];