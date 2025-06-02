import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Droplet, Heart, Users } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const OnboardingStep: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
}> = ({ icon, title, description, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 100 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <div className="bg-primary-100 p-6 rounded-full mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-primary-500 mb-3">{title}</h2>
      <p className="text-center text-secondary-600 mb-10 max-w-xs">{description}</p>
    </motion.div>
  );
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    {
      icon: <Droplet size={48} className="text-primary-500" />,
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
    },
    {
      icon: <Heart size={48} className="text-primary-500" />,
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
    },
    {
      icon: <Users size={48} className="text-primary-500" />,
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
      navigate('/');
    }
  };

  const handleSkip = () => {
    onComplete();
    navigate('/');
  };
  
  const goToAuth = (path: string) => {
    onComplete();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-primary-50 to-white flex flex-col">
      <div className="absolute top-4 left-4">
        <button onClick={handleSkip} className="text-secondary-500 py-2 px-4">
          {t('common.skip')}
        </button>
      </div>
      
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {steps.map((stepData, index) => (
            step === index && (
              <OnboardingStep
                key={index}
                icon={stepData.icon}
                title={stepData.title}
                description={stepData.description}
                isActive={step === index}
              />
            )
          ))}
        </AnimatePresence>
      </div>
      
      <div className="h-32">
        <div className="flex justify-center mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                step === index ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        {step === steps.length - 1 ? (
          <div className="px-6 space-y-3">
            <button 
              onClick={() => goToAuth('/signup')}
              className="btn btn-primary w-full"
            >
              {t('auth.signup')}
            </button>
            <button 
              onClick={() => goToAuth('/login')}
              className="btn btn-outline w-full"
            >
              {t('auth.login')}
            </button>
            <button 
              onClick={handleSkip}
              className="btn btn-secondary w-full"
            >
              {t('auth.guest')}
            </button>
          </div>
        ) : (
          <div className="px-6">
            <button 
              onClick={handleNext} 
              className="btn btn-primary w-full flex items-center justify-center"
            >
              {t('common.next')}
              <ArrowRight size={18} className="mr-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;