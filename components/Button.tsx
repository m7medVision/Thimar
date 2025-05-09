import { TouchableOpacity, Text, ActivityIndicator, View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { buttonStyles } from '@/styles/componentStyles';
import theme from '@/styles/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  style,
  type = 'primary',
  icon,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
      >
        {loading ? (
          <ActivityIndicator 
            color={type === 'primary' ? theme.colors.white : theme.colors.primary} 
          />
        ) : (
          <View style={theme.defaultStyles.row}>
            {icon && <View style={{ marginRight: theme.spacing.sm }}>{icon}</View>}
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