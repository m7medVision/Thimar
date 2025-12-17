import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useCartContext } from '@/context/CartContext';
import Button from '@/components/Button';
import PriceDisplay from '@/components/PriceDisplay';
import { CreditCard, MapPin, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const paymentMethods = [
  { id: 'card', name: 'بطاقة ائتمان', icon: <CreditCard size={24} color="#333" /> },
  { id: 'cod', name: 'الدفع عند الاستلام', icon: <Check size={24} color="#333" /> },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, clearCart } = useCartContext();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert('يرجى إدخال عنوان التوصيل');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      clearCart();
      router.push('/success');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
          <View style={styles.addressInputContainer}>
            <MapPin size={20} color="#999" style={styles.addressIcon} />
            <TextInput
              style={styles.addressInput}
              placeholder="أدخل عنوانك الكامل"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          <View style={styles.orderItems}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemQuantity}>{item.quantity} كجم</Text>
                  <PriceDisplay price={item.price * item.quantity} size="sm" color="#333" />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
            <PriceDisplay price={subtotal} size="sm" color="#333" />
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>رسوم التوصيل</Text>
            <PriceDisplay price={deliveryFee} size="sm" color="#333" />
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>الإجمالي</Text>
            <PriceDisplay price={total} size="md" color="#4CAF50" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          <View style={styles.paymentOptions}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  selectedPayment === method.id && styles.selectedPaymentOption,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentContent}>
                  {method.icon}
                  <Text style={styles.paymentName}>{method.name}</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPayment === method.id && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPayment === method.id && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.totalContainer}>
          <Text style={styles.finalTotalLabel}>المبلغ الإجمالي</Text>
          <PriceDisplay price={total} size="xl" color="#333" />
        </View>
        <Button
          title="تأكيد الطلب"
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  addressIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  addressInput: {
    flex: 1,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#333',
    minHeight: 60,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemName: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  itemPrice: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
    width: 80,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  totalLabel: {
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    color: '#4CAF50',
  },
  paymentOptions: {
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedPaymentOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0f8f0',
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentName: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4CAF50',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flex: 1,
  },
  finalTotalLabel: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
  },
  finalTotalValue: {
    fontFamily: 'Cairo-Bold',
    fontSize: 20,
    color: '#333',
  },
  placeOrderButton: {
    width: '60%',
  },
});