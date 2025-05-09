import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { CartProvider } from '@/context/CartContext';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // This hook must remain here - required by the framework
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
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
    <CartProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ 
          title: 'Product Details',
          headerShown: true,
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
          },
        }} />
        <Stack.Screen name="seller/[id]" options={{ 
          title: 'Seller Profile',
          headerShown: false,
          headerBackTitle: 'Back',
          presentation: 'card',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
          },
        }} />
        <Stack.Screen name="checkout" options={{ 
          title: 'Checkout',
          headerShown: true,
          headerBackTitle: 'Back',
          presentation: 'modal',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
          },
        }} />
        <Stack.Screen name="success" options={{ 
          title: 'Order Confirmation',
          headerShown: false,
          gestureEnabled: false,
        }} />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}