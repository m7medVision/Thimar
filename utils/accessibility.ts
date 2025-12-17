import { AccessibilityRole, AccessibilityState } from 'react-native';

// Arabic accessibility constants
export const ARABIC_ACCESSIBILITY = {
  // Common actions
  ACTIONS: {
    TAP: 'اضغط',
    DOUBLE_TAP: 'اضغط مرتين',
    SWIPE: 'اسحب',
    SCROLL: 'مرر',
    PINCH: 'قرص',
    DRAG: 'اسحب',
  },

  // Common states
  STATES: {
    ENABLED: 'مفعّل',
    DISABLED: 'معطّل',
    SELECTED: 'محدد',
    NOT_SELECTED: 'غير محدد',
    CHECKED: 'محدد',
    UNCHECKED: 'غير محدد',
    EXPANDED: 'موسّع',
    COLLAPSED: 'مطوي',
    BUSY: 'مشغول',
    LOADING: 'جاري التحميل',
  },

  // Navigation hints
  NAVIGATION: {
    GO_BACK: 'ارجع',
    GO_FORWARD: 'تقدم',
    OPEN_MENU: 'افتح القائمة',
    CLOSE_MENU: 'اغلق القائمة',
    NAVIGATE: 'انتقل إلى',
    TAB: 'تبويب',
    LINK: 'رابط',
  },

  // Content types
  CONTENT: {
    IMAGE: 'صورة',
    BUTTON: 'زر',
    TEXT: 'نص',
    HEADING: 'عنوان',
    LIST: 'قائمة',
    LIST_ITEM: 'عنصر في قائمة',
    SEARCH: 'بحث',
    TAB_BAR: 'شريط التبويبات',
  },

  // Product-related labels
  PRODUCT: {
    IMAGE: 'صورة المنتج',
    NAME: 'اسم المنتج',
    PRICE: 'السعر',
    RATING: 'التقييم',
    ADD_TO_CART: 'أضف إلى السلة',
    FAVORITE: 'مفضلة',
    ORGANIC: 'عضوي',
    SEASONAL: 'موسمي',
    DETAILS: 'تفاصيل المنتج',
    DESCRIPTION: 'وصف المنتج',
    QUANTITY: 'الكمية',
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
  },

  // Cart-related labels
  CART: {
    CART: 'سلة التسوق',
    ADD_ITEM: 'أضف العنصر',
    REMOVE_ITEM: 'احذف العنصر',
    INCREASE_QUANTITY: 'زيادة الكمية',
    DECREASE_QUANTITY: 'إنقاص الكمية',
    TOTAL: 'الإجمالي',
    CHECKOUT: 'الدفع',
    EMPTY_CART: 'السلة فارغة',
  },

  // Form-related labels
  FORM: {
    REQUIRED: 'مطلوب',
    OPTIONAL: 'اختياري',
    INVALID: 'غير صالح',
    VALID: 'صالح',
    EMAIL: 'بريد إلكتروني',
    PASSWORD: 'كلمة المرور',
    USERNAME: 'اسم المستخدم',
    PHONE: 'رقم الهاتف',
    ADDRESS: 'العنوان',
  },

  // Error messages
  ERROR: {
    NETWORK_ERROR: 'خطأ في الاتصال بالشبكة',
    LOADING_ERROR: 'خطأ في التحميل',
    VALIDATION_ERROR: 'خطأ في التحقق',
    UNKNOWN_ERROR: 'خطأ غير معروف',
  },
} as const;

// Utility functions for creating accessible labels and hints
export class AccessibilityLabelBuilder {
  private parts: string[] = [];

  addText(text: string): this {
    if (text && text.trim()) {
      this.parts.push(text.trim());
    }
    return this;
  }

  addCondition(condition: boolean, text: string): this {
    if (condition && text && text.trim()) {
      this.parts.push(text.trim());
    }
    return this;
  }

  addSeparator(separator: string = '، '): this {
    if (this.parts.length > 0) {
      this.parts.push(separator);
    }
    return this;
  }

  build(): string {
    return this.parts.join('').replace(/،\s*$/, '');
  }

  reset(): this {
    this.parts = [];
    return this;
  }
}

// Create accessible labels for products
export const createProductAccessibilityLabel = (product: {
  name: string;
  price: number;
  rating: number;
  isOrganic?: boolean;
  isSeasonal?: boolean;
  inStock?: boolean;
}) => {
  const builder = new AccessibilityLabelBuilder();

  builder
    .addText(`${ARABIC_ACCESSIBILITY.PRODUCT.NAME}: ${product.name}`)
    .addSeparator()
    .addText(`${ARABIC_ACCESSIBILITY.PRODUCT.PRICE}: ${product.price} ريال`)
    .addSeparator()
    .addText(`${ARABIC_ACCESSIBILITY.PRODUCT.RATING}: ${product.rating} من 5`);

  if (product.isOrganic) {
    builder.addSeparator().addText(ARABIC_ACCESSIBILITY.PRODUCT.ORGANIC);
  }

  if (product.isSeasonal) {
    builder.addSeparator().addText(ARABIC_ACCESSIBILITY.PRODUCT.SEASONAL);
  }

  const stockStatus = product.inStock !== false
    ? ARABIC_ACCESSIBILITY.PRODUCT.IN_STOCK
    : ARABIC_ACCESSIBILITY.PRODUCT.OUT_OF_STOCK;

  builder.addSeparator().addText(stockStatus);

  return builder.build();
};

// Create accessibility hints for common actions
export const createAccessibilityHint = (action: string, context?: string): string => {
  const actionMap: Record<string, string> = {
    'tap': ARABIC_ACCESSIBILITY.ACTIONS.TAP,
    'doubleTap': ARABIC_ACCESSIBILITY.ACTIONS.DOUBLE_TAP,
    'swipe': ARABIC_ACCESSIBILITY.ACTIONS.SWIPE,
    'scroll': ARABIC_ACCESSIBILITY.ACTIONS.SCROLL,
    'navigate': ARABIC_ACCESSIBILITY.NAVIGATION.NAVIGATE,
    'search': 'ابحث',
    'filter': 'فلتر',
    'sort': 'رتب',
    'refresh': 'حدث',
    'delete': 'احذف',
    'edit': 'عدل',
    'save': 'احفظ',
    'cancel': 'ألغ',
    'confirm': 'أكد',
  };

  const baseHint = actionMap[action] || action;
  return context ? `${baseHint} ${context}` : baseHint;
};

// Get proper accessibility role with Arabic support
export const getAccessibilityRole = (elementType: string): AccessibilityRole => {
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
    'radio': 'radio',
    'checkbox': 'checkbox',
    'switch': 'switch',
    'slider': 'adjustable',
    'progressbar': 'progressbar',
    'keyboardkey': 'keyboardkey',
  };

  return roleMap[elementType] || 'none';
};

// Create accessibility state
export const createAccessibilityState = (options: {
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
};

// Generate appropriate accessibility properties for TouchableOpacity
export const createTouchableProps = (
  label: string,
  hint?: string,
  role: AccessibilityRole = 'button',
  state?: Partial<AccessibilityState>
) => {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role,
    accessibilityState: state,
    // Ensure minimum touch target size (44x44)
    minimumTouchArea: {
      width: 44,
      height: 44,
    },
  };
};

// Generate appropriate accessibility properties for Text
export const createTextProps = (
  label: string,
  role: AccessibilityRole = 'text',
  important?: boolean
) => {
  return {
    accessible: important || false, // Text elements are usually decorative unless important
    accessibilityLabel: label,
    accessibilityRole: role,
  };
};

// Generate appropriate accessibility properties for Image
export const createImageProps = (
  label: string,
  decorative: boolean = false
) => {
  return {
    accessible: !decorative,
    accessibilityLabel: label,
    accessibilityRole: 'image',
  };
};

// Screen reader announcement utilities
export const announceMessage = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
  // This would be used with the AccessibilityProvider's announceForAccessibility
  return {
    message,
    politeness,
  };
};

// Common announcements for app states
export const ANNOUNCEMENTS = {
  PRODUCT_ADDED: 'تم إضافة المنتج إلى السلة',
  PRODUCT_REMOVED: 'تم حذف المنتج من السلة',
  CART_UPDATED: 'تم تحديث السلة',
  LOADING_COMPLETE: 'اكتمل التحميل',
  ERROR_OCCURRED: 'حدث خطأ',
  OPERATION_SUCCESSFUL: 'تمت العملية بنجاح',
  OPERATION_FAILED: 'فشلت العملية',
  NETWORK_ERROR: 'خطأ في الاتصال',
  NO_RESULTS: 'لا توجد نتائج',
  FILTERS_APPLIED: 'تم تطبيق الفلاتر',
  FILTERS_CLEARED: 'تم مسح الفلاتر',
} as const;