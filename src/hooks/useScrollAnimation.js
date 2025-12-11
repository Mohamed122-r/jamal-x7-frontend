import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if elements are in viewport
      const sections = document.querySelectorAll('section[id], div[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
      
      // Trigger animations on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.8;
        if (isInViewport) {
          element.classList.add('visible');
        }
      });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect
  const parallax = (speed = 0.5) => {
    return scrollY * speed;
  };

  // Fade in on scroll
  const fadeIn = (delay = 0) => {
    return {
      opacity: scrollY > 100 ? 1 : 0,
      transform: scrollY > 100 ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s ease ${delay}s`
    };
  };

  // Scale on scroll
  const scaleOnScroll = () => {
    const scale = 1 + (scrollY * 0.0005);
    return {
      transform: `scale(${Math.min(scale, 1.1)})`
    };
  };

  // Stagger children animation
  const staggerChildren = (staggerDelay = 0.1) => {
    return {
      '& > *': {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease`,
        transitionDelay: (index) => `${index * staggerDelay}s`
      }
    };
  };

  // Typewriter effect
  const typewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length && isVisible) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, isVisible, text, speed]);

    return displayText;
  };

  // Counter animation
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const increment = end / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isVisible, end, duration]);

    return count;
  };

  // Progress bar
  const progress = (totalHeight) => {
    const progress = (scrollY / totalHeight) * 100;
    return Math.min(progress, 100);
  };

  // Scroll to element
  const scrollTo = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check if element is in viewport
  const isInViewport = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight * 0.8 &&
      rect.bottom >= 0
    );
  };

  // Lazy load images
  const lazyLoadImages = () => {
    useEffect(() => {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
      
      return () => images.forEach(img => imageObserver.unobserve(img));
    }, []);
  };

  return {
    scrollY,
    isVisible: scrollY > 100,
    activeSection,
    parallax,
    fadeIn,
    scaleOnScroll,
    staggerChildren,
    typewriter,
    useCounter,
    progress,
    scrollTo,
    isInViewport,
    lazyLoadImages,
    setIsVisible
  };
};

// Custom hook for intersection observer
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && options.triggerOnce) {
        observer.unobserve(ref);
      }
    }, {
      root: null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1,
      ...options
    });

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Scroll direction hook
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

// Scroll progress hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    updateProgress(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
};
