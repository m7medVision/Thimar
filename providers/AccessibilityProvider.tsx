import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AccessibilityInfo,
  Platform,
  I18nManager,
  AccessibilityChangeEvent,
  AccessibilityRole,
  AccessibilityState,
} from 'react-native';

interface AccessibilityContextType {
  isScreenReaderEnabled: boolean;
  isReduceMotionEnabled: boolean;
  isReduceTransparencyEnabled: boolean;
  isHighContrastEnabled: boolean;
  fontSizeMultiplier: number;
  preferredLanguage: 'ar' | 'en';
  setPreferredLanguage: (language: 'ar' | 'en') => void;
  announceForAccessibility: (message: string) => void;
  setAccessibilityFocus: (elementRef: any) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);
  const [isReduceTransparencyEnabled, setIsReduceTransparencyEnabled] = useState(false);
  const [isHighContrastEnabled, setIsHighContrastEnabled] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
  const [preferredLanguage, setPreferredLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    // Check initial accessibility settings
    checkAccessibilitySettings();

    // Listen for accessibility changes
    const screenReaderChangeSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (enabled: boolean) => {
        setIsScreenReaderEnabled(enabled);
        if (enabled) {
          announceForAccessibility('قارئ الشاشة مفعّل');
        }
      }
    );

    const reduceMotionChangeSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled: boolean) => {
        setIsReduceMotionEnabled(enabled);
      }
    );

    const reduceTransparencyChangeSubscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      (enabled: boolean) => {
        setIsReduceTransparencyEnabled(enabled);
      }
    );

    // For high contrast detection (may not be available on all platforms)
    if (Platform.OS === 'ios') {
      AccessibilityInfo.isReduceTransparencyEnabled().then(setIsReduceTransparencyEnabled);
    }

    // Get font size multiplier
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      setIsScreenReaderEnabled(enabled);
    });

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setIsReduceMotionEnabled(enabled);
    });

    // Cleanup subscriptions
    return () => {
      screenReaderChangeSubscription?.remove();
      reduceMotionChangeSubscription?.remove();
      reduceTransparencyChangeSubscription?.remove();
    };
  }, []);

  const checkAccessibilitySettings = async () => {
    try {
      const screenReader = await AccessibilityInfo.isScreenReaderEnabled();
      const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
      const reduceTransparency = await AccessibilityInfo.isReduceTransparencyEnabled();

      setIsScreenReaderEnabled(screenReader);
      setIsReduceMotionEnabled(reduceMotion);
      setIsReduceTransparencyEnabled(reduceTransparency);
    } catch (error) {
      console.warn('Error checking accessibility settings:', error);
    }
  };

  const announceForAccessibility = (message: string) => {
    if (isScreenReaderEnabled) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  };

  const setAccessibilityFocus = (elementRef: any) => {
    if (isScreenReaderEnabled && elementRef) {
      try {
        AccessibilityInfo.setAccessibilityFocus(elementRef);
      } catch (error) {
        console.warn('Error setting accessibility focus:', error);
      }
    }
  };

  const handleLanguageChange = (language: 'ar' | 'en') => {
    setPreferredLanguage(language);

    // Update RTL/LTR based on language
    if (language === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      announceForAccessibility('تم تغيير اللغة إلى العربية');
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      announceForAccessibility('Language changed to English');
    }
  };

  const value: AccessibilityContextType = {
    isScreenReaderEnabled,
    isReduceMotionEnabled,
    isReduceTransparencyEnabled,
    isHighContrastEnabled,
    fontSizeMultiplier,
    preferredLanguage,
    setPreferredLanguage: handleLanguageChange,
    announceForAccessibility,
    setAccessibilityFocus,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// Utility functions for common accessibility patterns
export const AccessibilityUtils = {
  // Generate accessibility labels for Arabic content
  createLabel: (arabicText: string, englishText?: string) => {
    return englishText ? `${arabicText} (${englishText})` : arabicText;
  },

  // Create proper accessibility hints
  createHint: (action: string, context?: string) => {
    const actionMap: Record<string, string> = {
      'tap': 'اضغط',
      'doubleTap': 'اضغط مرتين',
      'swipe': 'اسحب',
      'pinch': 'قرص',
      'scroll': 'مرر',
    };

    const baseHint = actionMap[action] || action;
    return context ? `${baseHint} ${context}` : baseHint;
  },

  // Get proper accessibility role for Arabic content
  getRole: (type: string): AccessibilityRole => {
    const roleMap: Record<string, AccessibilityRole> = {
      'button': 'button',
      'link': 'link',
      'image': 'image',
      'text': 'text',
      'search': 'search',
      'header': 'header',
      'list': 'list',
      'listitem': 'listitem',
      'tab': 'tab',
      'tabbar': 'tabbar',
      'alert': 'alert',
      'summary': 'summary',
    };

    return roleMap[type] || 'none';
  },

  // Create accessibility state
  createState: (options: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean;
    busy?: boolean;
    expanded?: boolean;
  }): AccessibilityState => {
    return {
      disabled: options.disabled,
      selected: options.selected,
      checked: options.checked,
      busy: options.busy,
      expanded: options.expanded,
    };
  },
};