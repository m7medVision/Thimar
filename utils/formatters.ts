/**
 * Formats a price number to a string (without currency symbol)
 * Use PriceDisplay component for visual display with OMR symbol
 * @param price The price to format
 * @returns Formatted price string (number only)
 */
export const formatPrice = (price: number): string => {
  return price.toFixed(3);
};

/**
 * Formats a price with text-based OMR symbol (for accessibility/screen readers)
 * @param price The price to format
 * @returns Formatted price string with OMR text
 */
export const formatPriceWithText = (price: number): string => {
  return `${price.toFixed(3)} ر.ع`;
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formats a date string to a more readable format
 * @param dateString The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};