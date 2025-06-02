import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
  target: number;
  collected: number;
  endDate: string;
}

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden mb-6"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{campaign.title}</h3>
        <p className="text-secondary-600 text-sm mb-4">{campaign.description}</p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-primary-400 rounded-full" 
            style={{ width: `${campaign.progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <span className="text-secondary-600">
            {campaign.collected.toLocaleString()} ريال من {campaign.target.toLocaleString()} ريال
          </span>
          <span className="text-primary-500 font-medium">{campaign.progress}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary-500">
            ينتهي في {campaign.endDate}
          </span>
          <button 
            onClick={() => navigate('/donate/select')}
            className="btn btn-primary py-1 px-4"
          >
            تبرع الآن
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Campaigns: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'حملة توفير مياه لمساجد الصحابة',
      description: 'هدفنا توفير 1000 كرتون مياه لمساجد جول الشفاء خلال شهر رمضان',
      imageUrl: '/images/w3.jpg',
      progress: 65,
      target: 2500000,
      collected: 1625000,
      endDate: '15 يونيو 2025'
    },
    {
      id: '2',
      title: 'تجهيز المساجد للعيد',
      description: 'توفير مستلزمات النظافة والمناديل لمساجد الغيل استعداداً للعيد',
      imageUrl: '/images/w4.jpg',
      progress: 35,
      target: 1000000,
      collected: 350000,
      endDate: '10 يونيو 2025'
    },
    {
      id: '3',
      title: 'وجبات إفطار للمصلين',
      description: 'توفير وجبات إفطار للمصلين في 50 مسجداً في مختلف أنحاء اليمن',
      imageUrl: '/images/w2.jpeg',
      progress: 80,
      target: 5000000,
      collected: 4000000,
      endDate: '20 يونيو 2025'
    }
  ];
  
  return (
    <div className="py-6">
      <h2 className="text-xl font-bold text-secondary-800 mb-6">
        {t('navigation.campaigns')}
      </h2>
      
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default Campaigns;