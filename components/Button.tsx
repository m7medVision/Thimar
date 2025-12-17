import { TouchableOpacity, Text, ActivityIndicator, View, ViewStyle, I18nManager } from 'react-native';
import { ReactNode } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { buttonStyles } from '@/styles/componentStyles';
import theme from '@/styles/theme';
import * as Haptics from 'expo-haptics';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  hapticFeedback?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
};

export default function Button({
  title,
  onPress,
  style,
  type = 'primary',
  icon,
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  hapticType = 'medium',
}: ButtonProps) {
  const scale = useSharedValue(1);

  const triggerHapticFeedback = async () => {
    if (!hapticFeedback || disabled || loading) return;

    try {
      switch (hapticType) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      // Silently fail if haptics are not available
      console.debug('Haptic feedback not available:', error);
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 20 });
    triggerHapticFeedback();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getAccessibilityLabel = () => {
    if (accessibilityLabel) return accessibilityLabel;
    if (loading) return title;
    return title;
  };

  const getAccessibilityHint = () => {
    if (accessibilityHint) return accessibilityHint;
    return disabled ? 'الزر غير متاح' : 'اضغط للتنفيذ';
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <TouchableOpacity
        style={[
          buttonStyles.button,
          type === 'primary' ? buttonStyles.primaryButton : buttonStyles.secondaryButton,
          disabled && buttonStyles.disabledButton,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        disabled={disabled || loading}
        accessible={true}
        accessibilityLabel={getAccessibilityLabel()}
        accessibilityHint={getAccessibilityHint()}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading, busy: loading }}
      >
        {loading ? (
          <ActivityIndicator
            color={type === 'primary' ? theme.colors.white : theme.colors.primary}
            accessible={true}
            accessibilityLabel="جاري التحميل"
          />
        ) : (
          <View style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
            {icon && (
              <View style={I18nManager.isRTL ? { marginLeft: theme.spacing.sm } : { marginRight: theme.spacing.sm }}>
                {icon}
              </View>
            )}
            <Text
              style={[
                buttonStyles.buttonText,
                type === 'primary' ? buttonStyles.primaryButtonText : buttonStyles.secondaryButtonText,
                disabled && buttonStyles.disabledButtonText,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}