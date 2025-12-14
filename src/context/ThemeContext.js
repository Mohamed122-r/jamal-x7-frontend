import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to darken color (نقلها خارج المكون)
const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
};

// Helper function to lighten color (نقلها خارج المكون)
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R > 255 ? 255 : R) * 0x10000 +
    (G > 255 ? 255 : G) * 0x100 +
    (B > 255 ? 255 : B)
  ).toString(16).slice(1);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Try to get saved theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('jamalx7-theme');
      
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    return 'light'; // القيمة الافتراضية أثناء البناء
  });

  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jamalx7-accent-color') || '#FF6B00';
    }
    return '#FF6B00';
  });

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jamalx7-theme', newTheme);
      return newTheme;
    });
  };

  // Set specific theme
  const setThemeMode = (mode) => {
    if (['light', 'dark'].includes(mode)) {
      setTheme(mode);
      localStorage.setItem('jamalx7-theme', mode);
    }
  };

  // Set accent color
  const updateAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem('jamalx7-accent-color', color);
    
    // Update CSS custom properties
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--primary-dark', darkenColor(color, 20));
      document.documentElement.style.setProperty('--primary-light', lightenColor(color, 20));
    }
  };

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove previous theme class
      root.classList.remove('light', 'dark');
      
      // Add new theme class
      root.classList.add(theme);
      
      // Set data-theme attribute
      root.setAttribute('data-theme', theme);
      
      // Update CSS custom properties for theme
      if (theme === 'dark') {
        root.style.setProperty('--bg-primary', '#1A202C');
        root.style.setProperty('--bg-secondary', '#2D3748');
        root.style.setProperty('--text-primary', '#F7FAFC');
        root.style.setProperty('--text-secondary', '#E2E8F0');
        root.style.setProperty('--border-color', '#4A5568');
      } else {
        root.style.setProperty('--bg-primary', '#FFFFFF');
        root.style.setProperty('--bg-secondary', '#F7FAFC');
        root.style.setProperty('--text-primary', '#2D3748');
        root.style.setProperty('--text-secondary', '#4A5568');
        root.style.setProperty('--border-color', '#E2E8F0');
      }
      
      // Update accent color
      root.style.setProperty('--primary-color', accentColor);
      root.style.setProperty('--primary-dark', darkenColor(accentColor, 20));
      root.style.setProperty('--primary-light', lightenColor(accentColor, 20));
    }
  }, [theme, accentColor]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only change theme if user hasn't set a preference
        if (!localStorage.getItem('jamalx7-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

  // Theme colors
  const themeColors = {
    light: {
      bg: {
        primary: '#FFFFFF',
        secondary: '#F7FAFC',
        dark: '#1A202C',
        light: '#F8F9FA'
      },
      text: {
        primary: '#2D3748',
        secondary: '#4A5568',
        light: '#718096',
        white: '#FFFFFF'
      },
      border: '#E2E8F0'
    },
    dark: {
      bg: {
        primary: '#1A202C',
        secondary: '#2D3748',
        dark: '#171923',
        light: '#2D3748'
      },
      text: {
        primary: '#F7FAFC',
        secondary: '#E2E8F0',
        light: '#CBD5E0',
        white: '#FFFFFF'
      },
      border: '#4A5568'
    }
  };

  const value = {
    theme,
    accentColor,
    toggleTheme,
    setThemeMode,
    updateAccentColor,
    themeColors: themeColors[theme],
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for theme-aware styling
export const useThemeAwareStyles = (lightStyles, darkStyles) => {
  const { theme } = useTheme();
  
  return theme === 'light' ? lightStyles : darkStyles;
};

// Theme toggle component
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for light mode (switch to dark)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun icon for dark mode (switch to light)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
      </span>
    </button>
  );
};
