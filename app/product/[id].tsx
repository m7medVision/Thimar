import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, ArrowLeft, Plus, Minus, Truck, Clock, ShoppingBasket } from 'lucide-react-native';
import { useCartContext } from '@/context/CartContext';
import { allProducts } from '@/data/products';
import { formatPrice } from '@/utils/formatters';
import Button from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SellerInfo from '@/components/SellerInfo';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addToCart, cartItems } = useCartContext();
  
  const product = allProducts.find((p) => p.id === id);
  
  const [quantity, setQuantity] = useState(product?.minQuantity || 1);
  
  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      minQuantity: product.minQuantity
    });
    
    // Show feedback
    router.push({
      pathname: '/cart',
    });
  };

  const decreaseQuantity = () => {
    if (quantity > product.minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color={star <= rating ? '#FFC107' : '#e0e0e0'}
            fill={star <= rating ? '#FFC107' : 'none'}
          />
        ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity 
            style={[styles.backButton, { top: insets.top + 8 }]} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#333" />
          </TouchableOpacity>
          {product.isOrganic && (
            <View style={styles.organicBadge}>
              <Text style={styles.organicBadgeText}>Organic</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              {/* Add seller info below the product name */}
              <SellerInfo sellerId={product.sellerId} compact={false} />
              <Text style={[styles.productPrice, { marginTop: 12 }]}>{formatPrice(product.price)} / kg</Text>
            </View>
            {renderRatingStars(product.rating)}
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity <= product.minQuantity && styles.disabledButton]} 
                onPress={decreaseQuantity}
                disabled={quantity <= product.minQuantity}
              >
                <Minus size={20} color={quantity <= product.minQuantity ? '#ccc' : '#333'} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity} kg</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Plus size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Truck size={18} color="#4CAF50" />
              <Text style={styles.infoText}>Free delivery on orders above $50</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={18} color="#4CAF50" />
              <Text style={styles.infoText}>Delivered within 24 hours</Text>
            </View>
          </View>

          <View style={styles.minQuantityInfo}>
            <Text style={styles.minQuantityText}>
              * Minimum order: {product.minQuantity} kg
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this item</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionGrid}>
              {product.nutrition.map((item, index) => (
                <View key={index} style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                  <Text style={styles.nutritionName}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatPrice(product.price * quantity)}</Text>
        </View>
        <Button
          title="Add to Cart"
          icon={<ShoppingBasket size={18} color="#FFFFFF" />}
          onPress={handleAddToCart}
          style={styles.addButton}
        />
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

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
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  organicBadge: {
    position: 'absolute',
    right: 16,
    top: 50,
    backgroundColor: '#8BC34A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  organicBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100, // Space for the bottom bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  productName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#4CAF50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  quantityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  minQuantityInfo: {
    marginBottom: 24,
  },
  minQuantityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  nutritionContainer: {
    marginBottom: 24,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  nutritionItem: {
    width: (width - 32 - 16) / 3, // Account for padding
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: 'center',
  },
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  nutritionName: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  totalPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333',
  },
  addButton: {
    width: '60%',
  },
});