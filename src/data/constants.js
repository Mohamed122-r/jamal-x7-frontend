// App Constants
export const APP_NAME = 'JAMAL X7';
export const APP_TAGLINE = 'نصمم... نطور... ننجز';
export const APP_DESCRIPTION = 'منصة الخدمات الإبداعية المتكاملة التي تجمع بين الإبداع والتكنولوجيا';
export const APP_VERSION = '1.0.0';
export const APP_AUTHOR = 'JAMAL X7 Team';
export const APP_COPYRIGHT = `© ${new Date().getFullYear()} JAMAL X7. جميع الحقوق محفوظة.`;

// Contact Information
export const CONTACT_INFO = {
  phone: '+966 55 123 4567',
  whatsapp: '+966551234567',
  email: 'info@jamalx7.com',
  address: 'المملكة العربية السعودية',
  workingHours: {
    from: '9:00 ص',
    to: '6:00 م',
    days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
  }
};

// Social Media Links
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/jamalx7',
  twitter: 'https://twitter.com/jamalx7',
  instagram: 'https://instagram.com/jamalx7',
  linkedin: 'https://linkedin.com/company/jamalx7',
  youtube: 'https://youtube.com/c/jamalx7',
  behance: 'https://behance.net/jamalx7',
  dribbble: 'https://dribbble.com/jamalx7'
};

// Service Categories
export const SERVICE_CATEGORIES = [
  { id: 'design', name: 'التصميم', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
  { id: 'development', name: 'التطوير', icon: '💻', color: 'from-purple-500 to-pink-500' },
  { id: 'media', name: 'الميديا', icon: '🎬', color: 'from-red-500 to-orange-500' },
  { id: 'content', name: 'المحتوى', icon: '✍️', color: 'from-yellow-500 to-amber-500' },
  { id: 'consulting', name: 'الاستشارات', icon: '📊', color: 'from-green-500 to-emerald-500' },
  { id: 'marketing', name: 'التسويق', icon: '📈', color: 'from-indigo-500 to-blue-500' }
];

// Service Statuses
export const SERVICE_STATUS = {
  PENDING: { label: 'في الانتظار', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  PROCESSING: { label: 'قيد المعالجة', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  COMPLETED: { label: 'مكتمل', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  CANCELLED: { label: 'ملغى', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  DELIVERED: { label: 'تم التسليم', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' }
};

// Project Priorities
export const PROJECT_PRIORITIES = {
  LOW: { label: 'منخفضة', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' },
  MEDIUM: { label: 'متوسطة', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  HIGH: { label: 'عالية', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  URGENT: { label: 'عاجلة', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
};

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'bank_transfer', name: 'تحويل بنكي', icon: '🏦' },
  { id: 'credit_card', name: 'بطاقة ائتمان', icon: '💳' },
  { id: 'apple_pay', name: 'Apple Pay', icon: '' },
  { id: 'google_pay', name: 'Google Pay', icon: 'G' },
  { id: 'stc_pay', name: 'STC Pay', icon: '📱' },
  { id: 'mada', name: 'مدى', icon: '💳' }
];

// Service Packages
export const PACKAGE_TYPES = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
  CUSTOM: 'custom'
};

// Timeline Steps
export const PROJECT_TIMELINE = [
  { step: 1, title: 'الاستشارة', description: 'نفهم احتياجاتك وأهداف مشروعك', duration: '1-2 يوم' },
  { step: 2, title: 'التخطيط', description: 'نضع خطة تنفيذ مفصلة', duration: '2-3 أيام' },
  { step: 3, title: 'التصميم', description: 'نصمم الواجهات والتجارب', duration: '3-5 أيام' },
  { step: 4, title: 'التطوير', description: 'نطور الحلول التقنية', duration: '5-10 أيام' },
  { step: 5, title: 'الاختبار', description: 'نختبر الجودة والأداء', duration: '2-3 أيام' },
  { step: 6, title: 'التسليم', description: 'نسلم المشروع النهائي', duration: '1 يوم' },
  { step: 7, title: 'الدعم', description: 'نقدم الدعم والصيانة', duration: 'مستمر' }
];

// FAQ Categories
export const FAQ_CATEGORIES = [
  { id: 'general', name: 'عام', icon: '❓' },
  { id: 'services', name: 'الخدمات', icon: '⚙️' },
  { id: 'pricing', name: 'الأسعار', icon: '💰' },
  { id: 'process', name: 'العملية', icon: '🔄' },
  { id: 'support', name: 'الدعم', icon: '🛠️' },
  { id: 'technical', name: 'تقني', icon: '💻' }
];

// Languages
export const LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' }
];

// Countries
export const COUNTRIES = [
  { code: 'SA', name: 'السعودية', phoneCode: '+966', currency: 'SAR' },
  { code: 'AE', name: 'الإمارات', phoneCode: '+971', currency: 'AED' },
  { code: 'KW', name: 'الكويت', phoneCode: '+965', currency: 'KWD' },
  { code: 'QA', name: 'قطر', phoneCode: '+974', currency: 'QAR' },
  { code: 'BH', name: 'البحرين', phoneCode: '+973', currency: 'BHD' },
  { code: 'OM', name: 'عمان', phoneCode: '+968', currency: 'OMR' }
];

// File Types
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  DESIGN: ['psd', 'ai', 'fig', 'sketch', 'xd'],
  VIDEO: ['mp4', 'mov', 'avi', 'wmv', 'flv'],
  AUDIO: ['mp3', 'wav', 'ogg', 'm4a'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz']
};

// File Size Limits (in MB)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5,
  DOCUMENT: 10,
  DESIGN: 50,
  VIDEO: 100,
  AUDIO: 20,
  ARCHIVE: 100
};

// Colors
export const COLORS = {
  PRIMARY: '#FF6B00',
  PRIMARY_DARK: '#E55A00',
  PRIMARY_LIGHT: '#FFE0C2',
  SECONDARY: '#2D3748',
  SECONDARY_LIGHT: '#4A5568',
  ACCENT: '#4F46E5',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6'
};

// Gradients
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #FF6B00 0%, #FF8B42 100%)',
  SECONDARY: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
  ACCENT: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
  SUCCESS: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  WARNING: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  ERROR: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};

// Breakpoints
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

// Z-Index Levels
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.jamalx7.com',
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Services
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:id',
  SERVICE_CATEGORIES: '/services/categories',
  
  // Projects
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  PROJECT_STATUS: '/projects/:id/status',
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  ORDER_STATUS: '/orders/:id/status',
  
  // Messages
  MESSAGES: '/messages',
  CONTACT: '/contact',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_SETTINGS: '/users/settings',
  
  // Files
  UPLOAD: '/upload',
  FILES: '/files',
  
  // Statistics
  STATS: '/stats',
  DASHBOARD: '/dashboard'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'jamalx7-theme',
  ACCENT_COLOR: 'jamalx7-accent-color',
  LANGUAGE: 'jamalx7-language',
  TOKEN: 'jamalx7-token',
  USER: 'jamalx7-user',
  CART: 'jamalx7-cart',
  RECENT_PROJECTS: 'jamalx7-recent-projects',
  SETTINGS: 'jamalx7-settings'
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'هذا الحقل مطلوب',
  EMAIL: 'البريد الإلكتروني غير صحيح',
  PHONE: 'رقم الهاتف غير صحيح',
  MIN_LENGTH: 'يجب أن يكون على الأقل {min} أحرف',
  MAX_LENGTH: 'يجب أن يكون على الأكثر {max} أحرف',
  NUMERIC: 'يجب أن يكون رقماً',
  ALPHA: 'يجب أن يحتوي على أحرف عربية فقط',
  URL: 'الرابط غير صحيح',
  PASSWORD: 'يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص',
  CONFIRM_PASSWORD: 'كلمات المرور غير متطابقة'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTER: 'تم التسجيل بنجاح',
  LOGIN: 'تم تسجيل الدخول بنجاح',
  LOGOUT: 'تم تسجيل الخروج بنجاح',
  PROFILE_UPDATE: 'تم تحديث الملف الشخصي بنجاح',
  PASSWORD_CHANGE: 'تم تغيير كلمة المرور بنجاح',
  ORDER_CREATE: 'تم إنشاء الطلب بنجاح',
  ORDER_UPDATE: 'تم تحديث الطلب بنجاح',
  ORDER_CANCEL: 'تم إلغاء الطلب بنجاح',
  MESSAGE_SENT: 'تم إرسال الرسالة بنجاح',
  FILE_UPLOAD: 'تم رفع الملف بنجاح',
  SETTINGS_SAVE: 'تم حفظ الإعدادات بنجاح'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'حدث خطأ في الاتصال بالشبكة',
  SERVER: 'حدث خطأ في الخادم',
  UNAUTHORIZED: 'غير مصرح لك بالوصول',
  FORBIDDEN: 'غير مسموح لك بالوصول',
  NOT_FOUND: 'لم يتم العثور على المورد',
  VALIDATION: 'البيانات المدخلة غير صحيحة',
  DUPLICATE: 'البيانات مكررة',
  LIMIT_EXCEEDED: 'تم تجاوز الحد المسموح',
  FILE_SIZE: 'حجم الملف كبير جداً',
  FILE_TYPE: 'نوع الملف غير مسموح به',
  PAYMENT: 'حدث خطأ في الدفع',
  TIMEOUT: 'انتهت المهلة'
};

// SEO Defaults
export const SEO_DEFAULTS = {
  TITLE: 'JAMAL X7 - منصة الخدمات الإبداعية المتكاملة',
  DESCRIPTION: 'نقدم خدمات تصميم المواقع، الشعارات، الفيديو، البرمجة، والمزيد. نوفر حلولاً رقمية متكاملة بجودة عالية وسرعة في التنفيذ.',
  KEYWORDS: 'تصميم مواقع, تصميم شعارات, برمجة, فيديو, خدمات رقمية, JAMAL X7, تصميم, تطوير, إبداع',
  IMAGE: 'https://jamalx7.com/og-image.jpg',
  SITE_URL: 'https://jamalx7.com',
  TWITTER_HANDLE: '@jamalx7',
  FACEBOOK_PAGE: 'jamalx7'
};

// Performance Metrics
export const PERFORMANCE_METRICS = {
  MAX_IMAGE_SIZE: 500, // KB
  MAX_JS_SIZE: 200, // KB
  MAX_CSS_SIZE: 100, // KB
  TTFB_THRESHOLD: 500, // ms
  FCP_THRESHOLD: 2000, // ms
  LCP_THRESHOLD: 2500, // ms
  CLS_THRESHOLD: 0.1,
  FID_THRESHOLD: 100 // ms
};

// Export all constants
export default {
  APP_NAME,
  APP_TAGLINE,
  CONTACT_INFO,
  SOCIAL_MEDIA,
  SERVICE_CATEGORIES,
  SERVICE_STATUS,
  PROJECT_PRIORITIES,
  PAYMENT_METHODS,
  PACKAGE_TYPES,
  PROJECT_TIMELINE,
  FAQ_CATEGORIES,
  LANGUAGES,
  COUNTRIES,
  FILE_TYPES,
  FILE_SIZE_LIMITS,
  COLORS,
  GRADIENTS,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  Z_INDEX,
  API_ENDPOINTS,
  STORAGE_KEYS,
  VALIDATION_MESSAGES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  SEO_DEFAULTS,
  PERFORMANCE_METRICS
};
