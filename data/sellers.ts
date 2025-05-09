// Dummy data for sellers
export const sellers = [
  {
    id: 'seller1',
    name: 'Ahmed Farms',
    email: 'ahmed@farms.com',
    phone: '+1 (555) 123-4567',
    image: 'https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Family-owned farm with over 20 years of experience growing the freshest organic fruits. We specialize in apples, oranges, and seasonal berries.',
    rating: 4.8,
    location: 'Green Valley, CA',
    coverImage: 'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    joinedDate: 'March 2021'
  },
  {
    id: 'seller2',
    name: 'Tropical Delights',
    email: 'info@tropicaldelights.com',
    phone: '+1 (555) 987-6543',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Specializing in exotic and tropical fruits from around the world. We source directly from sustainable farms to bring you the best quality.',
    rating: 4.7,
    location: 'Miami, FL',
    coverImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    joinedDate: 'June 2022'
  },
  {
    id: 'seller3',
    name: 'Berry Good Farms',
    email: 'contact@berrygood.com',
    phone: '+1 (555) 234-5678',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Dedicated to growing the juiciest, sweetest berries using sustainable farming practices. Our berry varieties are selected for their exceptional flavor and nutritional value.',
    rating: 4.9,
    location: 'Portland, OR',
    coverImage: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    joinedDate: 'January 2020'
  },
  {
    id: 'seller4',
    name: 'Fresh & Organic Co.',
    email: 'hello@freshorganic.com',
    phone: '+1 (555) 345-6789',
    image: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'We believe in 100% organic farming practices. Our fruits are grown without synthetic pesticides or fertilizers, ensuring you get the cleanest, healthiest options for your family.',
    rating: 4.6,
    location: 'Boulder, CO',
    coverImage: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    joinedDate: 'April 2021'
  }
];

// Helper function to get a seller by ID
export const getSellerById = (id: string) => {
  return sellers.find(seller => seller.id === id);
};

// Helper function to get all products by a specific seller
export const getProductsBySeller = (sellerId: string, products: any[]) => {
  return products.filter(product => product.sellerId === sellerId);
};