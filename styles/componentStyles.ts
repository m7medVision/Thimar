import { StyleSheet } from 'react-native';
import theme from './theme';

export const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: theme.layout.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  disabledButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderColor: theme.colors.background.tertiary,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.lg,
  },
  primaryButtonText: {
    color: theme.colors.white,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  disabledButtonText: {
    color: theme.colors.text.tertiary,
  },
});

export const cardStyles = StyleSheet.create({
  productCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.layout.borderRadius.lg,
    ...theme.shadows.lg,
    margin: theme.spacing.xs,
    width: theme.layout.productCardWidth,
    overflow: 'hidden',
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: theme.layout.borderRadius.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.base,
  },
});

export const inputStyles = StyleSheet.create({
  textInput: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    padding: theme.spacing.md,
    borderRadius: theme.layout.borderRadius.base,
    backgroundColor: theme.colors.background.secondary,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.layout.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});

export const listStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.base,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
});

export const badgeStyles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: -8,
    backgroundColor: theme.colors.error,
    borderRadius: theme.layout.borderRadius.full,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
  },
  organicBadge: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.layout.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  organicBadgeText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
  },
});