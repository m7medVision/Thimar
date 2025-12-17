import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Store } from 'lucide-react-native';
import { getSellerById } from '@/data/sellers';

type SellerInfoProps = {
  sellerId: string;
  compact?: boolean;
};

export default function SellerInfo({ sellerId, compact = true }: SellerInfoProps) {
  const router = useRouter();
  const seller = getSellerById(sellerId);

  if (!seller) {
    return null;
  }

  const handlePress = () => {
    router.push(`/seller/${sellerId}`);
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Store size={12} color="#666" />
        <Text style={styles.compactText}>{seller.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: seller.image }} style={styles.sellerImage} />
      <View style={styles.textContainer}>
        <Text style={styles.sellerName}>{seller.name}</Text>
        <Text style={styles.sellerLocation}>{seller.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 8,
  },
  sellerName: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
  },
  sellerLocation: {
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  compactText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
});