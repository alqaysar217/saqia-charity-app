import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Moon, Globe, Trash, LogOut, ChevronLeft } from 'lucide-react';

const MenuItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}> = ({ icon, title, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2 rounded-full bg-primary-50 ml-3">
        {icon}
      </div>
      <span className="flex-1">{title}</span>
      <ChevronLeft size={20} className="text-secondary-400" />
    </motion.div>
  );
};

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'محمود الحساني',
    email: 'pr.mahmoud.20@gmail.com',
    avatarUrl: '/images/mahmoud.png'
  };
  
  const handleLogout = () => {
    // Here you would implement logout logic
    navigate('/login');
  };
  
  return (
    <div className="py-6">
      <div className="card mb-6">
        <div className="flex items-center p-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ml-4">
            <img 
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-secondary-600">{user.email}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-secondary-800 mb-3">
        {t('profile.settings')}
      </h3>
      
      <div className="card overflow-hidden">
        <MenuItem 
          icon={<Globe size={20} className="text-primary-500" />}
          title={t('profile.changeLanguage')}
          onClick={() => {}}
        />
        
        <MenuItem 
          icon={<Moon size={20} className="text-primary-500" />}
          title={t('profile.theme')}
          onClick={() => {}}
        />
        
        <MenuItem 
          icon={<Trash size={20} className="text-error-400" />}
          title={t('profile.deleteAccount')}
          onClick={() => {}}
        />
        
        <MenuItem 
          icon={<LogOut size={20} className="text-error-400" />}
          title={t('auth.logout')}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Profile;