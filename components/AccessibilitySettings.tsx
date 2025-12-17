import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Slider,
  Alert,
  I18nManager
} from 'react-native';
import {
  Hand,
  Type,
  Contrast,
  Zap,
  ChevronLeft,
  RotateCcw
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAccessibility } from '@/providers/AccessibilityProvider';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESSIBILITY_SETTINGS_KEY = '@thimar_accessibility_settings';

interface AccessibilitySettingsState {
  hapticFeedback: boolean;
  highContrast: boolean;
  largeText: boolean;
  fontSize: number;
  reducedMotion: boolean;
}

export default function AccessibilitySettings() {
  const { announceForAccessibility, isScreenReaderEnabled, isReduceMotionEnabled } = useAccessibility();

  const [settings, setSettings] = useState<AccessibilitySettingsState>({
    hapticFeedback: true,
    highContrast: false,
    largeText: false,
    fontSize: 1.0,
    reducedMotion: isReduceMotionEnabled,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage
  useEffect(() => {
    loadSettings();
  }, []);

  // Save settings to storage
  useEffect(() => {
    if (!isLoading) {
      saveSettings();
    }
  }, [settings, isLoading]);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(ACCESSIBILITY_SETTINGS_KEY);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(ACCESSIBILITY_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettingsState>(
    key: K,
    value: AccessibilitySettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    // Provide haptic feedback for setting changes
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Announce setting change for screen readers
    if (isScreenReaderEnabled) {
      const settingNames: Record<string, string> = {
        hapticFeedback: 'الردع اللمسي',
        highContrast: 'التباين العالي',
        largeText: 'النص الكبير',
        fontSize: 'حجم الخط',
        reducedMotion: 'تقليل الحركة',
      };

      const settingName = settingNames[key];
      const status = typeof value === 'boolean' ? (value ? 'مفعّل' : 'معطّل') : `${value}`;
      announceForAccessibility(`${settingName}: ${status}`);
    }
  };

  const handleHapticFeedbackToggle = (value: boolean) => {
    updateSetting('hapticFeedback', value);

    // Provide haptic feedback to demonstrate the setting
    if (value) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleHighContrastToggle = (value: boolean) => {
    updateSetting('highContrast', value);

    Alert.alert(
      'التباين العالي',
      value
        ? 'تم تفعيل وضع التباين العالي. سيتم تحديث الألوان لتوفير تباين أفضل.'
        : 'تم إيقاف وضع التباين العالي.',
      [{ text: 'حسناً', style: 'default' }]
    );
  };

  const handleLargeTextToggle = (value: boolean) => {
    updateSetting('largeText', value);
    updateSetting('fontSize', value ? 1.3 : 1.0);
  };

  const handleFontSizeChange = (value: number) => {
    updateSetting('fontSize', value);
    updateSetting('largeText', value > 1.0);
  };

  const handleReducedMotionToggle = (value: boolean) => {
    updateSetting('reducedMotion', value);

    Alert.alert(
      'تقليل الحركة',
      value
        ? 'تم تفعيل تقليل الحركة. سيتم تقليل الرسوم المتحركة والانتقالات.'
        : 'تم إيقاف تقليل الحركة.',
      [{ text: 'حسناً', style: 'default' }]
    );
  };

  const resetToDefaults = () => {
    Alert.alert(
      'إعادة تعيين الإعدادات',
      'هل أنت متأكد من أنك تريد إعادة تعيين جميع إعدادات سهولة الوصول إلى القيم الافتراضية؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إعادة تعيين',
          style: 'destructive',
          onPress: () => {
            const defaultSettings: AccessibilitySettingsState = {
              hapticFeedback: true,
              highContrast: false,
              largeText: false,
              fontSize: 1.0,
              reducedMotion: false,
            };

            setSettings(defaultSettings);

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            announceForAccessibility('تم إعادة تعيين الإعدادات إلى القيم الافتراضية');
          }
        }
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    description,
    value,
    onToggle,
    type = 'switch'
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: boolean | number;
    onToggle: (value: boolean | number) => void;
    type?: 'switch' | 'slider';
  }) => {
    const isSwitch = type === 'switch';
    const isEnabled = typeof value === 'boolean' ? value : value > 1.0;

    return (
      <View style={[
        styles.settingItem,
        !settings.hapticFeedback && styles.settingItemNoHaptic
      ]}>
        <View style={styles.settingContent}>
          <View style={styles.settingIcon}>
            {icon}
          </View>
          <View style={styles.settingText}>
            <Text style={[
              styles.settingTitle,
              { fontSize: 16 * settings.fontSize }
            ]}>
              {title}
            </Text>
            <Text style={[
              styles.settingDescription,
              { fontSize: 13 * settings.fontSize }
            ]}>
              {description}
            </Text>
          </View>
        </View>

        {isSwitch ? (
          <Switch
            value={isEnabled}
            onValueChange={onToggle}
            trackColor={{ false: '#E0E0E0', true: settings.highContrast ? '#000000' : '#4CAF50' }}
            thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#E0E0E0"
          />
        ) : (
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0.8}
              maximumValue={1.5}
              value={value as number}
              onValueChange={onToggle}
              minimumTrackTintColor={settings.highContrast ? '#000000' : '#4CAF50'}
              maximumTrackTintColor={settings.highContrast ? '#CCCCCC' : '#E0E0E0'}
            />
            <Text style={styles.sliderValue}>
              {Math.round((value as number) * 100)}%
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {} /* Handle back navigation */}
          accessible={true}
          accessibilityLabel="الرجوع"
          accessibilityHint="اضغط للرجوع إلى الشاشة السابقة"
          accessibilityRole="button"
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إعدادات سهولة الوصول</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>العرض والمرئيات</Text>

          <SettingItem
            icon={<Contrast size={20} color={settings.highContrast ? '#000' : '#666'} />}
            title="التباين العالي"
            description="زيادة التباين بين الألوان لتسهيل القراءة"
            value={settings.highContrast}
            onToggle={handleHighContrastToggle}
          />

          <SettingItem
            icon={<Type size={20} color={settings.highContrast ? '#000' : '#666'} />}
            title="حجم الخط"
            description="تعديل حجم النص في التطبيق"
            value={settings.fontSize}
            onToggle={handleFontSizeChange}
            type="slider"
          />

          <SettingItem
            icon={<Type size={20} color={settings.highContrast ? '#000' : '#666'} />}
            title="نص كبير"
            description="استخدام نصوص كبيرة بشكل افتراضي"
            value={settings.largeText}
            onToggle={handleLargeTextToggle}
          />

          <SettingItem
            icon={<Zap size={20} color={settings.highContrast ? '#000' : '#666'} />}
            title="تقليل الحركة"
            description="تقليل الرسوم المتحركة والانتقالات"
            value={settings.reducedMotion}
            onToggle={handleReducedMotionToggle}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التفاعل</Text>

          <SettingItem
            icon={<Hand size={20} color={settings.highContrast ? '#000' : '#666'} />}
            title="الردع اللمسي"
            description="اهتزاز عند تنفيذ الإجراءات"
            value={settings.hapticFeedback}
            onToggle={handleHapticFeedbackToggle}
          />
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetToDefaults}
          accessible={true}
          accessibilityLabel="إعادة تعيين الإعدادات"
          accessibilityHint="إعادة جميع إعدادات سهولة الوصول إلى القيم الافتراضية"
          accessibilityRole="button"
        >
          <RotateCcw size={20} color="#F44336" />
          <Text style={styles.resetButtonText}>إعادة تعيين الإعدادات</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemNoHaptic: {
    opacity: 0.9,
  },
  settingContent: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: I18nManager.isRTL ? 0 : 12,
    marginLeft: I18nManager.isRTL ? 12 : 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Cairo-SemiBold',
    color: '#333',
  },
  settingDescription: {
    fontFamily: 'Cairo-Regular',
    color: '#666',
    marginTop: 2,
  },
  sliderContainer: {
    alignItems: 'center',
    width: 120,
  },
  slider: {
    width: 80,
    height: 30,
  },
  sliderValue: {
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  resetButton: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  resetButtonText: {
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    color: '#F44336',
    marginRight: I18nManager.isRTL ? 0 : 8,
    marginLeft: I18nManager.isRTL ? 8 : 0,
  },
});
