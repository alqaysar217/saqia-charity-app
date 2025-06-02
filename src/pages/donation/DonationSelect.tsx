import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Droplet, AlertTriangle, Coffee, Scroll } from 'lucide-react';

const DonationSelect: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(() => {
    const savedType = localStorage.getItem('selectedDonationType');
    return savedType || '';
  });

  const donationTypes = [
    { 
      id: 'water',
      icon: <Droplet size={32} className="text-primary-500" />, 
      title: t('home.water'),
      color: 'bg-primary-50 border-primary-200',
      activeColor: 'bg-primary-100 border-primary-400'
    },
    { 
      id: 'tissues',
      icon: <Scroll size={32} className="text-secondary-500" />, 
      title: t('home.tissues'),
      color: 'bg-secondary-50 border-secondary-200',
      activeColor: 'bg-secondary-100 border-secondary-400'
    },
    { 
      id: 'cleaning',
      icon: <AlertTriangle size={32} className="text-warning-400" />, 
      title: t('home.cleaningSupplies'),
      color: 'bg-yellow-50 border-yellow-200',
      activeColor: 'bg-yellow-100 border-yellow-400'
    },
    { 
      id: 'meals',
      icon: <Coffee size={32} className="text-success-400" />, 
      title: t('home.meals'),
      color: 'bg-green-50 border-green-200',
      activeColor: 'bg-green-100 border-green-400'
    }
  ];
  
  const handleContinue = () => {
    if (selectedType) {
      localStorage.setItem('selectedDonationType', selectedType);
      navigate('/donate/mosque');
    }
  };
  
  return (
    <div className="py-6">
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-secondary-800 mb-6 text-center">
          {t('donation.select')}
        </h2>
        
        <div className="space-y-4 mb-6">
          {donationTypes.map((type) => (
            <motion.div
              key={type.id}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors flex items-center ${
                selectedType === type.id ? type.activeColor : type.color
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="ml-4 p-2 rounded-full bg-white">
                {type.icon}
              </div>
              <span className="font-medium">{type.title}</span>
              
              {selectedType === type.id && (
                <div className="mr-auto w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={!selectedType}
          className={`btn w-full ${
            selectedType ? 'btn-primary' : 'btn-secondary opacity-70'
          }`}
        >
          {t('common.next')}
          <ArrowRight size={18} className="mr-2" />
        </button>
      </div>
      
      <div className="card bg-blue-50 p-4 border border-blue-100">
        <h3 className="font-medium text-secondary-800 mb-2">كيف تعمل التبرعات؟</h3>
        <p className="text-secondary-600 text-sm">
          بعد اختيار نوع التبرع، سيتم توجيهك لاختيار المسجد وتحديد الكمية، ثم اختيار طريقة الدفع. بعد تأكيد التبرع، سيتم إيصال الاحتياجات للمسجد.
        </p>
      </div>
    </div>
  );
};

export default DonationSelect;