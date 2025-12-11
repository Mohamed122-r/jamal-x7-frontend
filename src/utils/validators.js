// Validation rules
export const validationRules = {
  required: {
    validate: (value) => value !== '' && value !== null && value !== undefined,
    message: 'هذا الحقل مطلوب'
  },
  
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message: 'البريد الإلكتروني غير صحيح'
  },
  
  phone: {
    validate: (value) => {
      const phoneRegex = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    },
    message: 'رقم الهاتف غير صحيح'
  },
  
  minLength: (min) => ({
    validate: (value) => value.length >= min,
    message: `يجب أن يكون ${min} أحرف على الأقل`
  }),
  
  maxLength: (max) => ({
    validate: (value) => value.length <= max,
    message: `يجب أن يكون ${max} أحرف كحد أقصى`
  }),
  
  numeric: {
    validate: (value) => /^\d+$/.test(value),
    message: 'يجب أن يكون رقماً'
  },
  
  alpha: {
    validate: (value) => /^[ء-ي\s]+$/.test(value),
    message: 'يجب أن يحتوي على أحرف عربية فقط'
  },
  
  alphanumeric: {
    validate: (value) => /^[ء-ي0-9\s]+$/.test(value),
    message: 'يجب أن يحتوي على أحرف عربية وأرقام فقط'
  },
  
  url: {
    validate: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: 'الرابط غير صحيح'
  },
  
  password: {
    validate: (value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return value.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    },
    message: 'يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص'
  },
  
  match: (fieldName, getFieldValue) => ({
    validate: (value, formData) => value === getFieldValue(formData, fieldName),
    message: 'القيم غير متطابقة'
  }),
  
  custom: (validator, message) => ({
    validate: validator,
    message
  })
};

// Form validator class
export class FormValidator {
  constructor(rules = {}) {
    this.rules = rules;
    this.errors = {};
  }

  validate(fieldName, value, formData = {}) {
    const fieldRules = this.rules[fieldName] || [];
    const errors = [];

    for (const rule of fieldRules) {
      if (!rule.validate(value, formData)) {
        errors.push(rule.message);
        break; // Stop at first error
      }
    }

    this.errors[fieldName] = errors.length > 0 ? errors[0] : null;
    return this.errors[fieldName] === null;
  }

  validateAll(formData) {
    let isValid = true;
    this.errors = {};

    for (const fieldName in this.rules) {
      const value = formData[fieldName] || '';
      if (!this.validate(fieldName, value, formData)) {
        isValid = false;
      }
    }

    return isValid;
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = {};
  }

  hasErrors() {
    return Object.values(this.errors).some(error => error !== null);
  }

  getError(fieldName) {
    return this.errors[fieldName] || null;
  }
}

// Create validation schema
export const createValidationSchema = (schema) => {
  return new FormValidator(schema);
};

// Common validation schemas
export const contactFormSchema = createValidationSchema({
  name: [
    validationRules.required,
    validationRules.alpha,
    validationRules.minLength(3),
    validationRules.maxLength(50)
  ],
  
  email: [
    validationRules.required,
    validationRules.email
  ],
  
  phone: [
    validationRules.required,
    validationRules.phone
  ],
  
  message: [
    validationRules.required,
    validationRules.minLength(10),
    validationRules.maxLength(1000)
  ]
});

export const registrationSchema = createValidationSchema({
  fullName: [
    validationRules.required,
    validationRules.alpha,
    validationRules.minLength(3),
    validationRules.maxLength(100)
  ],
  
  email: [
    validationRules.required,
    validationRules.email
  ],
  
  password: [
    validationRules.required,
    validationRules.password
  ],
  
  confirmPassword: [
    validationRules.required,
    validationRules.match('password', (formData) => formData.password)
  ],
  
  phone: [
    validationRules.required,
    validationRules.phone
  ]
});

export const projectFormSchema = createValidationSchema({
  projectName: [
    validationRules.required,
    validationRules.minLength(3),
    validationRules.maxLength(100)
  ],
  
  budget: [
    validationRules.required,
    validationRules.numeric,
    validationRules.custom(
      (value) => parseInt(value) >= 500,
      'يجب أن يكون الميزانية 500 ريال على الأقل'
    )
  ],
  
  deadline: [
    validationRules.required,
    validationRules.custom(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      'يجب أن يكون التاريخ في المستقبل'
    )
  ],
  
  description: [
    validationRules.required,
    validationRules.minLength(20),
    validationRules.maxLength(5000)
  ]
});

// Validation utility functions
export const validateField = (value, rules) => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return { isValid: false, message: rule.message };
    }
  }
  return { isValid: true, message: '' };
};

export const validateForm = (formData, schema) => {
  const errors = {};
  let isValid = true;

  for (const fieldName in schema) {
    const value = formData[fieldName] || '';
    const fieldRules = schema[fieldName];
    const validationResult = validateField(value, fieldRules);
    
    if (!validationResult.isValid) {
      errors[fieldName] = validationResult.message;
      isValid = false;
    }
  }

  return { isValid, errors };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const normalizePhone = (phone) => {
  if (!phone) return '';
  
  let normalized = phone.replace(/\s/g, '');
  
  // Convert to Saudi format
  if (normalized.startsWith('009665')) {
    normalized = '05' + normalized.slice(6);
  } else if (normalized.startsWith('9665')) {
    normalized = '05' + normalized.slice(4);
  } else if (normalized.startsWith('+9665')) {
    normalized = '05' + normalized.slice(5);
  }
  
  return normalized;
};

export const formatValidationErrors = (errors) => {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join('\n');
};

export const createFormData = (formElement) => {
  const formData = new FormData(formElement);
  const data = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return data;
};

export const setFormErrors = (formElement, errors) => {
  // Clear previous errors
  const errorElements = formElement.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  const inputElements = formElement.querySelectorAll('input, textarea, select');
  inputElements.forEach(input => {
    input.classList.remove('error');
  });
  
  // Set new errors
  for (const [fieldName, message] of Object.entries(errors)) {
    const input = formElement.querySelector(`[name="${fieldName}"]`);
    if (input) {
      input.classList.add('error');
      
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      errorElement.textContent = message;
      
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
  }
};

export const clearFormErrors = (formElement) => {
  const errorElements = formElement.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  const inputElements = formElement.querySelectorAll('input, textarea, select');
  inputElements.forEach(input => {
    input.classList.remove('error');
  });
};

// Real-time validation
export const setupRealTimeValidation = (inputElement, rules) => {
  let timeout;
  
  const validate = () => {
    const value = inputElement.value;
    const result = validateField(value, rules);
    
    // Clear previous error
    const errorElement = inputElement.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    
    inputElement.classList.remove('error', 'success');
    
    if (!result.isValid) {
      inputElement.classList.add('error');
      
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      errorElement.textContent = result.message;
      
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    } else if (value !== '') {
      inputElement.classList.add('success');
    }
  };
  
  inputElement.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(validate, 500);
  });
  
  inputElement.addEventListener('blur', validate);
  
  return validate;
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
  } = options;
  
  const errors = [];
  
  if (file.size > maxSize) {
    errors.push(`حجم الملف كبير جداً. الحد الأقصى ${maxSize / (1024 * 1024)}MB`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('نوع الملف غير مسموح به');
  }
  
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    errors.push('امتداد الملف غير مسموح به');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Multiple files validation
export const validateFiles = (files, options = {}) => {
  const {
    maxFiles = 10,
    maxTotalSize = 50 * 1024 * 1024, // 50MB
    ...fileOptions
  } = options;
  
  const errors = [];
  let totalSize = 0;
  
  if (files.length > maxFiles) {
    errors.push(`عدد الملفات كبير جداً. الحد الأقصى ${maxFiles} ملفات`);
  }
  
  for (const file of files) {
    const fileValidation = validateFile(file, fileOptions);
    if (!fileValidation.isValid) {
      errors.push(`${file.name}: ${fileValidation.errors.join(', ')}`);
    }
    totalSize += file.size;
  }
  
  if (totalSize > maxTotalSize) {
    errors.push(`الحجم الإجمالي كبير جداً. الحد الأقصى ${maxTotalSize / (1024 * 1024)}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
