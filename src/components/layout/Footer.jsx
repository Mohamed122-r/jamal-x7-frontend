import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    خدماتنا: [
      { name: 'تصميم الشعار', path: '/services/logo-design' },
      { name: 'تصميم المواقع', path: '/services/web-design' },
      { name: 'تحرير الفيديو', path: '/services/video-editing' },
      { name: 'البرمجة والتطوير', path: '/services/programming' },
      { name: 'كتابة المحتوى', path: '/services/content-writing' },
      { name: 'التعليق الصوتي', path: '/services/voice-over' },
    ],
    روابط سريعة: [
      { name: 'الرئيسية', path: '/' },
      { name: 'من نحن', path: '/about' },
      { name: 'أعمالنا', path: '/portfolio' },
      { name: 'الباقات', path: '/pricing' },
      { name: 'تواصل معنا', path: '/contact' },
      { name: 'سياسة الخصوصية', path: '/privacy' },
    ],
    الباقات: [
      { name: 'الباقة الأساسية', path: '/pricing#basic' },
      { name: 'الباقة المتكاملة', path: '/pricing#premium' },
      { name: 'الباقة المميزة', path: '/pricing#ultimate' },
      { name: 'خدمة مخصصة', path: '/pricing#custom' },
    ],
  };

  const contactInfo = [
    {
      icon: <FaWhatsapp className="text-xl" />,
      text: '+966 55 123 4567',
      link: 'https://wa.me/966551234567',
      color: 'text-green-500'
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      text: 'info@jamalx7.com',
      link: 'mailto:info@jamalx7.com',
      color: 'text-red-500'
    },
    {
      icon: <FaPhone className="text-xl" />,
      text: '+966 11 123 4567',
      link: 'tel:+966111234567',
      color: 'text-blue-500'
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      text: 'المملكة العربية السعودية',
      color: 'text-purple-500'
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, name: 'Facebook', link: 'https://facebook.com/jamalx7', color: 'bg-blue-600' },
    { icon: <FaTwitter />, name: 'Twitter', link: 'https://twitter.com/jamalx7', color: 'bg-blue-400' },
    { icon: <FaInstagram />, name: 'Instagram', link: 'https://instagram.com/jamalx7', color: 'bg-pink-600' },
    { icon: <FaLinkedinIn />, name: 'LinkedIn', link: 'https://linkedin.com/company/jamalx7', color: 'bg-blue-700' },
    { icon: <FaYoutube />, name: 'YouTube', link: 'https://youtube.com/c/jamalx7', color: 'bg-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">J7</span>
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
                  JAMAL X7
                </h2>
                <p className="text-sm text-gray-400">نصمم... نطور... ننجز</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              منصة الخدمات الإبداعية المتكاملة التي تجمع بين الإبداع والتكنولوجيا. 
              نسعى لتحويل أفكارك إلى واقع ملموس بجودة عالية وخدمة متميزة.
            </p>
            
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${social.color} w-10 h-10 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-6 relative pb-2">
                {category}
                <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
              </h3>
              
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2 space-x-reverse group"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
              تواصل معنا على مدار الساعة
            </span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`${contact.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    {contact.icon}
                  </div>
                  <div>
                    {contact.link ? (
                      <a 
                        href={contact.link} 
                        className="text-lg font-semibold hover:text-primary-400 transition-colors"
                        target={contact.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-lg font-semibold">{contact.text}</span>
                    )}
                    <p className="text-sm text-gray-400 mt-1">
                      {index === 0 && 'رد فوري 24/7'}
                      {index === 1 && 'رد خلال 24 ساعة'}
                      {index === 2 && 'من الأحد إلى الخميس'}
                      {index === 3 && 'نخدم جميع أنحاء المملكة'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-2xl p-8 mb-8 border border-primary-500/30"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-2">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-gray-300">كن أول من يعرف عن العروض الجديدة والأخبار المهمة</p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-grow px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} JAMAL X7 للتصميم والإبداع. جميع الحقوق محفوظة.</p>
              <p className="mt-1 text-xs">نصمم... نطور... ننجز</p>
            </div>
            
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                خريطة الموقع
              </Link>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400">متصل الآن</span>
              </div>
            </div>
          </div>
          
          {/* Back to Top */}
          <div className="text-center mt-8">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-primary-400 transition-colors"
            >
              <span>العودة إلى الأعلى</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
