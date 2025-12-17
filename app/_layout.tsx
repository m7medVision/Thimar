import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { 
  Cairo_400Regular, 
  Cairo_500Medium, 
  Cairo_600SemiBold, 
  Cairo_700Bold 
} from '@expo-google-fonts/cairo';
import { 
  Tajawal_400Regular, 
  Tajawal_500Medium, 
  Tajawal_700Bold 
} from '@expo-google-fonts/tajawal';
import { CartProvider } from '@/context/CartContext';
import { AccessibilityProvider } from '@/providers/AccessibilityProvider';
import { SplashScreen } from 'expo-router';

// Configure RTL for Arabic language support
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // This hook must remain here - required by the framework
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    // English fonts (Inter)
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    // Arabic fonts (Cairo) - Primary Arabic font
    'Cairo-Regular': Cairo_400Regular,
    'Cairo-Medium': Cairo_500Medium,
    'Cairo-SemiBold': Cairo_600SemiBold,
    'Cairo-Bold': Cairo_700Bold,
    // Arabic fonts (Tajawal) - Alternative Arabic font
    'Tajawal-Regular': Tajawal_400Regular,
    'Tajawal-Medium': Tajawal_500Medium,
    'Tajawal-Bold': Tajawal_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AccessibilityProvider>
      <CartProvider>
        <Stack screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'slide_from_left',
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{
            title: 'تفاصيل المنتج',
            headerShown: true,
            headerBackTitle: 'رجوع',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Cairo-Medium',
              writingDirection: 'rtl',
            },
          }} />
          <Stack.Screen name="seller/[id]" options={{
            title: 'ملف البائع',
            headerShown: false,
            headerBackTitle: 'رجوع',
            presentation: 'card',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Cairo-Medium',
              writingDirection: 'rtl',
            },
          }} />
          <Stack.Screen name="checkout" options={{
            title: 'الدفع',
            headerShown: true,
            headerBackTitle: 'رجوع',
            presentation: 'modal',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Cairo-Medium',
              writingDirection: 'rtl',
            },
          }} />
          <Stack.Screen name="success" options={{
            title: 'تأكيد الطلب',
            headerShown: false,
            gestureEnabled: false,
          }} />
        </Stack>
        <StatusBar style="auto" />
      </CartProvider>
    </AccessibilityProvider>
  );
}