/**
 * Offline Functionality and Caching Strategies
 * Phase 3 Implementation - Comprehensive offline support for rural Oman
 *
 * This module provides robust offline functionality specifically designed for
 * intermittent connectivity common in rural areas of Oman.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { networkManager } from './performance';

// Offline storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'offline_products',
  CATEGORIES: 'offline_categories',
  USER_CART: 'offline_cart',
  USER_PREFERENCES: 'offline_preferences',
  PENDING_ACTIONS: 'pending_actions',
  SEARCH_HISTORY: 'search_history',
  VOICE_CACHE: 'voice_commands_cache',
  IMAGES: 'cached_images',
  LAST_SYNC: 'last_sync_timestamp',
  APP_VERSION: 'app_version',
};

// Data synchronization status
export enum SyncStatus {
  IDLE = 'idle',
  SYNCING = 'syncing',
  OFFLINE = 'offline',
  ERROR = 'error',
  COMPLETED = 'completed',
}

// Pending action types for offline queue
export interface PendingAction {
  id: string;
  type: 'add_to_cart' | 'remove_from_cart' | 'update_quantity' | 'add_favorite' | 'remove_favorite';
  payload: any;
  timestamp: number;
  retries: number;
  priority: 'high' | 'medium' | 'low';
}

// Offline data structure
export interface OfflineData {
  products: any[];
  categories: any[];
  cart: any[];
  userPreferences: any;
  lastSync: number;
  version: string;
}

// Comprehensive offline manager
export class OfflineStorageManager {
  private syncStatus: SyncStatus = SyncStatus.IDLE;
  private pendingActions: PendingAction[] = [];
  private syncCallbacks: Array<(status: SyncStatus) => void> = [];
  private autoSyncInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeOfflineStorage();
    this.startAutoSync();
  }

  // Initialize offline storage with default data
  private async initializeOfflineStorage(): Promise<void> {
    try {
      await this.loadPendingActions();
      await this.pruneExpiredData();
      await this.migrateDataIfNeeded();
    } catch (error) {
      console.error('Failed to initialize offline storage:', error);
    }
  }

  // Load pending actions from storage
  private async loadPendingActions(): Promise<void> {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.PENDING_ACTIONS);
      if (saved) {
        this.pendingActions = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load pending actions:', error);
      this.pendingActions = [];
    }
  }

  // Save pending actions to storage
  private async savePendingActions(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PENDING_ACTIONS,
        JSON.stringify(this.pendingActions)
      );
    } catch (error) {
      console.warn('Failed to save pending actions:', error);
    }
  }

  // Prune expired cached data
  private async pruneExpiredData(): Promise<void> {
    const now = Date.now();
    const lastSync = await this.getLastSyncTimestamp();

    // If data is older than 7 days, clear it
    if (lastSync && (now - lastSync) > 7 * 24 * 60 * 60 * 1000) {
      await this.clearExpiredCache();
    }
  }

  // Clear expired cache entries
  private async clearExpiredCache(): Promise<void> {
    const keysToClear = [
      STORAGE_KEYS.PRODUCTS,
      STORAGE_KEYS.CATEGORIES,
      STORAGE_KEYS.SEARCH_HISTORY,
      STORAGE_KEYS.IMAGES,
    ];

    for (const key of keysToClear) {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.warn(`Failed to clear cache key ${key}:`, error);
      }
    }
  }

  // Migrate data between app versions
  private async migrateDataIfNeeded(): Promise<void> {
    try {
      const currentVersion = await AsyncStorage.getItem(STORAGE_KEYS.APP_VERSION);
      const newVersion = '3.0.0'; // Current app version

      if (currentVersion !== newVersion) {
        // Perform migration logic here
        await this.performDataMigration(currentVersion, newVersion);
        await AsyncStorage.setItem(STORAGE_KEYS.APP_VERSION, newVersion);
      }
    } catch (error) {
      console.warn('Data migration failed:', error);
    }
  }

  // Perform data migration between versions
  private async performDataMigration(fromVersion: string | null, toVersion: string): Promise<void> {
    console.log(`Migrating from ${fromVersion} to ${toVersion}`);

    // Migration logic based on version
    if (!fromVersion || fromVersion < '3.0.0') {
      // Add new fields or restructure data
      const userData = await this.getUserData();
      if (userData) {
        // Update data structure
        await this.saveUserData({
          ...userData,
          voiceCommandsEnabled: true,
          offlineModePreferred: false,
        });
      }
    }
  }

  // Get last sync timestamp
  private async getLastSyncTimestamp(): Promise<number | null> {
    try {
      const timestamp = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch (error) {
      return null;
    }
  }

  // Save data to offline storage
  public async saveData<T>(key: string, data: T, ttl?: number): Promise<void> {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        expires: ttl ? Date.now() + ttl : null,
      };

      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      throw error;
    }
  }

  // Get data from offline storage
  public async getData<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) return null;

      const parsedItem = JSON.parse(item);

      // Check if item has expired
      if (parsedItem.expires && Date.now() > parsedItem.expires) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return parsedItem.data;
    } catch (error) {
      console.error(`Failed to get data for key ${key}:`, error);
      return null;
    }
  }

  // Cache products for offline browsing
  public async cacheProducts(products: any[]): Promise<void> {
    try {
      await this.saveData(STORAGE_KEYS.PRODUCTS, products, 24 * 60 * 60 * 1000); // 24 hours TTL
      console.log(`Cached ${products.length} products for offline access`);
    } catch (error) {
      console.error('Failed to cache products:', error);
    }
  }

  // Get cached products
  public async getCachedProducts(): Promise<any[]> {
    const products = await this.getData<any[]>(STORAGE_KEYS.PRODUCTS);
    return products || [];
  }

  // Cache categories
  public async cacheCategories(categories: any[]): Promise<void> {
    try {
      await this.saveData(STORAGE_KEYS.CATEGORIES, categories, 7 * 24 * 60 * 60 * 1000); // 7 days TTL
    } catch (error) {
      console.error('Failed to cache categories:', error);
    }
  }

  // Get cached categories
  public async getCachedCategories(): Promise<any[]> {
    const categories = await this.getData<any[]>(STORAGE_KEYS.CATEGORIES);
    return categories || [];
  }

  // Add action to pending queue
  public async queueAction(
    type: PendingAction['type'],
    payload: any,
    priority: PendingAction['priority'] = 'medium'
  ): Promise<void> {
    const action: PendingAction = {
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      payload,
      timestamp: Date.now(),
      retries: 0,
      priority,
    };

    // Insert action based on priority
    if (priority === 'high') {
      this.pendingActions.unshift(action);
    } else {
      this.pendingActions.push(action);
    }

    await this.savePendingActions();
  }

  // Process pending actions when online
  public async processPendingActions(): Promise<void> {
    if (networkManager.getNetworkState() === 'offline') {
      return;
    }

    if (this.syncStatus === SyncStatus.SYNCING) {
      return; // Already syncing
    }

    this.updateSyncStatus(SyncStatus.SYNCING);

    try {
      const actionsToProcess = [...this.pendingActions];
      this.pendingActions = [];

      for (const action of actionsToProcess) {
        try {
          await this.executeAction(action);
        } catch (error) {
          console.warn(`Failed to execute action ${action.id}:`, error);

          // Retry logic
          if (action.retries < 3) {
            action.retries++;
            this.pendingActions.push(action);
          } else {
            // Mark action as failed after 3 retries
            console.error(`Action ${action.id} failed after 3 retries`);
          }
        }
      }

      await this.savePendingActions();
      this.updateSyncStatus(SyncStatus.COMPLETED);

      // Reset to idle after a delay
      setTimeout(() => {
        this.updateSyncStatus(SyncStatus.IDLE);
      }, 2000);

    } catch (error) {
      console.error('Failed to process pending actions:', error);
      this.updateSyncStatus(SyncStatus.ERROR);
    }
  }

  // Execute a single pending action
  private async executeAction(action: PendingAction): Promise<void> {
    // In a real implementation, this would make API calls
    console.log(`Executing action: ${action.type}`, action.payload);

    switch (action.type) {
      case 'add_to_cart':
        await this.syncAddToCart(action.payload);
        break;
      case 'remove_from_cart':
        await this.syncRemoveFromCart(action.payload);
        break;
      case 'update_quantity':
        await this.syncUpdateQuantity(action.payload);
        break;
      case 'add_favorite':
        await this.syncAddFavorite(action.payload);
        break;
      case 'remove_favorite':
        await this.syncRemoveFavorite(action.payload);
        break;
    }
  }

  // Sync cart addition
  private async syncAddToCart(payload: { productId: string; quantity: number }): Promise<void> {
    // API call to sync with server
    console.log('Syncing add to cart:', payload);
  }

  // Sync cart removal
  private async syncRemoveFromCart(payload: { productId: string }): Promise<void> {
    // API call to sync with server
    console.log('Syncing remove from cart:', payload);
  }

  // Sync quantity update
  private async syncUpdateQuantity(payload: { productId: string; quantity: number }): Promise<void> {
    // API call to sync with server
    console.log('Syncing quantity update:', payload);
  }

  // Sync favorite addition
  private async syncAddFavorite(payload: { productId: string }): Promise<void> {
    // API call to sync with server
    console.log('Syncing add favorite:', payload);
  }

  // Sync favorite removal
  private async syncRemoveFavorite(payload: { productId: string }): Promise<void> {
    // API call to sync with server
    console.log('Syncing remove favorite:', payload);
  }

  // Get user data from offline storage
  public async getUserData(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  }

  // Save user data to offline storage
  public async saveUserData(userData: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }

  // Get offline cart
  public async getOfflineCart(): Promise<any[]> {
    try {
      const cart = await AsyncStorage.getItem(STORAGE_KEYS.USER_CART);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      return [];
    }
  }

  // Save offline cart
  public async saveOfflineCart(cart: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_CART, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save offline cart:', error);
    }
  }

  // Add to cart (offline first)
  public async addToCart(productId: string, quantity: number = 1): Promise<void> {
    try {
      // Add to local cart
      const cart = await this.getOfflineCart();
      const existingItem = cart.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ productId, quantity, timestamp: Date.now() });
      }

      await this.saveOfflineCart(cart);

      // Queue action for sync
      await this.queueAction('add_to_cart', { productId, quantity }, 'high');

    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  }

  // Remove from cart (offline first)
  public async removeFromCart(productId: string): Promise<void> {
    try {
      // Remove from local cart
      const cart = await this.getOfflineCart();
      const updatedCart = cart.filter(item => item.productId !== productId);
      await this.saveOfflineCart(updatedCart);

      // Queue action for sync
      await this.queueAction('remove_from_cart', { productId }, 'high');

    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  }

  // Update cart quantity
  public async updateQuantity(productId: string, quantity: number): Promise<void> {
    try {
      // Update local cart
      const cart = await this.getOfflineCart();
      const item = cart.find(item => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        item.timestamp = Date.now();
        await this.saveOfflineCart(cart);

        // Queue action for sync
        await this.queueAction('update_quantity', { productId, quantity }, 'medium');
      }

    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  }

  // Search in cached products
  public async searchOfflineProducts(query: string): Promise<any[]> {
    try {
      const products = await this.getCachedProducts();

      if (!query) return products;

      const normalizedQuery = query.toLowerCase().trim();

      // Simple text search implementation
      return products.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery) ||
        product.category?.toLowerCase().includes(normalizedQuery)
      );
    } catch (error) {
      console.error('Failed to search offline products:', error);
      return [];
    }
  }

  // Save search history
  public async saveSearchQuery(query: string): Promise<void> {
    try {
      const history = await this.getData<string[]>(STORAGE_KEYS.SEARCH_HISTORY) || [];
      const updatedHistory = [query, ...history.filter(h => h !== query)].slice(0, 20);
      await this.saveData(STORAGE_KEYS.SEARCH_HISTORY, updatedHistory);
    } catch (error) {
      console.error('Failed to save search query:', error);
    }
  }

  // Get search history
  public async getSearchHistory(): Promise<string[]> {
    return this.getData<string[]>(STORAGE_KEYS.SEARCH_HISTORY) || [];
  }

  // Update sync status and notify listeners
  private updateSyncStatus(status: SyncStatus): void {
    this.syncStatus = status;
    this.syncCallbacks.forEach(callback => callback(status));
  }

  // Subscribe to sync status changes
  public onSyncStatusChange(callback: (status: SyncStatus) => void): void {
    this.syncCallbacks.push(callback);
  }

  // Unsubscribe from sync status changes
  public offSyncStatusChange(callback: (status: SyncStatus) => void): void {
    const index = this.syncCallbacks.indexOf(callback);
    if (index > -1) {
      this.syncCallbacks.splice(index, 1);
    }
  }

  // Get current sync status
  public getSyncStatus(): SyncStatus {
    return this.syncStatus;
  }

  // Get pending actions count
  public getPendingActionsCount(): number {
    return this.pendingActions.length;
  }

  // Start automatic sync
  private startAutoSync(): void {
    this.autoSyncInterval = setInterval(() => {
      if (networkManager.getNetworkState() !== 'offline') {
        this.processPendingActions();
      }
    }, 30000); // Check every 30 seconds
  }

  // Stop automatic sync
  public stopAutoSync(): void {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
    }
  }

  // Force sync now
  public async forceSync(): Promise<void> {
    await this.processPendingActions();
  }

  // Clear all offline data
  public async clearAllData(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
      this.pendingActions = [];
      this.updateSyncStatus(SyncStatus.IDLE);
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  }

  // Get storage usage statistics
  public async getStorageStats(): Promise<any> {
    try {
      const stats: any = {};

      for (const [name, key] of Object.entries(STORAGE_KEYS)) {
        const data = await AsyncStorage.getItem(key);
        stats[name] = {
          key,
          size: data ? new Blob([data]).size : 0,
          exists: !!data,
        };
      }

      stats.totalSize = Object.values(stats).reduce((sum: number, item: any) => sum + item.size, 0);
      stats.pendingActions = this.getPendingActionsCount();
      stats.syncStatus = this.syncStatus;

      return stats;
    } catch (error) {
      console.error('Failed to get storage stats:', error);
      return null;
    }
  }
}

// Preload essential data for offline use
export class DataPreloader {
  private offlineManager: OfflineStorageManager;

  constructor(offlineManager: OfflineStorageManager) {
    this.offlineManager = offlineManager;
  }

  // Preload essential data for offline use
  public async preloadEssentialData(): Promise<void> {
    try {
      console.log('Starting essential data preload...');

      // Preload Arabic localization data
      await this.preloadArabicData();

      // Preload voice command patterns
      await this.preloadVoiceCommands();

      // Preload common categories
      await this.preloadCategories();

      // Preload popular products
      await this.preloadPopularProducts();

      console.log('Essential data preload completed');
    } catch (error) {
      console.error('Failed to preload essential data:', error);
    }
  }

  // Preload Arabic localization data
  private async preloadArabicData(): Promise<void> {
    const arabicData = {
      interface: {
        home: 'الرئيسية',
        cart: 'سلة التسوق',
        categories: 'الفئات',
        profile: 'ملف التعريف',
        search: 'بحث',
      },
      products: {
        addToCart: 'أضف إلى السلة',
        removeFromCart: 'أحذف من السلة',
        inStock: 'متوفر',
        outOfStock: 'غير متوفر',
      },
      accessibility: {
        loading: 'جاري التحميل...',
        error: 'حدث خطأ',
        retry: 'أعد المحاولة',
      },
    };

    await this.offlineManager.saveData('arabic_localization', arabicData);
  }

  // Preload voice command patterns
  private async preloadVoiceCommands(): Promise<void> {
    const voiceCommands = {
      navigation: [
        { pattern: 'اذهب إلى الرئيسية', action: 'navigate_home' },
        { pattern: 'اذهب إلى السلة', action: 'navigate_cart' },
        { pattern: 'اذهب إلى الملف الشخصي', action: 'navigate_profile' },
      ],
      cart: [
        { pattern: 'أضف إلى السلة', action: 'add_to_cart' },
        { pattern: 'أكمل الشراء', action: 'checkout' },
      ],
      search: [
        { pattern: 'ابحث عن', action: 'search' },
        { pattern: 'تمر', action: 'search_dates' },
        { pattern: 'فواكه', action: 'search_fruits' },
      ],
    };

    await this.offlineManager.saveData('voice_commands', voiceCommands);
  }

  // Preload categories
  private async preloadCategories(): Promise<any[]> {
    const categories = [
      { id: 'dates', name: 'تمور', icon: '🌴', productCount: 15 },
      { id: 'fruits', name: 'فواكه', icon: '🍎', productCount: 24 },
      { id: 'vegetables', name: 'خضروات', icon: '🥬', productCount: 18 },
      { id: 'honey', name: 'عسل', icon: '🍯', productCount: 8 },
      { id: 'nuts', name: 'مكسرات', icon: '🥜', productCount: 12 },
    ];

    await this.offlineManager.cacheCategories(categories);
    return categories;
  }

  // Preload popular products
  private async preloadPopularProducts(): Promise<any[]> {
    const popularProducts = [
      {
        id: '1',
        name: 'تمر مجيد',
        price: 12.5,
        category: 'تمور',
        rating: 4.5,
        image: 'https://example.com/dates1.jpg',
      },
      {
        id: '2',
        name: 'برتقال عماني',
        price: 8.0,
        category: 'فواكه',
        rating: 4.2,
        image: 'https://example.com/orange.jpg',
      },
      {
        id: '3',
        name: 'عسل السدر',
        price: 25.0,
        category: 'عسل',
        rating: 4.8,
        image: 'https://example.com/honey.jpg',
      },
    ];

    await this.offlineManager.cacheProducts(popularProducts);
    return popularProducts;
  }
}

// Export singleton instances
export const offlineStorage = new OfflineStorageManager();
export const dataPreloader = new DataPreloader(offlineStorage);

export default {
  OfflineStorageManager,
  DataPreloader,
  SyncStatus,
  offlineStorage,
  dataPreloader,
};