import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Droplet, AlertTriangle, Coffee, Scroll } from 'lucide-react';

const DonationTypeCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  color: string;
  onClick: () => void;
}> = ({ icon, title, color, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`card flex flex-col items-center justify-center p-4 cursor-pointer ${color}`}
      onClick={onClick}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-secondary-700 font-medium">{title}</span>
    </motion.div>
  );
};

const CampaignCard: React.FC<{
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
}> = ({ title, description, progress, imageUrl }) => {
  return (
    <div className="card overflow-hidden mb-4">
      <div className="h-40 overflow-hidden rounded-t-lg">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-secondary-600 text-sm mb-4">{description}</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-primary-400 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary-600">نسبة الإنجاز</span>
          <span className="text-primary-500 font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const donationTypes = [
    { 
      icon: <Droplet size={32} className="text-primary-500" />, 
      title: t('home.water'),
      color: 'bg-primary-50',
      type: 'water'
    },
    { 
      icon: <Scroll size={32} className="text-secondary-500" />, 
      title: t('home.tissues'),
      color: 'bg-secondary-50',
      type: 'tissues'
    },
    { 
      icon: <AlertTriangle size={32} className="text-warning-400" />, 
      title: t('home.cleaningSupplies'),
      color: 'bg-yellow-50',
      type: 'cleaning'
    },
    { 
      icon: <Coffee size={32} className="text-success-400" />, 
      title: t('home.meals'),
      color: 'bg-green-50',
      type: 'meals'
    }
  ];
  
  const campaigns = [
    {
      title: 'حملة توفير مياه لمساجد صنعاء',
      description: 'هدفنا توفير 1000 كرتون مياه لمساجد صنعاء خلال شهر رمضان',
      progress: 65,
      imageUrl: '/images/ms1.jpg'
    },
    {
      title: 'تجهيز المساجد للعيد',
      description: 'توفير مستلزمات النظافة والمناديل لمساجد الشحر استعداداً للعيد',
      progress: 35,
      imageUrl: '/images/ms2.jpg'
    }
  ];
  
  const handleDonationTypeClick = (type: string) => {
    // Store the selected donation type
    localStorage.setItem('selectedDonationType', type);
    navigate('/donate/select');
  };
  
  return (
    <div className="py-6">
      {/* Campaigns Carousel */}
      <div className="relative mb-8 overflow-hidden rounded-lg">
        <img 
          src="/images/ms3.jpg"
          alt="Donation Campaign"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-white text-xl font-bold mb-1">معاً لدعم مساجد اليمن</h2>
          <p className="text-white/90 text-sm mb-2">ساهم في توفير الماء والمناديل والمنظفات والوجبات</p>
          <button 
            onClick={() => navigate('/donate/select')} 
            className="btn btn-primary py-1 self-start"
          >
            تبرع الآن
          </button>
        </div>
      </div>
      
      {/* Donation Types */}
      <h2 className="text-xl font-bold text-secondary-800 mb-4">{t('home.donationTypes')}</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {donationTypes.map((type, index) => (
          <DonationTypeCard
            key={index}
            icon={type.icon}
            title={type.title}
            color={type.color}
            onClick={() => handleDonationTypeClick(type.type)}
          />
        ))}
      </div>
      
      {/* Campaigns */}
      <h2 className="text-xl font-bold text-secondary-800 mb-4">{t('home.campaigns')}</h2>
      <div className="mb-6">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            title={campaign.title}
            description={campaign.description}
            progress={campaign.progress}
            imageUrl={campaign.imageUrl}
          />
        ))}
      </div>
      
      {/* Urgent Needs */}
      <h2 className="text-xl font-bold text-secondary-800 mb-4">{t('home.urgentNeeds')}</h2>
      <div className="card bg-red-50 border border-red-100 mb-4">
        <div className="flex items-center p-4">
          <div className="bg-red-100 p-2 rounded-full ml-3">
            <AlertTriangle size={24} className="text-error-400" />
          </div>
          <div>
            <h3 className="font-bold text-secondary-800">مسجد الرحمة - جول الشفاء</h3>
            <p className="text-secondary-600 text-sm">نفاذ المياه والمناديل</p>
          </div>
          <button 
            className="btn btn-primary py-1 px-3 mr-auto text-sm"
            onClick={() => navigate('/donate/select')}
          >
            تبرع
          </button>
        </div>
      </div>
      
      <div className="card bg-yellow-50 border border-yellow-100">
        <div className="flex items-center p-4">
          <div className="bg-yellow-100 p-2 rounded-full ml-3">
            <AlertTriangle size={24} className="text-warning-400" />
          </div>
          <div>
            <h3 className="font-bold text-secondary-800">مسجد التقوى - الشرج</h3>
            <p className="text-secondary-600 text-sm">نقص في المنظفات</p>
          </div>
          <button 
            className="btn btn-primary py-1 px-3 mr-auto text-sm"
            onClick={() => navigate('/donate/select')}
          >
            تبرع
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;