import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Features from '../sections/Features';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import Statistics from '../sections/Statistics';
import Contact from '../sections/Contact';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import AOS from 'aos';

const HomePage = () => {
  useScrollAnimation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      <Helmet>
        <title>JAMAL X7 - منصة الخدمات الإبداعية المتكاملة</title>
        <meta 
          name="description" 
          content="نقدم خدمات تصميم المواقع، الشعارات، الفيديو، البرمجة، والمزيد. نوفر حلولاً رقمية متكاملة بجودة عالية وسرعة في التنفيذ." 
        />
        <meta 
          name="keywords" 
          content="تصميم مواقع, تصميم شعارات, برمجة, فيديو, خدمات رقمية, JAMAL X7, تصميم, تطوير, إبداع" 
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden pt-24 lg:pt-0">
          <Hero />
        </section>

        {/* Services Section */}
        <section id="services" className="section bg-gray-50 dark:bg-gray-900/50">
          <div className="container">
            <Services />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section">
          <div className="container">
            <Features />
          </div>
        </section>

        {/* Statistics Section */}
        <section id="statistics" className="section bg-gradient-to-br from-primary-500/10 to-accent-purple/10">
          <div className="container">
            <Statistics />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section bg-gray-50 dark:bg-gray-900/50">
          <div className="container">
            <Pricing />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section">
          <div className="container">
            <Testimonials />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <Contact />
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default HomePage;
