import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Droplet } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    // Here you would implement the actual login logic with Firebase
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
        <h2 className="text-xl font-bold text-center mb-6">{t('auth.login')}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex justify-between mb-1">
              <label className="text-secondary-700">{t('auth.password')}</label>
              <a href="#" className="text-primary-500 text-sm">{t('auth.forgotPassword')}</a>
            </div>
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
          
          <button type="submit" className="btn btn-primary w-full">
            {t('auth.login')}
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
          {t('auth.noAccount')} <Link to="/signup" className="text-primary-500 font-medium">{t('auth.signup')}</Link>
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

export default Login;