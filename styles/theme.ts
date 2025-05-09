import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  primary: '#4CAF50',
  secondary: '#8BC34A',
  warning: '#FFC107',
  error: '#FF6B6B',
  success: '#4CAF50',
  white: '#FFFFFF',
  black: '#000000',
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#f5f5f5',
    tertiary: '#f0f0f0',
  },
  border: {
    light: '#f0f0f0',
    medium: '#e0e0e0',
  },
  overlay: {
    dark: 'rgba(0, 0, 0, 0.3)',
    light: 'rgba(255, 255, 255, 0.9)',
  }
};

export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

export const layout = {
  screenWidth: width,
  productCardWidth: width > 500 ? 200 : (width / 2) - 24,
  borderRadius: {
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const defaultStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  section: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    ...shadows.base,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  pageTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    color: colors.text.primary,
  },
};

const theme = {
  colors,
  typography,
  spacing,
  layout,
  shadows,
  defaultStyles,
};

export default theme;