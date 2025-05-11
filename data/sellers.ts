// Dummy data for sellers
export const sellers = [
  {
    id: 'seller1',
    name: 'مزارع الباطنة',
    email: 'albatinah@farms.com',
    phone: '+968 9123 4567',
    image: 'https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'مزرعة عمانية تقليدية متخصصة في زراعة التمور بأنواعها المختلفة من الباطنة.',
    rating: 4.8,
    location: 'ولاية صحار، سلطنة عمان',
    coverImage: 'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    joinedDate: 'مارس 2021'
  },
  {
    id: 'seller2',
    name: 'واحة نزوى',
    email: 'nizwa@oasis.com',
    phone: '+968 9987 6543',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'واحة عمانية تقدم أجود أنواع الليمون العماني والفواكه الموسمية من نزوى.',
    rating: 4.7,
    location: 'نزوى، سلطنة عمان',
    coverImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    joinedDate: 'يونيو 2022'
  },
  {
    id: 'seller3',
    name: 'سوق صلالة للفاكهة',
    email: 'salalah@fruitmarket.com',
    phone: '+968 9234 5678',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'سوق متخصص في بيع الفواكه العمانية الطازجة من صلالة، خاصة الموز والليمون.',
    rating: 4.9,
    location: 'صلالة، سلطنة عمان',
    coverImage: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    joinedDate: 'يناير 2020'
  },
  {
    id: 'seller4',
    name: 'مزارع بهلاء العضوية',
    email: 'bahla@organic.com',
    phone: '+968 9345 6789',
    image: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'منتجات عضوية عمانية من مزارع بهلاء، بدون أي مواد كيميائية.',
    rating: 4.6,
    location: 'بهلاء، سلطنة عمان',
    coverImage: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    joinedDate: 'أبريل 2021'
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