import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa';

const Toast = ({ 
  message, 
  type = 'success', 
  duration = 5000, 
  onClose,
  position = 'top-right'
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-300';
      case 'error':
        return 'text-red-800 dark:text-red-300';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-300';
      case 'info':
        return 'text-blue-800 dark:text-blue-300';
      default:
        return 'text-gray-800 dark:text-gray-300';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={`fixed z-[9999] ${getPositionClasses()} max-w-sm`}
      >
        <div className={`${getBgColor()} border rounded-xl shadow-lg p-4`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            
            <div className="flex-1">
              <p className={`text-sm font-medium ${getTextColor()}`}>
                {message}
              </p>
              
              {/* Progress Bar */}
              {duration && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: 'linear' }}
                  className={`mt-2 h-1 rounded-full ${
                    type === 'success' ? 'bg-green-500' :
                    type === 'error' ? 'bg-red-500' :
                    type === 'warning' ? 'bg-yellow-500' :
                    type === 'info' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}
                />
              )}
            </div>
            
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="إغلاق"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

  return (
    <>
      {positions.map(position => (
        <div key={position} className={`fixed z-[9998] ${position === 'top-right' ? 'top-4 right-4' : 
          position === 'top-left' ? 'top-4 left-4' :
          position === 'bottom-right' ? 'bottom-4 right-4' :
          'bottom-4 left-4'} flex flex-col gap-3`}>
          <AnimatePresence>
            {toasts
              .filter(toast => toast.position === position)
              .map(toast => (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Toast
                    {...toast}
                    onClose={() => removeToast(toast.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

// Toast Manager Hook
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, options = {}) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      ...options
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, options) => {
    return addToast(message, { ...options, type: 'success' });
  };

  const error = (message, options) => {
    return addToast(message, { ...options, type: 'error' });
  };

  const warning = (message, options) => {
    return addToast(message, { ...options, type: 'warning' });
  };

  const info = (message, options) => {
    return addToast(message, { ...options, type: 'info' });
  };

  const clearAll = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll
  };
};

export default Toast;
