import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Gift, Bell, FileText, User } from 'lucide-react';
import classNames from 'classnames';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: Home, label: t('navigation.home') },
    { to: '/donations', icon: Gift, label: t('navigation.donations') },
    { to: '/notifications', icon: Bell, label: t('navigation.notifications') },
    { to: '/campaigns', icon: FileText, label: t('navigation.campaigns') },
    { to: '/profile', icon: User, label: t('navigation.profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <NavLink 
            key={item.to} 
            to={item.to}
            className={({ isActive }) => 
              classNames(
                'flex flex-col items-center py-1 px-3 rounded-md transition-colors duration-200',
                {
                  'text-primary-500': isActive,
                  'text-secondary-400 hover:text-secondary-600': !isActive
                }
              )
            }
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;