import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SplashScreen: React.FC = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-radial from-primary-100 to-primary-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-4">
          <Droplet size={80} className="text-primary-400 fill-primary-200" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.9, 1] }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute inset-0 bg-white rounded-full bg-opacity-30 blur-md z-[-1]"
          />
        </div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-primary-500 mb-2"
        >
          {t('app.name')}
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-secondary-600 text-lg mb-10"
        >
          {t('app.slogan')}
        </motion.p>
        
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary-400 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;