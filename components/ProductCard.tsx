import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, Dimensions } from 'react-native';
import { Plus, Star, Heart } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { formatPrice } from '@/utils/formatters';
import SellerInfo from './SellerInfo';

const { width: screenWidth } = Dimensions.get('window');

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    isOrganic?: boolean;
    isSeasonal?: boolean;
    sellerId: string;
  };
  onPress: () => void;
  style?: ViewStyle;
};

export default function ProductCard({ product, onPress, style }: ProductCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.95, { damping: 15 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 15 });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    heartScale.value = withSpring(1.3, { damping: 10 }, () => {
      heartScale.value = withTiming(1, { duration: 300, easing: Easing.bounce });
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.badgeContainer}>
            {product.isOrganic && (
              <View style={styles.organicBadge}>
                <Text style={styles.organicText}>Organic</Text>
              </View>
            )}
            {product.isSeasonal && (
              <View style={styles.seasonalBadge}>
                <Text style={styles.seasonalText}>In Season</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Animated.View style={heartAnimatedStyle}>
              <Heart 
                size={16} 
                color={isFavorite ? "#FF5252" : "#FFFFFF"} 
                fill={isFavorite ? "#FF5252" : "transparent"} 
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.perKg}>/ kg</Text>
          </View>
          
          {/* Seller info */}
          <SellerInfo sellerId={product.sellerId} />
          
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 6,
    width: screenWidth > 500 ? 200 : (screenWidth / 2) - 24,
    overflow: 'hidden',
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    gap: 4,
  },
  organicBadge: {
    backgroundColor: 'rgba(139, 195, 74, 0.9)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  organicText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 8,
  },
  seasonalBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  seasonalText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 12,
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4CAF50',
  },
  perKg: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});