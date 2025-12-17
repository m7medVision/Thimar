import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, User, Truck, Star, Settings, CircleHelp as HelpCircle, LogOut, Store } from 'lucide-react-native';
import { sellers } from '@/data/sellers';
import { allProducts } from '@/data/products';
import PriceDisplay from '@/components/PriceDisplay';

// Dummy data for orders
const orders = [
  {
    id: 'order1',
    date: '١٥ يونيو ٢٠٢٥',
    total: 124.50,
    status: 'تم التوصيل',
    items: 5
  },
  {
    id: 'order2',
    date: '١٠ يونيو ٢٠٢٥',
    total: 87.25,
    status: 'تم التوصيل',
    items: 3
  },
  {
    id: 'order3',
    date: '٥ يونيو ٢٠٢٥',
    total: 136.00,
    status: 'تم التوصيل',
    items: 7
  }
];

export default function ProfileScreen() {
  const router = useRouter();

  const navigateToSeller = (sellerId: string) => {
    router.push(`/seller/${sellerId}`);
  };

  // Helper function to get product count by seller
  const getProductCountBySeller = (sellerId: string) => {
    return allProducts.filter(product => product.sellerId === sellerId).length;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>حسابي</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://i.ibb.co/xSH5yQgq/image.png' }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>عبدالرحمن الحارثي</Text>
            <Text style={styles.profileEmail}>abdulrahman.alharthi@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>تعديل</Text>
          </TouchableOpacity>
        </View>

        {/* Sellers Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Store size={18} color="#4CAF50" />
            <Text style={styles.sectionTitle}>بائعو الفواكه</Text>
          </View>

          {sellers.map((seller) => (
            <TouchableOpacity 
              key={seller.id} 
              style={styles.sellerItem}
              onPress={() => navigateToSeller(seller.id)}
            >
              <View style={styles.sellerItemLeft}>
                <Image source={{ uri: seller.image }} style={styles.sellerImage} />
                <View>
                  <Text style={styles.sellerName}>{seller.name}</Text>
                  <Text style={styles.sellerProductCount}>
                    {getProductCountBySeller(seller.id)} منتج
                  </Text>
                </View>
              </View>
              <View style={styles.sellerRating}>
                <Star size={14} color="#FFC107" fill="#FFC107" />
                <Text style={styles.sellerRatingText}>{seller.rating}</Text>
                <ChevronRight size={16} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Truck size={18} color="#4CAF50" />
            <Text style={styles.sectionTitle}>طلباتي</Text>
          </View>

          {orders.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderItem}>
              <View>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={styles.orderInfoRow}>
                  <Text style={styles.orderInfo}>{order.items} عناصر · </Text>
                  <PriceDisplay price={order.total} size="sm" color="#666" />
                </View>
              </View>
              <View style={styles.orderStatusContainer}>
                <Text style={[
                  styles.orderStatus,
                  order.status === 'تم التوصيل' && styles.statusDelivered
                ]}>
                  {order.status}
                </Text>
                <ChevronRight size={16} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>عرض جميع الطلبات</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color="#4CAF50" />
            </View>
            <Text style={styles.menuItemText}>المعلومات الشخصية</Text>
            <ChevronRight size={16} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Star size={20} color="#4CAF50" />
            </View>
            <Text style={styles.menuItemText}>تقييماتي</Text>
            <ChevronRight size={16} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color="#4CAF50" />
            </View>
            <Text style={styles.menuItemText}>الإعدادات</Text>
            <ChevronRight size={16} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color="#4CAF50" />
            </View>
            <Text style={styles.menuItemText}>المساعدة والدعم</Text>
            <ChevronRight size={16} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <View style={[styles.menuIconContainer, styles.logoutIcon]}>
              <LogOut size={20} color="#FF6B6B" />
            </View>
            <Text style={[styles.menuItemText, styles.logoutText]}>تسجيل الخروج</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersionText}>Thimar v1.0.0</Text>
        </View>
      </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#4CAF50',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  sellerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sellerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerName: {
    fontFamily: 'Cairo-Medium',
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  sellerProductCount: {
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
    color: '#666',
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRatingText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderDate: {
    fontFamily: 'Cairo-Medium',
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderInfo: {
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
    color: '#666',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatus: {
    fontFamily: 'Cairo-Medium',
    fontSize: 13,
    marginRight: 8,
  },
  statusDelivered: {
    color: '#4CAF50',
  },
  seeAllButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  seeAllButtonText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 14,
    color: '#4CAF50',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontFamily: 'Cairo-Medium',
    fontSize: 15,
    color: '#333',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutIcon: {
    backgroundColor: '#fff0f0',
  },
  logoutText: {
    color: '#FF6B6B',
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appVersionText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: '#999',
  },
});