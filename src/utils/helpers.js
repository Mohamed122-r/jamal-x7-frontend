// Format currency
export const formatCurrency = (amount, currency = 'SAR') => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date in Arabic
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Riyadh',
  };
  
  return new Intl.DateTimeFormat('ar-SA', { ...defaultOptions, ...options }).format(new Date(date));
};

// Format relative time
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'الآن';
  if (diffInMinutes < 60) return `قبل ${diffInMinutes} دقيقة`;
  if (diffInHours < 24) return `قبل ${diffInHours} ساعة`;
  if (diffInDays < 7) return `قبل ${diffInDays} يوم`;
  
  return formatDate(date, { month: 'short', day: 'numeric' });
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Merge objects deeply
export const deepMerge = (target, source) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate Saudi phone number
export const validateSaudiPhone = (phone) => {
  const re = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return re.test(phone);
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

// Get query parameters
export const getQueryParams = () => {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
};

// Set query parameters
export const setQueryParams = (params) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  window.history.replaceState(null, '', `?${queryString}`);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Generate gradient colors
export const generateGradient = (colors, angle = 135) => {
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
};

// Calculate reading time
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

// Generate initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Smooth scroll to element
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Download file
export const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

// Parse JSON safely
export const safeJsonParse = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return defaultValue;
  }
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Remove duplicates from array
export const removeDuplicates = (array, key) => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// Flatten nested array
export const flattenArray = (array) => {
  return array.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
};

// Chunk array
export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Generate random color
export const getRandomColor = () => {
  const colors = [
    '#FF6B00', '#4F46E5', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#3B82F6', '#EC4899', '#14B8A6', '#F97316'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate shades of color
export const generateShades = (color, count = 5) => {
  const shades = [];
  for (let i = 1; i <= count; i++) {
    const opacity = i / count;
    shades.push(`${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
  }
  return shades;
};

// Hex to RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// RGB to Hex
export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Lighten/darken color
export const adjustColor = (color, amount) => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
};

// Get contrast color
export const getContrastColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

// Generate avatar URL
export const generateAvatar = (name, size = 100) => {
  const initials = getInitials(name);
  const color = getRandomColor();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color.replace('#', '')}&color=${getContrastColor(color).replace('#', '')}&size=${size}`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Generate password
export const generatePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Generate slug
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if device is touch
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get browser info
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName;
  let browserVersion;
  
  if (ua.includes('Firefox')) {
    browserName = 'Firefox';
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browserName = 'Chrome';
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browserName = 'Safari';
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Edg')) {
    browserName = 'Edge';
    browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || '';
  } else {
    browserName = 'Unknown';
    browserVersion = '';
  }
  
  return { name: browserName, version: browserVersion };
};

// Get OS info
export const getOSInfo = () => {
  const ua = navigator.userAgent;
  let os = 'Unknown';
  
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'MacOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  return os;
};

// Delay function
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry async function
export const retry = async (fn, retries = 3, delayMs = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs);
  }
};

// Memoize function
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Pipe functions
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// Compose functions
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Create event emitter
export const createEventEmitter = () => {
  const listeners = new Map();
  
  return {
    on(event, callback) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(callback);
    },
    
    off(event, callback) {
      if (listeners.has(event)) {
        listeners.get(event).delete(callback);
      }
    },
    
    emit(event, data) {
      if (listeners.has(event)) {
        listeners.get(event).forEach(callback => callback(data));
      }
    },
    
    clear() {
      listeners.clear();
    }
  };
};
