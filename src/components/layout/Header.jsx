import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../../assets/images/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: '🏠' },
    { 
      path: '/services', 
      label: 'خدماتنا', 
      icon: '⚙️',
      dropdown: [
        { path: '/services/logo-design', label: 'تصميم الشعار' },
        { path: '/services/web-design', label: 'تصميم المواقع' },
        { path: '/services/video-editing', label: 'تحرير الفيديو' },
        { path: '/services/programming', label: 'البرمجة والتطوير' },
        { path: '/services/content-writing', label: 'كتابة المحتوى' },
        { path: '/services/voice-over', label: 'التعليق الصوتي' },
      ]
    },
    { path: '/pricing', label: 'الباقات', icon: '💰' },
    { path: '/portfolio', label: 'أعمالنا', icon: '🎨' },
    { path: '/about', label: 'من نحن', icon: '👥' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">J7</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
                JAMAL X7
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">نصمم... نطور... ننجز</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-primary-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                    <FiChevronDown className={`transition-transform ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-primary-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        onClick={closeMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <a
              href="https://wa.me/966551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaWhatsapp className="text-xl" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container py-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                            isActive(item.path)
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-semibold">{item.label}</span>
                          </div>
                          <FiChevronDown className={`transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {activeDropdown === index && (
                          <div className="mr-8 mt-2 space-y-1">
                            {item.dropdown.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={closeMenu}
                                className="block p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 space-x-reverse p-4 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <a
                    href="https://wa.me/966551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>تواصل عبر واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
