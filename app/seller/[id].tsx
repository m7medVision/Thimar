import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar } from 'lucide-react-native';
import { getSellerById } from '@/data/sellers';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

// Define the Product type based on the structure in products.ts
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
  sellerId: string;
  rating: number;
  isOrganic: boolean;
  isSeasonal?: boolean;
  minQuantity: number;
  nutrition: { name: string; value: string }[];
};

export default function SellerProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const seller = getSellerById(id as string);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const products = allProducts.filter(product => product.sellerId === id);
      setSellerProducts(products);
    }
  }, [id]);

  if (!seller) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>البائع غير موجود</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>العودة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image and Profile Header */}
        <View style={styles.coverImageContainer}>
          <Image source={{ uri: seller.coverImage }} style={styles.coverImage} />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <Image source={{ uri: seller.image }} style={styles.profileImage} />
          
          <View style={styles.sellerInfoContainer}>
            <Text style={styles.sellerName}>{seller.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{seller.rating.toFixed(1)} تقييم</Text>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#666" />
              <Text style={styles.locationText}>{seller.location}</Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>نبذة عنا</Text>
          <Text style={styles.bioText}>{seller.bio}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات التواصل</Text>
          
          <View style={styles.contactItem}>
            <Phone size={16} color="#4CAF50" />
            <Text style={styles.contactText}>{seller.phone}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Mail size={16} color="#4CAF50" />
            <Text style={styles.contactText}>{seller.email}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Calendar size={16} color="#4CAF50" />
            <Text style={styles.contactText}>انضم في {seller.joinedDate}</Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>منتجات {seller.name}</Text>
          
          <FlatList
            data={sellerProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => router.push(`/product/${item.id}`)}
                style={styles.productCard}
              />
            )}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            ListEmptyComponent={
              <View style={styles.emptyProductsContainer}>
                <Text style={styles.emptyProductsText}>
                  لا توجد منتجات متاحة من هذا البائع حالياً.
                </Text>
              </View>
            }
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  coverImageContainer: {
    height: 180,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Cairo-SemiBold',
    color: '#4CAF50',
    fontSize: 16,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginTop: -40,
    backgroundColor: '#FFFFFF',
  },
  sellerInfoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  sellerName: {
    fontFamily: 'Cairo-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  bioText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  productsSection: {
    padding: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
  },
  emptyProductsContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyProductsText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});