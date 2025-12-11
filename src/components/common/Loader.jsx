import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = true, size = 'medium', text = 'جاري التحميل...' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Logo */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className={`${sizes[size]} rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center`}
      >
        <span className="text-white font-bold text-lg">J7</span>
      </motion.div>

      {/* Pulsing Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2,
            }}
            className="w-2 h-2 bg-primary-500 rounded-full"
          />
        ))}
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400 font-medium"
        >
          {text}
        </motion.p>
      )}

      {/* Progress Bar (for full screen) */}
      {fullScreen && (
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-primary-500 to-accent-purple"
          />
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm">
        <div className="text-center">
          {loader}
          
          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
              JAMAL X7
            </h3>
            <p className="text-gray-400 text-sm mt-2">نصمم... نطور... ننجز</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return loader;
};

// Page Loader
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <Loader fullScreen={false} size="large" text="جاري تحميل المحتوى..." />
  </div>
);

// Content Loader (Skeleton)
export const ContentLoader = ({ type = 'card', count = 1 }) => {
  const CardLoader = () => (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-10 bg-gray-700 rounded-lg flex-1"></div>
        <div className="h-10 bg-gray-700 rounded-lg w-24"></div>
      </div>
    </div>
  );

  const ListLoader = () => (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 animate-pulse">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="w-20 h-8 bg-gray-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  const GridLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 animate-pulse">
          <div className="w-full h-48 bg-gray-700 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-700 rounded w-4/6"></div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="h-8 bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  switch (type) {
    case 'list':
      return <ListLoader />;
    case 'grid':
      return <GridLoader />;
    default:
      return <CardLoader />;
  }
};

export default Loader;
