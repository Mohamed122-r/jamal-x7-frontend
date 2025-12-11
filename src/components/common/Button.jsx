import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  to,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-primary-500 focus:ring-primary-500',
    outline: 'bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="text-lg">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="text-lg">{icon}</span>
      )}
    </>
  );
  
  const buttonProps = {
    className: buttonClasses,
    disabled: disabled || loading,
    onClick,
    ...props,
  };
  
  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...buttonProps}
      >
        {buttonContent}
      </motion.a>
    );
  }
  
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={to} {...buttonProps}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...buttonProps}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;
