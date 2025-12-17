import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, Dimensions, I18nManager } from 'react-native';
import { Plus, Star, Heart } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { formatPriceWithText } from '@/utils/formatters';
import SellerInfo from './SellerInfo';
import PriceDisplay from './PriceDisplay';
import { useAccessibility } from '@/providers/AccessibilityProvider';
import * as Haptics from 'expo-haptics';

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
    description?: string;
    inStock?: boolean;
  };
  onPress: () => void;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string, isFavorite: boolean) => void;
  style?: ViewStyle;
};

export default function ProductCard({
  product,
  onPress,
  onAddToCart,
  onToggleFavorite,
  style,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const { announceForAccessibility, isScreenReaderEnabled } = useAccessibility();

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const toggleFavorite = async () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    heartScale.value = withSpring(1.3, { damping: 10 }, () => {
      heartScale.value = withTiming(1, { duration: 300, easing: Easing.bounce });
    });

    // Announce to screen reader
    if (isScreenReaderEnabled) {
      announceForAccessibility(
        newFavoriteState
          ? `تم إضافة ${product.name} إلى المفضلة`
          : `تم إزالة ${product.name} من المفضلة`
      );
    }

    // Call callback if provided
    if (onToggleFavorite) {
      onToggleFavorite(product.id, newFavoriteState);
    }
  };

  const handleAddToCart = async () => {
    // Trigger haptic feedback
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Announce to screen reader
    if (isScreenReaderEnabled) {
      announceForAccessibility(`تم إضافة ${product.name} إلى السلة`);
    }

    // Call callback if provided
    if (onAddToCart) {
      onAddToCart(product.id);
    }
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

  const getAccessibilityLabel = () => {
    const labels = [
      `منتج: ${product.name}`,
      `السعر: ${formatPriceWithText(product.price)} للكيلوغرام`,
      `التقييم: ${product.rating.toFixed(1)} من 5`,
      product.isOrganic && 'منتج عضوي',
      product.isSeasonal && 'في الموسم',
      product.inStock !== false ? 'متوفر' : 'غير متوفر',
      isFavorite ? 'مضاف إلى المفضلة' : 'غير مضاف إلى المفضلة',
    ].filter(Boolean).join('، ');

    return labels;
  };

  return (
    <Animated.View
      style={[styles.container, animatedStyle, style]}
      accessible={true}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityHint="اضغط لعرض تفاصيل المنتج"
      accessibilityRole="button"
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.touchable}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
            accessible={true}
            accessibilityLabel={`صورة منتج: ${product.name}`}
            accessibilityRole="image"
          />
          <View style={styles.badgeContainer}>
            {product.isOrganic && (
              <View style={styles.organicBadge}>
                <Text style={styles.organicText}>عضوي</Text>
              </View>
            )}
            {product.isSeasonal && (
              <View style={styles.seasonalBadge}>
                <Text style={styles.seasonalText}>في الموسم</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            accessible={true}
            accessibilityLabel={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            accessibilityHint="اضغط لإضافة أو إزالة المنتج من المفضلة"
            accessibilityRole="button"
          >
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
          <View style={[styles.topRow, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
            <View style={[styles.ratingContainer, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
              <Star size={12} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text
            style={[styles.name, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
            numberOfLines={1}
            accessible={false}
          >
            {product.name}
          </Text>
          <View style={styles.priceContainer}>
            <PriceDisplay price={product.price} size="md" color="#4CAF50" showPerKg={true} />
          </View>

          {/* Seller info */}
          <SellerInfo sellerId={product.sellerId} />

          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddToCart || onPress}
            accessible={true}
            accessibilityLabel="إضافة إلى السلة"
            accessibilityHint="اضغط لإضافة هذا المنتج إلى سلة التسوق"
            accessibilityRole="button"
          >
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
    fontFamily: 'Cairo-Medium',
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
    fontFamily: 'Cairo-Medium',
    fontSize: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    minWidth: 44,
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
    fontFamily: 'Cairo-Medium',
    fontSize: 10,
    color: '#666',
    marginLeft: I18nManager.isRTL ? 0 : 4,
    marginRight: I18nManager.isRTL ? 4 : 0,
  },
  name: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    marginBottom: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 44,
    minWidth: 44,
  },
});