import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';
import { categories } from '@/data/categories';

export default function CategoriesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(
    params.activeCategory?.toString() || 'all'
  );
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter((product) => product.categoryId === activeCategory)
      );
    }
  }, [activeCategory]);

  const navigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>Categories</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
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
            All
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
            <Text style={styles.emptyStateText}>No products found in this category</Text>
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
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    marginRight: 8,
  },
  activeCategoryPill: {
    backgroundColor: '#4CAF50',
  },
  categoryPillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeCategoryPillText: {
    color: '#FFFFFF',
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
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});