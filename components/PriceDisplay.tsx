import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OmaniRialSymbol from './OmaniRialSymbol';

interface PriceDisplayProps {
  price: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  showSymbol?: boolean;
  showPerKg?: boolean;
  style?: any;
  textStyle?: any;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  size = 'md',
  color = '#4CAF50',
  showSymbol = true,
  showPerKg = false,
  style,
  textStyle,
}) => {
  const sizeConfig = {
    sm: { fontSize: 12, symbolSize: 14 },
    md: { fontSize: 16, symbolSize: 18 },
    lg: { fontSize: 20, symbolSize: 22 },
    xl: { fontSize: 24, symbolSize: 28 },
  };

  const { fontSize, symbolSize } = sizeConfig[size];

  // For Arabic RTL: Symbol comes first, then price, then per kg
  // Display order: ﷼ 2.490 / كجم
  return (
    <View style={[styles.container, style]}>
      {showSymbol && (
        <OmaniRialSymbol
          size={symbolSize}
          color={color}
          style={styles.symbolBefore}
        />
      )}
      <Text style={[styles.price, { fontSize, color }, textStyle]}>
        {price.toFixed(3)}
      </Text>
      {showPerKg && (
        <Text style={[styles.perKg, { fontSize: fontSize * 0.75, color: '#666' }]}>
          {' \\ كجم'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Cairo-Bold',
  },
  symbolBefore: {
    marginRight: 4,
  },
  perKg: {
    fontFamily: 'Cairo-Regular',
  },
});

export default PriceDisplay;

