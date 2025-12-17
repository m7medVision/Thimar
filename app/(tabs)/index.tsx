import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, I18nManager } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ShoppingBasket } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ThimarLogo from '@/components/ThimarLogo';
import { WavePattern } from '@/components/DecorativeSVG';
import { featuredProducts, seasonalProducts } from '@/data/products';
import { categories } from '@/data/categories';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const navigateToCategory = (id: string) => {
    router.push({
      pathname: '/categories',
      params: { activeCategory: id }
    });
  };

  const handleProductAddToCart = (productId: string) => {
    // Add to cart logic
    console.log('Adding product to cart:', productId);
  };

  const handleProductToggleFavorite = (productId: string, isFavorite: boolean) => {
    // Toggle favorite logic
    console.log('Toggle favorite:', productId, isFavorite);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Decorative wave pattern at top */}
        <View style={styles.decorativeWave}>
          <WavePattern height={60} color="#4CAF50" opacity={0.08} />
        </View>
        
        <View style={[styles.header, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.logoContainer}>
            <ThimarLogo size={60} showText={false} variant="icon" />
            <View style={styles.welcomeContainer}>
              <Text style={[styles.welcomeText, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
                أهلاً بكم في
              </Text>
              <Text style={[styles.appName, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
                ثمار
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('/cart')}
            accessible={true}
            accessibilityLabel="سلة التسوق"
            accessibilityHint="اضغط لعرض سلة التسوق"
            accessibilityRole="button"
          >
            <ShoppingBasket color="#333" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search
            size={20}
            color="#999"
            style={[styles.searchIcon, I18nManager.isRTL ? { marginRight: 0, marginLeft: 8 } : { marginRight: 8, marginLeft: 0 }]}
          />
          <TextInput
            style={[styles.searchInput, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
            placeholder="ابحث عن الفواكه..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessible={true}
            accessibilityLabel="حقل البحث"
            accessibilityHint="اكتب للبحث عن منتجات"
            accessibilityRole="search"
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={[styles.sectionTitle, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
              الفئات
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/categories')}
              accessible={true}
              accessibilityLabel="عرض جميع الفئات"
              accessibilityHint="اضغط لعرض جميع فئات المنتجات"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {categories.slice(0, 5).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => navigateToCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={[styles.sectionTitle, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
              في الموسم
            </Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="عرض جميع المنتجات الموسمية"
              accessibilityHint="اضغط لعرض جميع المنتجات الموسمية"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScrollView}
          >
            {seasonalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => navigateToProduct(product.id)}
                onAddToCart={handleProductAddToCart}
                onToggleFavorite={handleProductToggleFavorite}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <View style={[styles.sectionHeader, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={[styles.sectionTitle, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
              الأكثر مبيعاً
            </Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="عرض جميع المنتجات الأكثر مبيعاً"
              accessibilityHint="اضغط لعرض جميع المنتجات الأكثر مبيعاً"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts.slice(0, 4)}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => navigateToProduct(item.id)}
                onAddToCart={handleProductAddToCart}
                onToggleFavorite={handleProductToggleFavorite}
                style={styles.gridCard}
              />
            )}
            numColumns={2}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            columnWrapperStyle={styles.productsGrid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  decorativeWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
  },
  appName: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
    color: '#4CAF50',
  },
  cartButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    padding: 12,
    minHeight: 48,
    minWidth: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Cairo-Regular',
    fontSize: 16,
    padding: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    color: '#333',
  },
  seeAll: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#4CAF50',
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
  },
  productsScrollView: {
    paddingHorizontal: 16,
  },
  productsGrid: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  gridCard: {
    width: '48%',
    marginBottom: 16,
  },
});