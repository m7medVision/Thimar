import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput, I18nManager } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';
import { categories } from '@/data/categories';

export default function CategoriesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(
    params.activeCategory?.toString() || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let products = allProducts;
    
    // Filter by category
    if (activeCategory !== 'all') {
      products = products.filter((product) => product.categoryId === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      products = products.filter((product) => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(products);
  }, [activeCategory, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>الفئات</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
            placeholder="ابحث عن منتج..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            accessible={true}
            accessibilityLabel="حقل البحث"
            accessibilityHint="اكتب للبحث عن منتج"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={clearSearch} 
              style={styles.clearButton}
              accessible={true}
              accessibilityLabel="مسح البحث"
              accessibilityRole="button"
            >
              <X size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollView}
        >
          <TouchableOpacity
            style={[
              styles.categoryPill,
              activeCategory === 'all' && styles.activeCategoryPill,
            ]}
            onPress={() => setActiveCategory('all')}
          >
            <Text
              style={[
                styles.categoryPillText,
                activeCategory === 'all' && styles.activeCategoryPillText,
              ]}
            >
              الكل
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryPill,
                activeCategory === category.id && styles.activeCategoryPill,
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  activeCategory === category.id && styles.activeCategoryPillText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigateToProduct(item.id)}
            style={styles.productCard}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              {searchQuery.trim() 
                ? `لا توجد نتائج لـ "${searchQuery}"` 
                : 'لا توجد منتجات في هذه الفئة'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    marginTop: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  categoriesWrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pageTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
    color: '#333',
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    minWidth: 80,
    alignItems: 'center',
  },
  activeCategoryPill: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryPillText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  activeCategoryPillText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  seasonLabel: {
    position: 'absolute', 
    top: 8,
    left: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  seasonLabelText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Cairo-Medium',
  },
  productList: {
    padding: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});