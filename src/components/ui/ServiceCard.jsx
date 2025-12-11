import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCheck, 
  FaClock, 
  FaMoneyBillWave, 
  FaUsers,
  FaStar,
  FaEye,
  FaInfoCircle
} from 'react-icons/fa';
import { MdWorkspacePremium } from 'react-icons/md';

const ServiceCard = ({ 
  service, 
  index, 
  showDetails = false,
  onViewDetails,
  compact = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getIconColor = (iconName) => {
    const colors = {
      '🎨': 'from-blue-500 to-cyan-500',
      '💻': 'from-purple-500 to-pink-500',
      '🎬': 'from-red-500 to-orange-500',
      '⚡': 'from-green-500 to-emerald-500',
      '✍️': 'from-yellow-500 to-amber-500',
      '🎙️': 'from-indigo-500 to-blue-500',
      '⭐': 'from-primary-500 to-accent-purple',
    };
    return colors[iconName] || 'from-primary-500 to-accent-purple';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-SA').format(price);
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 group-hover:border-primary-500/50 transition-all duration-500">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${getIconColor(service.icon)} text-white`}>
              <span className="text-2xl">{service.icon}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-primary-500 font-bold">
                  يبدأ من {formatPrice(service.packages[0].price)} ريال
                </div>
                
                <Link
                  to={`/services/${service.id}`}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <span>التفاصيل</span>
                  <FaArrowLeft className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      
      {/* Main Card */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 group-hover:border-primary-500/50 transition-all duration-500 overflow-hidden">
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold">
              <MdWorkspacePremium />
              <span>الأكثر طلباً</span>
            </div>
          </div>
        )}

        {/* Service Header */}
        <div className="relative z-10 flex items-start gap-6 mb-8">
          {/* Icon */}
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${getIconColor(service.icon)} text-white shadow-lg`}>
            <span className="text-3xl">{service.icon}</span>
          </div>
          
          {/* Title and Description */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <AnimatePresence>
              {showFullDescription ? (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-400 leading-relaxed"
                >
                  {service.description}
                </motion.p>
              ) : (
                <p className="text-gray-400 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              )}
            </AnimatePresence>
            
            {service.description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-1"
              >
                <FaInfoCircle className="text-xs" />
                <span>{showFullDescription ? 'عرض أقل' : 'عرض المزيد'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <FaCheck className="text-primary-500 text-sm" />
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaClock className="text-primary-500" />
              <span className="text-sm text-gray-400">مدة التنفيذ</span>
            </div>
            <div className="text-xl font-bold text-white">3-7 أيام</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaMoneyBillWave className="text-green-500" />
              <span className="text-sm text-gray-400">أسعار تنافسية</span>
            </div>
            <div className="text-xl font-bold text-white">ضمان السعر</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaUsers className="text-blue-500" />
              <span className="text-sm text-gray-400">عملاء راضون</span>
            </div>
            <div className="text-xl font-bold text-white">150+</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaStar className="text-yellow-500" />
              <span className="text-sm text-gray-400">تقييم</span>
            </div>
            <div className="text-xl font-bold text-white">4.9/5</div>
          </div>
        </div>

        {/* Packages */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="relative z-10 mb-8"
          >
            <h4 className="text-lg font-bold text-white mb-4">الباقات المتاحة</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.packages.map((pkg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border ${
                    pkg.recommended 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-gray-700 bg-gray-800/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-bold text-white">{pkg.name}</h5>
                    {pkg.recommended && (
                      <span className="px-2 py-1 rounded text-xs bg-primary-500 text-white">موصى به</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-primary-500 mb-3">
                    {formatPrice(pkg.price)} <span className="text-lg">ريال</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-sm text-gray-300 flex items-center gap-2">
                        <FaCheck className="text-primary-500 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
          <Link
            to={`/services/${service.id}`}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
          >
            <FaEye />
            <span>عرض تفاصيل الخدمة</span>
          </Link>
          
          <button
            onClick={() => onViewDetails && onViewDetails(service.id)}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold border border-gray-700 hover:border-primary-500 hover:bg-gray-700 transition-all duration-300"
          >
            <FaInfoCircle />
            <span>طلب استشارة مجانية</span>
          </button>
        </div>

        {/* Floating Elements on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-500/30 rounded-full"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-accent-purple/30 rounded-full"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
