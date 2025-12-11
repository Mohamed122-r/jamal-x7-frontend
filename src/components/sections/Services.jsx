import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../../data/servicesData';
import { 
  FaPalette, 
  FaLaptopCode, 
  FaVideo, 
  FaCode, 
  FaPenFancy, 
  FaMicrophone,
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaUsers,
  FaStar
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: '⭐' },
    { id: 'design', name: 'التصميم', icon: '🎨' },
    { id: 'development', name: 'التطوير', icon: '💻' },
    { id: 'media', name: 'الميديا', icon: '🎬' },
    { id: 'content', name: 'المحتوى', icon: '✍️' },
    { id: 'consulting', name: 'الاستشارات', icon: '📊' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => 
        service.id.includes(activeCategory) || 
        (activeCategory === 'design' && ['logo-design', 'web-design'].includes(service.id)) ||
        (activeCategory === 'development' && ['programming'].includes(service.id)) ||
        (activeCategory === 'media' && ['video-editing', 'voice-over'].includes(service.id)) ||
        (activeCategory === 'content' && ['content-writing'].includes(service.id))
      );

  const getServiceIcon = (serviceId) => {
    switch(serviceId) {
      case 'logo-design': return <FaPalette />;
      case 'web-design': return <FaLaptopCode />;
      case 'video-editing': return <FaVideo />;
      case 'programming': return <FaCode />;
      case 'content-writing': return <FaPenFancy />;
      case 'voice-over': return <FaMicrophone />;
      default: return <FaStar />;
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 font-semibold text-sm mb-4">
            خدماتنا المتكاملة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">اكتشف</span>
            <span className="bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent"> خدماتنا المميزة</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الإبداعية والرقمية المصممة خصيصاً لنجاح مشروعك
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-semibold">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 group-hover:border-primary-500/50 transition-all duration-500 overflow-hidden">
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Service Icon */}
                <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${service.color} text-white`}>
                  <div className="text-3xl">
                    {getServiceIcon(service.id)}
                  </div>
                </div>
                
                {/* Service Title */}
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                
                {/* Service Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                
                {/* Service Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <FaCheck className="text-primary-500 text-xs" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Service Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">يبدأ من</div>
                    <div className="text-2xl font-bold text-primary-500">
                      {service.packages[0].price} <span className="text-lg">ريال</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/services/${service.id}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-800 text-white hover:bg-primary-500 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="font-semibold">تفاصيل الخدمة</span>
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Popular Badge */}
                {service.id === 'web-design' && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold">
                    الأكثر طلباً
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 mb-4">
                <FaClock className="text-2xl text-primary-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">دعم فني متواصل</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/20 mb-4">
                <FaUsers className="text-2xl text-green-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">150+</div>
              <div className="text-gray-400">عميل راضٍ</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 mb-4">
                <FaStar className="text-2xl text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">رضا العملاء</div>
            </div>
          </div>
        </motion.div>

        {/* Services Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">عملية تنفيذ المشاريع</h3>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {[
              { step: 1, title: 'الاستشارة', description: 'نفهم احتياجاتك وأهداف مشروعك' },
              { step: 2, title: 'التخطيط', description: 'نضع خطة تنفيذ مفصلة' },
              { step: 3, title: 'التنفيذ', description: 'نبدأ التنفيذ بجودة عالية' },
              { step: 4, title: 'المراجعة', description: 'نراجع العمل معك' },
              { step: 5, title: 'التسليم', description: 'نسلم المشروع النهائي' },
              { step: 6, title: 'الدعم', description: 'نقدم الدعم بعد التسليم' },
            ].map((item) => (
              <SwiperSlide key={item.step}>
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-primary-500 transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-accent-purple/10 rounded-3xl p-8 md:p-12 border border-primary-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              مستعد لبدء مشروعك الإبداعي؟
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              تواصل معنا الآن للحصول على استشارة مجانية وخطة عمل مفصلة لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaPenFancy />
                <span>اطلب استشارة مجانية</span>
              </Link>
              
              <a
                href="https://wa.me/966551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-300"
              >
                <FaWhatsapp />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
