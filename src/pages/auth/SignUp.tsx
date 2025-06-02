import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Droplet } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface SignUpFormData {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>();
  
  const password = watch('password', '');
  
  const onSubmit = (data: SignUpFormData) => {
    console.log('SignUp data:', data);
    // Here you would implement the actual signup logic with Firebase
    // For now, we'll just redirect to home
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-radial from-primary-50 to-white p-6 flex flex-col">
      <div className="mb-8 flex flex-col items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-2"
        >
          <Droplet size={32} className="text-primary-500 ml-2" />
          <h1 className="text-3xl font-bold text-primary-500">{t('app.name')}</h1>
        </motion.div>
        <p className="text-secondary-600">{t('app.slogan')}</p>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="card mb-6"
      >
        <h2 className="text-xl font-bold text-center mb-6">{t('auth.signup')}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-secondary-700 mb-1">{t('auth.fullName')}</label>
            <input 
              type="text" 
              className="input-field"
              {...register('fullName', { 
                required: 'هذا الحقل مطلوب'
              })} 
            />
            {errors.fullName && <p className="text-error-400 text-sm mt-1">{errors.fullName.message}</p>}
          </div>
          
          <div>
            <label className="block text-secondary-700 mb-1">{t('auth.email')}</label>
            <input 
              type="email" 
              className="input-field"
              {...register('email', { 
                required: 'هذا الحقل مطلوب',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'البريد الإلكتروني غير صحيح'
                }
              })} 
            />
            {errors.email && <p className="text-error-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-secondary-700 mb-1">{t('auth.phone')}</label>
            <input 
              type="tel" 
              className="input-field"
              {...register('phone')} 
            />
          </div>
          
          <div>
            <label className="block text-secondary-700 mb-1">{t('auth.password')}</label>
            <input 
              type="password" 
              className="input-field"
              {...register('password', { 
                required: 'هذا الحقل مطلوب',
                minLength: {
                  value: 6,
                  message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                }
              })} 
            />
            {errors.password && <p className="text-error-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <div>
            <label className="block text-secondary-700 mb-1">{t('auth.confirmPassword')}</label>
            <input 
              type="password" 
              className="input-field"
              {...register('confirmPassword', { 
                required: 'هذا الحقل مطلوب',
                validate: value => value === password || 'كلمات المرور غير متطابقة'
              })} 
            />
            {errors.confirmPassword && <p className="text-error-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            {t('auth.signup')}
            <ArrowRight size={18} className="mr-2" />
          </button>
        </form>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-secondary-600 mb-4">
          {t('auth.hasAccount')} <Link to="/login" className="text-primary-500 font-medium">{t('auth.login')}</Link>
        </p>
        
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-secondary w-full"
        >
          {t('auth.guest')}
        </button>
      </motion.div>
    </div>
  );
};

export default SignUp;