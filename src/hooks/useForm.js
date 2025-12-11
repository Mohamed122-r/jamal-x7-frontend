import { useState, useCallback, useEffect } from 'react';
import { validationRules, createValidationSchema } from '../utils/validators';

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validator = createValidationSchema(validationSchema);

  // Validate form on values change
  useEffect(() => {
    const validateForm = () => {
      const isValid = validator.validateAll(values);
      setIsValid(isValid);
      setErrors(validator.getErrors());
    };

    validateForm();
  }, [values]);

  // Handle input change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked, files } = event.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = files;
    } else if (type === 'number' || type === 'range') {
      newValue = value === '' ? '' : Number(value);
    } else {
      newValue = value;
    }

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));
  }, []);

  // Handle blur event
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate specific field
    const value = values[name];
    validator.validate(name, value, values);
    setErrors(validator.getErrors());
  }, [values]);

  // Set field value manually
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Set multiple field values
  const setValuesMultiple = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Reset form
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    validator.clearErrors();
  }, [initialValues]);

  // Submit handler
  const handleSubmit = useCallback((onSubmit) => async (event) => {
    if (event) {
      event.preventDefault();
      event.persist();
    }

    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(values).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const isValid = validator.validateAll(values);
    setIsValid(isValid);
    setErrors(validator.getErrors());

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values, { resetForm });
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, resetForm]);

  // Get field props
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined
  }), [values, handleChange, handleBlur, errors]);

  // Check if field has error
  const hasError = useCallback((name) => {
    return touched[name] && errors[name];
  }, [touched, errors]);

  // Get field error
  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null;
  }, [touched, errors]);

  // Validate specific field
  const validateField = useCallback((name) => {
    const value = values[name];
    const isValid = validator.validate(name, value, values);
    setErrors(validator.getErrors());
    return isValid;
  }, [values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const isValid = validator.validateAll(values);
    setIsValid(isValid);
    setErrors(validator.getErrors());
    return isValid;
  }, [values]);

  // Set field touched
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
  }, []);

  // Set multiple fields touched
  const setTouchedMultiple = useCallback((fields) => {
    setTouched(prev => ({
      ...prev,
      ...fields
    }));
  }, []);

  // Set field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Set multiple errors
  const setErrorsMultiple = useCallback((newErrors) => {
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
  }, []);

  // Clear specific error
  const clearFieldError = useCallback((name) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
    validator.clearErrors();
  }, []);

  // Watch specific field
  const watch = useCallback((name) => {
    return values[name];
  }, [values]);

  // Watch multiple fields
  const watchMultiple = useCallback((names) => {
    return names.reduce((acc, name) => {
      acc[name] = values[name];
      return acc;
    }, {});
  }, [values]);

  // Form state
  const formState = {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues)
  };

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    
    // Actions
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    
    // Field utilities
    getFieldProps,
    hasError,
    getFieldError,
    setFieldValue,
    setValuesMultiple,
    
    // Validation
    validateField,
    validateForm,
    
    // Touch utilities
    setFieldTouched,
    setTouchedMultiple,
    
    // Error utilities
    setFieldError,
    setErrorsMultiple,
    clearFieldError,
    clearErrors,
    
    // Watch utilities
    watch,
    watchMultiple,
    
    // Form state
    formState
  };
};

// Custom hook for field array
export const useFieldArray = (initialValues = []) => {
  const [fields, setFields] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Add field
  const append = useCallback((value = {}) => {
    setFields(prev => [...prev, { id: Date.now().toString(), ...value }]);
  }, []);

  // Remove field
  const remove = useCallback((index) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Insert field
  const insert = useCallback((index, value = {}) => {
    setFields(prev => {
      const newFields = [...prev];
      newFields.splice(index, 0, { id: Date.now().toString(), ...value });
      return newFields;
    });
  }, []);

  // Update field
  const update = useCallback((index, value) => {
    setFields(prev => {
      const newFields = [...prev];
      newFields[index] = { ...newFields[index], ...value };
      return newFields;
    });
  }, []);

  // Move field
  const move = useCallback((fromIndex, toIndex) => {
    setFields(prev => {
      const newFields = [...prev];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return newFields;
    });
  }, []);

  // Swap fields
  const swap = useCallback((indexA, indexB) => {
    setFields(prev => {
      const newFields = [...prev];
      [newFields[indexA], newFields[indexB]] = [newFields[indexB], newFields[indexA]];
      return newFields;
    });
  }, []);

  // Clear all fields
  const clear = useCallback(() => {
    setFields([]);
    setErrors({});
  }, []);

  // Set fields
  const set = useCallback((newFields) => {
    setFields(newFields);
  }, []);

  // Get field by index
  const get = useCallback((index) => {
    return fields[index];
  }, [fields]);

  // Get all fields
  const getAll = useCallback(() => {
    return fields;
  }, [fields]);

  // Get field count
  const getCount = useCallback(() => {
    return fields.length;
  }, [fields]);

  // Set error for field
  const setFieldError = useCallback((index, error) => {
    setErrors(prev => ({
      ...prev,
      [index]: error
    }));
  }, []);

  // Get error for field
  const getFieldError = useCallback((index) => {
    return errors[index];
  }, [errors]);

  // Clear field error
  const clearFieldError = useCallback((index) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Validate all fields
  const validate = useCallback((validationFn) => {
    const newErrors = {};
    let isValid = true;

    fields.forEach((field, index) => {
      const error = validationFn(field, index);
      if (error) {
        newErrors[index] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields]);

  return {
    // State
    fields,
    errors,
    
    // Actions
    append,
    remove,
    insert,
    update,
    move,
    swap,
    clear,
    set,
    
    // Getters
    get,
    getAll,
    getCount,
    
    // Error handling
    setFieldError,
    getFieldError,
    clearFieldError,
    clearErrors,
    validate
  };
};

// Custom hook for form with steps
export const useFormSteps = (steps = [], initialValues = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepValues, setStepValues] = useState({});
  
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepConfig = steps[currentStep];

  // Initialize step values
  useEffect(() => {
    const initialStepValues = {};
    steps.forEach((step, index) => {
      initialStepValues[index] = initialValues;
    });
    setStepValues(initialStepValues);
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  }, [currentStep, totalSteps]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep - 1));
    }
  }, [currentStep]);

  // Go to specific step
  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
    }
  }, [totalSteps]);

  // Update step values
  const updateStepValues = useCallback((stepIndex, values) => {
    setStepValues(prev => ({
      ...prev,
      [stepIndex]: { ...prev[stepIndex], ...values }
    }));
  }, []);

  // Get current step values
  const getCurrentStepValues = useCallback(() => {
    return stepValues[currentStep] || {};
  }, [currentStep, stepValues]);

  // Get all values
  const getAllValues = useCallback(() => {
    return Object.values(stepValues).reduce((acc, values) => ({
      ...acc,
      ...values
    }), {});
  }, [stepValues]);

  // Check if step is completed
  const isStepCompleted = useCallback((stepIndex) => {
    return completedSteps.includes(stepIndex);
  }, [completedSteps]);

  // Check if step is valid
  const isStepValid = useCallback((stepIndex) => {
    const step = steps[stepIndex];
    if (!step.validate) return true;
    
    const values = stepValues[stepIndex] || {};
    return step.validate(values);
  }, [steps, stepValues]);

  // Get progress percentage
  const getProgress = useCallback(() => {
    const completed = completedSteps.filter(step => isStepValid(step)).length;
    return Math.round((completed / totalSteps) * 100);
  }, [completedSteps, totalSteps, isStepValid]);

  return {
    // State
    currentStep,
    completedSteps,
    stepValues,
    
    // Step info
    totalSteps,
    isFirstStep,
    isLastStep,
    currentStepConfig,
    
    // Navigation
    nextStep,
    prevStep,
    goToStep,
    
    // Values
    updateStepValues,
    getCurrentStepValues,
    getAllValues,
    
    // Validation
    isStepCompleted,
    isStepValid,
    getProgress
  };
};
