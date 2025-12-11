import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPlay, FaRocket, FaArrowDown } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import toast from 'react-hot-toast';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('مرحبًا، أريد الاستفسار عن خدمات JAMAL X7');
    window.open(`https://wa.me/966551234567?text=${message}`, '_blank');
    toast.success('جاري فتح واتساب...');
  };

  const stats = [
    { value: 250, label: 'مشروع منجز', suffix: '+' },
    { value: 150, label: 'عميل راضٍ', suffix: '+' },
    { value: 24, label: 'ساعة دعم', suffix: ' / 7' },
    { value: 98, label: 'رضا العملاء', suffix: '%' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-purple/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px),
                          linear-gradient(to bottom, #8882 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen pt-20 lg:pt-0">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-right mb-12 lg:mb-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            >
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-primary-400 font-semibold">متاح الآن للمشاريع الجديدة</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
              <span className="block text-white">مرحبًا بك في</span>
              <span className="block bg-gradient-to-r from-primary-500 via-primary-400 to-accent-purple bg-clip-text text-transparent">
                JAMAL X7
              </span>
            </h1>

            {/* Animated Typing */}
            <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
              <TypeAnimation
                sequence={[
                  'نصمم... نطور... ننجز',
                  2000,
                  'حلول إبداعية متكاملة',
                  2000,
                  'جودة عالية وسرعة في التنفيذ',
                  2000,
                  'خدمات رقمية مبتكرة',
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                className="font-bold"
              />
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              نقدم حلولاً رقمية شاملة تجمع بين الإبداع والتكنولوجيا. من تصميم الشعارات إلى تطوير 
              المواقع المتكاملة، نحن هنا لتحويل أفكارك إلى واقع ملموس بجودة عالية وخدمة متميزة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaRocket />
                <span>ابدأ مشروعك الآن</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <FaPlay />
                <span>شاهد أعمالنا</span>
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <span className="bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-primary-400">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            {/* Main Visual */}
            <div className="relative mx-auto lg:mx-0 max-w-lg">
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-2xl border border-primary-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl">🎨</div>
                  <div className="text-xs font-semibold text-white">تصميم</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl">⚡</div>
                  <div className="text-xs font-semibold text-white">تطوير</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-xl">🚀</div>
                </div>
              </motion.div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">نظرة عامة سريعة</h3>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-400">مباشر</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'قيد التنفيذ', value: 12, color: 'from-yellow-500 to-amber-500' },
                      { label: 'في الانتظار', value: 8, color: 'from-blue-500 to-cyan-500' },
                      { label: 'مكتمل الشهر', value: 45, color: 'from-green-500 to-emerald-500' },
                      { label: 'معدل الرضا', value: 98, color: 'from-purple-500 to-pink-500', suffix: '%' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`bg-gradient-to-br ${item.color}/20 rounded-2xl p-4 border ${item.color.replace('from-', 'border-').replace(' to-', '/30')}`}
                      >
                        <div className="text-2xl font-bold text-white mb-1">
                          {item.value}
                          {item.suffix}
                        </div>
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">معدل الإنجاز</span>
                      <span className="font-semibold text-primary-400">87%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '87%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm text-gray-400 mb-2">مرر للأسفل</span>
            <FaArrowDown className="text-gray-400 text-xl" />
          </motion.div>
        </motion.div>

        {/* Scroll Progress */}
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-purple"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
