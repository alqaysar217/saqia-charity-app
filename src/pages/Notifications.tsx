import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Droplet, Check, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'donation' | 'delivery' | 'campaign' | 'alert';
  read: boolean;
}

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'donation':
        return <Droplet size={20} className="text-primary-500" />;
      case 'delivery':
        return <Check size={20} className="text-success-400" />;
      case 'campaign':
        return <Bell size={20} className="text-secondary-500" />;
      case 'alert':
        return <AlertTriangle size={20} className="text-warning-400" />;
    }
  };
  
  const getColor = () => {
    switch (notification.type) {
      case 'donation':
        return 'bg-primary-100';
      case 'delivery':
        return 'bg-green-100';
      case 'campaign':
        return 'bg-secondary-100';
      case 'alert':
        return 'bg-yellow-100';
    }
  };
  
  return (
    <div className={`card mb-4 ${!notification.read ? 'border-r-4 border-r-primary-400' : ''}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ml-3 ${getColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-secondary-800">
            {notification.title}
          </h3>
          <p className="text-secondary-600 text-sm mb-2">
            {notification.message}
          </p>
          <span className="text-xs text-secondary-500">
            {notification.time}
          </span>
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'تم تأكيد تبرعك',
      message: 'تم تأكيد تبرعك لمسجد الرحمة بمبلغ 10,000 ريال، وسيتم التوصيل خلال 24 ساعة',
      time: 'منذ ساعتين',
      type: 'donation',
      read: false
    },
    {
      id: '2',
      title: 'تم توصيل تبرعك',
      message: 'تم توصيل تبرعك لمسجد التقوى بنجاح، شكراً لمساهمتك',
      time: 'منذ 5 ساعات',
      type: 'delivery',
      read: false
    },
    {
      id: '3',
      title: 'حملة جديدة',
      message: 'تم إطلاق حملة جديدة لتوفير المياه لمساجد خلف خلال شهر رمضان',
      time: '22 مايو 2025',
      type: 'campaign',
      read: true
    },
    {
      id: '4',
      title: 'احتياج عاجل',
      message: 'مسجد الروضة بحاجة ماسة للمناديل والمنظفات، ساهم في توفيرها',
      time: '20 مايو 2025',
      type: 'alert',
      read: true
    }
  ];
  
  return (
    <div className="py-6">
      <h2 className="text-xl font-bold text-secondary-800 mb-6">
        {t('navigation.notifications')}
      </h2>
      
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      ) : (
        <div className="card p-6 text-center">
          <p className="text-secondary-600">لا توجد إشعارات حتى الآن</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;