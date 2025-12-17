import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import PriceDisplay from './PriceDisplay';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    minQuantity: number;
  };
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const increaseQuantity = () => {
    onQuantityChange(item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > item.minQuantity) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Trash2 size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceRow}>
          <PriceDisplay price={item.price} size="sm" color="#4CAF50" showPerKg={true} />
        </View>
        
        <View style={styles.quantityRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={[
                styles.quantityButton, 
                item.quantity <= item.minQuantity && styles.disabledButton
              ]} 
              onPress={decreaseQuantity}
              disabled={item.quantity <= item.minQuantity}
            >
              <Minus size={16} color={item.quantity <= item.minQuantity ? '#ccc' : '#333'} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Plus size={16} color="#333" />
            </TouchableOpacity>
          </View>
          
          <PriceDisplay price={item.price * item.quantity} size="md" color="#333" />
        </View>
        
        {item.quantity <= item.minQuantity && (
          <Text style={styles.minQuantityText}>
            الحد الأدنى: {item.minQuantity} كجم
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  priceRow: {
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  quantity: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 12,
  },
  minQuantityText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
    fontStyle: 'italic',
  },
});