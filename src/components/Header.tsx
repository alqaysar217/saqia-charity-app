import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplet } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Determine title based on current route
  const getTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return t('app.name');
    if (path === '/donations') return t('navigation.donations');
    if (path === '/notifications') return t('navigation.notifications');
    if (path === '/campaigns') return t('navigation.campaigns');
    if (path === '/profile') return t('navigation.profile');
    if (path.includes('/donate')) return t('donation.select');
    
    return t('app.name');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-app py-3 flex items-center">
        <div className="flex items-center">
          <Droplet size={24} className="text-primary-400 ml-2" />
          <h1 className="text-xl font-bold text-primary-500">{getTitle()}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;