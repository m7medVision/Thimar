import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBasket, ArrowRight } from 'lucide-react-native';
import { useCartContext } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import PriceDisplay from '@/components/PriceDisplay';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } = useCartContext();
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/checkout');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>سلة التسوق</Text>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <ShoppingBasket size={64} color="#ccc" />
      <Text style={styles.emptyCartTitle}>سلتك فارغة</Text>
      <Text style={styles.emptyCartMessage}>
        ابدأ التسوق لإضافة المنتجات إلى سلتك
      </Text>
      <Button 
        title="تصفح المنتجات" 
        onPress={() => router.push('/')}
        icon={<ArrowRight size={16} color="#FFFFFF" />}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onQuantityChange={(quantity) => updateCartItemQuantity(item.id, quantity)}
                onRemove={() => removeCartItem(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
              <PriceDisplay price={subtotal} size="sm" color="#333" />
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>رسوم التوصيل</Text>
              <PriceDisplay price={deliveryFee} size="sm" color="#333" />
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>الإجمالي</Text>
              <PriceDisplay price={total} size="lg" color="#4CAF50" />
            </View>

            <Button
              title="إتمام الشراء"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pageTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
    color: '#333',
  },
  cartList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartTitle: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 18,
    color: '#333',
    marginTop: 16,
  },
  emptyCartMessage: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    color: '#4CAF50',
  },
  checkoutButton: {
    marginTop: 16,
  },
});