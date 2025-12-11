import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Loader from './components/common/Loader';

// Pages (Lazy Loading)
const HomePage = lazy(() => import('./components/pages/HomePage'));
const ServicesPage = lazy(() => import('./components/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./components/pages/ServiceDetailPage'));
const PricingPage = lazy(() => import('./components/pages/PricingPage'));
const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const PortfolioPage = lazy(() => import('./components/pages/PortfolioPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

// Context
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Styles
import './styles/main.css';
import './styles/animations.css';
import './styles/responsive.css';

function App() {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
          offset: 100,
        });
      });
    }
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <div className="App">
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    fontFamily: 'var(--font-family-arabic)',
                  },
                }}
              />
              
              <Header />
              
              <main className="min-h-screen">
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              
              <Footer />
              <ScrollToTop />
            </div>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
