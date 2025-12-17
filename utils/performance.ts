/**
 * Performance Optimization Utilities for Rural Omani Connectivity
 * Phase 3 Implementation - Low-connectivity optimization strategies
 *
 * This module implements performance optimizations specifically designed for
 * users in rural areas of Oman with limited internet connectivity.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

// Network connectivity states for Omani rural areas
export enum NetworkState {
  OFFLINE = 'offline',
  SLOW_2G = 'slow-2g',    // < 50 Kbps, > 2000ms latency
  EDGE = 'edge',          // 50-150 Kbps, 1000-2000ms latency
  3G_SLOW = '3g-slow',    // 150-350 Kbps, 500-1000ms latency
  3G = '3g',              // 350-500 Kbps, 300-500ms latency
  4G = '4g',              // > 500 Kbps, < 300ms latency
  WIFI = 'wifi',          // High speed, low latency
}

// Cache configuration optimized for Omani rural connectivity
export const CACHE_CONFIG = {
  // Product data (essential for offline browsing)
  PRODUCTS: {
    TTL: 24 * 60 * 60 * 1000,        // 24 hours
    MAX_SIZE: 50 * 1024 * 1024,      // 50MB
    PRIORITY: 'high',
  },

  // Product images (compressed for slow networks)
  IMAGES: {
    TTL: 7 * 24 * 60 * 60 * 1000,    // 7 days
    MAX_SIZE: 100 * 1024 * 1024,     // 100MB
    COMPRESSION_QUALITY: 0.6,        // 60% quality for slow networks
    THUMBNAIL_SIZE: { width: 150, height: 150 },
  },

  // Arabic fonts and localization
  FONTS: {
    TTL: 30 * 24 * 60 * 60 * 1000,   // 30 days (permanent cache)
    MAX_SIZE: 10 * 1024 * 1024,      // 10MB
    PRIORITY: 'critical',
  },

  // Voice command patterns and responses
  VOICE_COMMANDS: {
    TTL: -1,                          // Permanent cache
    MAX_SIZE: 5 * 1024 * 1024,       // 5MB
    PRIORITY: 'critical',
  },

  // User preferences and settings
  USER_PREFERENCES: {
    TTL: 30 * 24 * 60 * 60 * 1000,   // 30 days
    MAX_SIZE: 1 * 1024 * 1024,       // 1MB
    PRIORITY: 'high',
  },
};

// Network adaptation strategies
export const NETWORK_STRATEGIES = {
  [NetworkState.OFFLINE]: {
    imageQuality: 0.3,
    enableLazyLoading: false,
    enablePrefetch: false,
    enableCompression: true,
    batchRequests: false,
    retryAttempts: 0,
    timeoutMs: 0,
    offlineMode: true,
  },

  [NetworkState.SLOW_2G]: {
    imageQuality: 0.4,
    enableLazyLoading: true,
    enablePrefetch: false,
    enableCompression: true,
    batchRequests: true,
    retryAttempts: 1,
    timeoutMs: 15000,
    offlineMode: false,
  },

  [NetworkState.EDGE]: {
    imageQuality: 0.5,
    enableLazyLoading: true,
    enablePrefetch: false,
    enableCompression: true,
    batchRequests: true,
    retryAttempts: 2,
    timeoutMs: 10000,
    offlineMode: false,
  },

  [NetworkState['3G_SLOW']]: {
    imageQuality: 0.6,
    enableLazyLoading: true,
    enablePrefetch: false,
    enableCompression: true,
    batchRequests: true,
    retryAttempts: 3,
    timeoutMs: 8000,
    offlineMode: false,
  },

  [NetworkState['3G']]: {
    imageQuality: 0.7,
    enableLazyLoading: true,
    enablePrefetch: true,
    enableCompression: true,
    batchRequests: false,
    retryAttempts: 3,
    timeoutMs: 5000,
    offlineMode: false,
  },

  [NetworkState['4G']]: {
    imageQuality: 0.8,
    enableLazyLoading: false,
    enablePrefetch: true,
    enableCompression: false,
    batchRequests: false,
    retryAttempts: 3,
    timeoutMs: 3000,
    offlineMode: false,
  },

  [NetworkState.WIFI]: {
    imageQuality: 0.9,
    enableLazyLoading: false,
    enablePrefetch: true,
    enableCompression: false,
    batchRequests: false,
    retryAttempts: 3,
    timeoutMs: 2000,
    offlineMode: false,
  },
};

// Performance monitoring for rural Omani networks
export interface PerformanceMetrics {
  networkType: NetworkState;
  downloadSpeed: number;    // Kbps
  latency: number;          // milliseconds
  cacheHitRate: number;     // percentage
  bundleSize: number;       // KB
  renderTime: number;       // milliseconds
  errorRate: number;        // percentage
  userRegion?: string;      // Omani governorate
  connectionStability: number; // percentage
}

// Optimized image loader for slow networks
export class OptimizedImageLoader {
  private cache = new Map<string, any>();
  private loadingPromises = new Map<string, Promise<any>>();

  async loadImage(
    uri: string,
    quality: number = 0.7,
    dimensions?: { width: number; height: number }
  ): Promise<string> {
    // Check cache first
    const cacheKey = `${uri}_${quality}_${dimensions?.width}x${dimensions?.height}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    // Load and cache image
    const loadingPromise = this.loadAndCompressImage(uri, quality, dimensions);
    this.loadingPromises.set(cacheKey, loadingPromise);

    try {
      const result = await loadingPromise;
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn('Failed to load image:', uri, error);
      return uri; // Return original URI as fallback
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  private async loadAndCompressImage(
    uri: string,
    quality: number,
    dimensions?: { width: number; height: number }
  ): Promise<string> {
    // In a real implementation, this would use image manipulation libraries
    // For now, return the URI with compression parameters
    const params = new URLSearchParams({
      q: quality.toString(),
      w: dimensions?.width.toString() || '',
      h: dimensions?.height.toString() || '',
    });

    return `${uri}?${params.toString()}`;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Intelligent caching system
export class SmartCache {
  private cache = new Map<string, { data: any; timestamp: number; expires: number }>();
  private maxSize: number;
  private cleanupInterval: NodeJS.Timeout;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
    this.startCleanup();
  }

  async set(key: string, data: any, ttl: number = CACHE_CONFIG.PRODUCTS.TTL): Promise<void> {
    const timestamp = Date.now();
    const expires = timestamp + ttl;

    // Remove oldest item if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, { data, timestamp, expires });

    // Persist to AsyncStorage for offline access
    try {
      await AsyncStorage.setItem(`cache_${key}`, JSON.stringify({ data, expires }));
    } catch (error) {
      console.warn('Failed to cache to AsyncStorage:', error);
    }
  }

  async get(key: string): Promise<any | null> {
    // Check memory cache first
    const memoryItem = this.cache.get(key);
    if (memoryItem && Date.now() < memoryItem.expires) {
      return memoryItem.data;
    }

    // Check persisted cache
    try {
      const persistedItem = await AsyncStorage.getItem(`cache_${key}`);
      if (persistedItem) {
        const { data, expires } = JSON.parse(persistedItem);
        if (Date.now() < expires) {
          // Restore to memory cache
          this.cache.set(key, { data, timestamp: Date.now(), expires });
          return data;
        } else {
          // Remove expired item
          await AsyncStorage.removeItem(`cache_${key}`);
        }
      }
    } catch (error) {
      console.warn('Failed to read from AsyncStorage:', error);
    }

    return null;
  }

  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000); // Clean up every hour
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now >= item.expires) {
        this.cache.delete(key);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Network adaptation manager
export class NetworkAdaptationManager {
  private currentNetworkState: NetworkState = NetworkState.WIFI;
  private metrics: PerformanceMetrics;
  private smartCache: SmartCache;
  private imageLoader: OptimizedImageLoader;

  constructor() {
    this.smartCache = new SmartCache(200);
    this.imageLoader = new OptimizedImageLoader();
    this.metrics = this.initializeMetrics();
    this.startNetworkMonitoring();
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      networkType: NetworkState.WIFI,
      downloadSpeed: 1000,
      latency: 100,
      cacheHitRate: 0,
      bundleSize: 2100,
      renderTime: 16,
      errorRate: 0,
      connectionStability: 100,
    };
  }

  private startNetworkMonitoring(): void {
    // Monitor network conditions
    setInterval(async () => {
      try {
        const netInfo = await NetInfo.fetch();
        this.updateNetworkState(netInfo);
        this.optimizeForCurrentNetwork();
      } catch (error) {
        console.warn('Network monitoring failed:', error);
      }
    }, 5000); // Check every 5 seconds
  }

  private updateNetworkState(netInfo: any): void {
    if (!netInfo.isConnected) {
      this.currentNetworkState = NetworkState.OFFLINE;
      return;
    }

    const { effectiveType, downlink, rtt } = netInfo;

    // Map to our network states
    if (effectiveType === 'slow-2g' || downlink < 50) {
      this.currentNetworkState = NetworkState.SLOW_2G;
    } else if (effectiveType === '2g' || downlink < 150) {
      this.currentNetworkState = NetworkState.EDGE;
    } else if (effectiveType === '3g' && downlink < 350) {
      this.currentNetworkState = NetworkState['3G_SLOW'];
    } else if (effectiveType === '3g' || downlink < 500) {
      this.currentNetworkState = NetworkState['3G'];
    } else if (effectiveType === '4g' || downlink >= 500) {
      this.currentNetworkState = NetworkState['4G'];
    } else if (netInfo.type === 'wifi') {
      this.currentNetworkState = NetworkState.WIFI;
    }

    this.metrics = {
      ...this.metrics,
      networkType: this.currentNetworkState,
      downloadSpeed: downlink * 125, // Convert Mbps to Kbps
      latency: rtt,
    };
  }

  private optimizeForCurrentNetwork(): void {
    const strategy = NETWORK_STRATEGIES[this.currentNetworkState];

    // Apply optimizations based on network state
    if (strategy.enableCompression) {
      this.enableCompression();
    }

    if (strategy.offlineMode) {
      this.enableOfflineMode();
    }
  }

  private enableCompression(): void {
    // Enable request/response compression
    console.log('Enabling compression for slow network');
  }

  private enableOfflineMode(): void {
    // Switch to fully offline mode
    console.log('Switching to offline mode');
  }

  public getNetworkState(): NetworkState {
    return this.currentNetworkState;
  }

  public getOptimizationStrategy(): any {
    return NETWORK_STRATEGIES[this.currentNetworkState];
  }

  public async getCachedData(key: string): Promise<any | null> {
    const startTime = Date.now();
    const data = await this.smartCache.get(key);

    if (data) {
      this.metrics.cacheHitRate = (this.metrics.cacheHitRate + 1) / 2; // Moving average
    }

    return data;
  }

  public async cacheData(key: string, data: any, ttl?: number): Promise<void> {
    await this.smartCache.set(key, data, ttl);
  }

  public async loadOptimizedImage(
    uri: string,
    customQuality?: number
  ): Promise<string> {
    const strategy = NETWORK_STRATEGIES[this.currentNetworkState];
    const quality = customQuality || strategy.imageQuality;

    return this.imageLoader.loadImage(uri, quality);
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Bundle size optimization
  public getOptimizedBundleConfig(): any {
    return {
      codeSplitting: this.currentNetworkState !== NetworkState.WIFI,
      lazyLoading: this.currentNetworkState !== NetworkState.WIFI,
      treeShaking: true,
      minification: true,
      compression: this.currentNetworkState !== NetworkState.WIFI,
      fontSubsetting: true, // Only load Arabic characters
      imageOptimization: true,
    };
  }

  // Prefetch strategy for different network conditions
  public getPrefetchStrategy(): any {
    const strategy = NETWORK_STRATEGIES[this.currentNetworkState];

    return {
      enabled: strategy.enablePrefetch,
      priority: this.currentNetworkState === NetworkState.WIFI ? 'high' : 'low',
      batchSize: strategy.batchRequests ? 3 : 10,
      maxConcurrent: this.currentNetworkState === NetworkState.OFFLINE ? 0 : 3,
    };
  }
}

// Offline functionality manager
export class OfflineManager {
  private networkManager: NetworkAdaptationManager;
  private offlineQueue: Array<{ url: string; method: string; data?: any }> = [];

  constructor(networkManager: NetworkAdaptationManager) {
    this.networkManager = networkManager;
    this.loadOfflineQueue();
  }

  // Queue actions for when network is available
  public queueAction(url: string, method: string, data?: any): void {
    this.offlineQueue.push({ url, method, data });
    this.saveOfflineQueue();
  }

  // Process queued actions when network is restored
  public async processQueue(): Promise<void> {
    if (this.networkManager.getNetworkState() === NetworkState.OFFLINE) {
      return;
    }

    const actionsToProcess = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const action of actionsToProcess) {
      try {
        await this.executeAction(action);
      } catch (error) {
        console.warn('Failed to execute queued action:', action, error);
        // Re-queue failed actions
        this.offlineQueue.push(action);
      }
    }

    this.saveOfflineQueue();
  }

  private async executeAction(action: { url: string; method: string; data?: any }): Promise<void> {
    // In a real implementation, this would make actual API calls
    console.log('Executing queued action:', action);
  }

  private async saveOfflineQueue(): Promise<void> {
    try {
      await AsyncStorage.setItem('offline_queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.warn('Failed to save offline queue:', error);
    }
  }

  private async loadOfflineQueue(): Promise<void> {
    try {
      const saved = await AsyncStorage.getItem('offline_queue');
      if (saved) {
        this.offlineQueue = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load offline queue:', error);
    }
  }

  public getQueueLength(): number {
    return this.offlineQueue.length;
  }
}

// Performance monitoring and reporting
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private startTime: number = Date.now();

  public startTimer(name: string): void {
    this.metrics.set(name, []);
  }

  public endTimer(name: string): number {
    const times = this.metrics.get(name) || [];
    const endTime = Date.now();
    const duration = endTime - this.startTime;
    times.push(duration);
    this.metrics.set(name, times);
    return duration;
  }

  public getAverageTime(name: string): number {
    const times = this.metrics.get(name) || [];
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  public generateReport(): any {
    const report: any = {};

    for (const [name, times] of this.metrics.entries()) {
      report[name] = {
        average: this.getAverageTime(name),
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length,
        total: times.reduce((sum, time) => sum + time, 0),
      };
    }

    return {
      ...report,
      sessionDuration: Date.now() - this.startTime,
      timestamp: new Date().toISOString(),
    };
  }
}

// Utility functions for performance optimization
export const PerformanceUtils = {
  // Debounce function for search input
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Memoize expensive computations
  memoize: <T extends (...args: any[]) => any>(func: T): T => {
    const cache = new Map();
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },

  // Lazy load components
  lazyLoad: <T extends React.ComponentType<any>>(importFunc: () => Promise<{ default: T }>) => {
    return React.lazy(importFunc);
  },
};

// Export singleton instances
export const networkManager = new NetworkAdaptationManager();
export const offlineManager = new OfflineManager(networkManager);
export const performanceMonitor = new PerformanceMonitor();

export default {
  NetworkState,
  CACHE_CONFIG,
  NETWORK_STRATEGIES,
  OptimizedImageLoader,
  SmartCache,
  NetworkAdaptationManager,
  OfflineManager,
  PerformanceMonitor,
  PerformanceUtils,
  networkManager,
  offlineManager,
  performanceMonitor,
};