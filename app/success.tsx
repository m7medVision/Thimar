import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ShoppingBasket, Chrome as Home } from 'lucide-react-native';
import Button from '@/components/Button';

export default function SuccessScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation for checkmark
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const returnToHome = () => {
    router.push('/');
  };
  
  const viewOrders = () => {
    router.push('/profile');
  };

  const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Animated.View 
            style={[
              styles.checkCircle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Check size={48} color="#FFFFFF" strokeWidth={3} />
          </Animated.View>
        </View>
        
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.title}>Order Placed!</Text>
          <Text style={styles.message}>
            Your order {orderNumber} has been successfully placed.
          </Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.divider} />
            <Text style={styles.detailsLabel}>Order Details</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailValue}>Within 24 hours</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>Credit Card</Text>
            </View>
            <View style={styles.divider} />
          </View>
          
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2660992/pexels-photo-2660992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
            style={styles.deliveryImage}
          />
          
          <Text style={styles.thankYouText}>
            Thank you for shopping with Thimar! We&apos;ll notify you when your order is on its way.
          </Text>
        </Animated.View>
      </View>
      
      <View style={styles.buttonGroup}>
        <Button
          title="Continue Shopping"
          onPress={returnToHome}
          style={styles.continueButton}
          icon={<Home size={18} color="#FFFFFF" />}
        />
        <Button
          title="View Orders"
          onPress={viewOrders}
          style={styles.viewOrdersButton}
          type="secondary"
          icon={<ShoppingBasket size={18} color="#4CAF50" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  iconContainer: {
    marginBottom: 24,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  detailsLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
  deliveryImage: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
  },
  thankYouText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    marginBottom: 12,
  },
  viewOrdersButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
});