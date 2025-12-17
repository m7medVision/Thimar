import { View, Text, Image, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { cardStyles } from '@/styles/componentStyles';
import theme from '@/styles/theme';

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    image: string;
  };
  onPress: () => void;
};

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[cardStyles.categoryCard, animatedStyle]}
      accessible={true}
      accessibilityLabel={`فئة: ${category.name}`}
      accessibilityHint="اضغط لعرض منتجات هذه الفئة"
      accessibilityRole="button"
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={{ width: '100%', height: '100%' }}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        <Image
          source={{ uri: category.image }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: theme.layout.borderRadius.md,
          }}
          accessible={true}
          accessibilityLabel={`صورة فئة: ${category.name}`}
          accessibilityRole="image"
        />
        <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: theme.colors.overlay.dark,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: theme.layout.borderRadius.md,
        }}>
          <Text
            style={{
              fontFamily: theme.typography.arabicFontFamily.semiBold,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.white,
              textAlign: 'center',
              paddingHorizontal: theme.spacing.sm,
              textShadowColor: 'rgba(0,0,0,0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
            }}
            accessible={false}
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}