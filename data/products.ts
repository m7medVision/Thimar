// Dummy data for products
export const allProducts = [
  {
    id: 'fruit1',
    name: 'تمر خنيزي',
    description: 'تمر خنيزي العماني الطازج من مزارع الباطنة، يتميز بلونه الأحمر الداكن وطعمه الحلو.',
    price: 2.49,
    image: 'https://www.omandaily.om/uploads/imported_images/uploads/2018/05/1337809.jpg',
    categoryId: 'cat1',
    sellerId: 'seller1', // مزارع الباطنة
    rating: 4.7,
    isOrganic: true,
    minQuantity: 2,
    nutrition: [
      { name: 'السعرات الحرارية', value: '277 kcal' },
      { name: 'الألياف', value: '7g' },
      { name: 'البوتاسيوم', value: '696mg' },
      { name: 'السكر', value: '66g' },
      { name: 'الكربوهيدرات', value: '75g' },
    ]
  },
  {
    id: 'fruit2',
    name: 'تمر نغال',
    description: 'تمر نغال العماني من أجود أنواع التمور في سلطنة عمان، مشهور بحجمه الكبير وطعمه الفريد.',
    price: 3.00,
    image: 'https://omanista.com/sooq/pictures/z5JUHT/image-2.jpg',
    categoryId: 'cat1',
    sellerId: 'seller1', // مزارع الباطنة
    rating: 4.8,
    isOrganic: true,
    minQuantity: 2,
    nutrition: [
      { name: 'السعرات الحرارية', value: '280 kcal' },
      { name: 'الألياف', value: '6g' },
      { name: 'البوتاسيوم', value: '700mg' },
      { name: 'السكر', value: '65g' },
      { name: 'الكربوهيدرات', value: '74g' },
    ]
  },
  {
    id: 'fruit3',
    name: 'تمر حنضل',
    description: 'تمر حنضل من ولاية بهلاء، يتميز بقوامه الناعم وطعمه الحلو.',
    price: 2.75,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlaASAp1PkzFSQQaXPj6g39r_F9owiB4XczQ&s',
    categoryId: 'cat1',
    sellerId: 'seller4', // مزارع بهلاء العضوية
    rating: 4.6,
    isOrganic: true,
    isSeasonal: true,
    minQuantity: 2,
    nutrition: [
      { name: 'السعرات الحرارية', value: '275 kcal' },
      { name: 'الألياف', value: '7g' },
      { name: 'البوتاسيوم', value: '690mg' },
      { name: 'السكر', value: '64g' },
      { name: 'الكربوهيدرات', value: '73g' },
    ]
  },
  {
    id: 'fruit4',
    name: 'تمر خلاص',
    description: 'تمر خلاص العماني من أشهر التمور في سلطنة عمان، لونه ذهبي وطعمه غني.',
    price: 3.50,
    image: 'https://media.zid.store/3dfac062-0e10-4b87-af14-41b816f1152c/7a0d9b4b-b9ce-4c7b-8c15-8bfc219ed108.png',
    categoryId: 'cat1',
    sellerId: 'seller1', // مزارع الباطنة
    rating: 4.9,
    isOrganic: true,
    isSeasonal: true,
    minQuantity: 2,
    nutrition: [
      { name: 'السعرات الحرارية', value: '276 kcal' },
      { name: 'الألياف', value: '6.5g' },
      { name: 'البوتاسيوم', value: '695mg' },
      { name: 'السكر', value: '67g' },
      { name: 'الكربوهيدرات', value: '74g' },
    ]
  },
  {
    id: 'fruit5',
    name: 'موز الباطنة',
    description: 'موز الباطنة الطازج من صلالة، يتميز بحجمه الصغير وطعمه الحلو.',
    price: 1.50,
    image: 'https://cdn4.premiumread.com/?url=https://omandaily.om/omandaily/uploads/images/2021/05/31/1653109.jpg&w=1000&q=72&f=jpg&t=1',
    categoryId: 'cat2',
    sellerId: 'seller3', // سوق صلالة للفاكهة
    rating: 4.7,
    isOrganic: false,
    minQuantity: 3,
    nutrition: [
      { name: 'السعرات الحرارية', value: '89 kcal' },
      { name: 'الألياف', value: '2.6g' },
      { name: 'البوتاسيوم', value: '358mg' },
      { name: 'السكر', value: '12g' },
      { name: 'الكربوهيدرات', value: '23g' },
    ]
  },
  {
    id: 'fruit6',
    name: 'ليمون عماني',
    description: 'ليمون عماني طبيعي من واحة نزوى، يستخدم في الطبخ والمشروبات التقليدية.',
    price: 2.00,
    image: 'https://shabiba.eu-central-1.linodeobjects.com/2020/02/11/1103088.jpg',
    categoryId: 'cat3',
    sellerId: 'seller2', // واحة نزوى
    rating: 4.8,
    isOrganic: true,
    minQuantity: 5,
    nutrition: [
      { name: 'السعرات الحرارية', value: '29 kcal' },
      { name: 'الألياف', value: '2.8g' },
      { name: 'فيتامين C', value: '88%' },
      { name: 'البوتاسيوم', value: '138mg' },
      { name: 'السكر', value: '2.5g' },
    ]
  },
];

export const featuredProducts = [
  allProducts[0],  // تمر خنيزي
  allProducts[1],  // تمر نغال
  allProducts[2],  // تمر حنضل
  allProducts[3],  // تمر خلاص
  allProducts[4],  // موز الباطنة
  allProducts[5],  // ليمون عماني
];

export const seasonalProducts = [
  allProducts[0],  // تمر خنيزي
  allProducts[1],  // تمر نغال
  allProducts[3],  // تمر خلاص
  allProducts[4],  // موز الباطنة
  allProducts[5],  // ليمون عماني
];