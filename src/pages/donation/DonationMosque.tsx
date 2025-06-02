import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

interface Mosque {
  id: string;
  name: string;
  location: string;
  urgent: boolean;
}

const DonationMosque: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMosque, setSelectedMosque] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for mosques
  const mosques: Mosque[] = [
    { id: 'mosque1', name: 'مسجد الرحمة', location: 'جول الشفاء', urgent: true },
    { id: 'mosque2', name: 'مسجد الروضة', location: 'المكلا', urgent: false },
    { id: 'mosque3', name: 'مسجد بر الوالدين', location: 'فوة', urgent: false },
    { id: 'mosque4', name: 'مسجد الشرج', location: 'الشرج', urgent: false },
    { id: 'mosque5', name: 'مسجد التقوى', location: 'الشرج', urgent: true },
  ];
  
  // Filter mosques based on search query
  const filteredMosques = searchQuery
    ? mosques.filter(mosque => 
        mosque.name.includes(searchQuery) || 
        mosque.location.includes(searchQuery)
      )
    : mosques;
  
  const donationType = localStorage.getItem('selectedDonationType') || 'water';
  
  // Calculate total based on quantity and donation type
  const getPricePerUnit = () => {
    switch (donationType) {
      case 'water':
        return 2500; // price per water carton
      case 'tissues':
        return 1500; // price per tissue pack
      case 'cleaning':
        return 3000; // price per cleaning supplies
      case 'meals':
        return 5000; // price per meal package
      default:
        return 0;
    }
  };
  
  const total = getPricePerUnit() * quantity;
  
  const getUnitLabel = () => {
    switch (donationType) {
      case 'water':
        return 'كرتون';
      case 'tissues':
        return 'عبوة';
      case 'cleaning':
        return 'عبوة';
      case 'meals':
        return 'وجبة';
      default:
        return 'قطعة';
    }
  };
  
  const handleContinue = () => {
    if (selectedMosque && quantity > 0) {
      // Save selected mosque and quantity
      localStorage.setItem('selectedMosque', selectedMosque);
      localStorage.setItem('donationQuantity', quantity.toString());
      localStorage.setItem('donationTotal', total.toString());
      
      navigate('/donate/payment');
    }
  };
  
  return (
    <div className="py-6">
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-secondary-800 mb-6 text-center">
          {t('donation.mosque')}
        </h2>
        
        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن مسجد..."
            className="input-field pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
          {filteredMosques.map((mosque) => (
            <motion.div
              key={mosque.id}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors flex items-center ${
                selectedMosque === mosque.id 
                  ? 'bg-primary-100 border-primary-400' 
                  : 'bg-white border-gray-200'
              }`}
              onClick={() => setSelectedMosque(mosque.id)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{mosque.name}</span>
                  {mosque.urgent && (
                    <span className="mr-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      عاجل
                    </span>
                  )}
                </div>
                <span className="text-sm text-secondary-500">{mosque.location}</span>
              </div>
              
              {selectedMosque === mosque.id && (
                <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
          
          {filteredMosques.length === 0 && (
            <div className="text-center py-8 text-secondary-500">
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-secondary-700 mb-2">{t('donation.quantity')}</label>
          <div className="flex items-center">
            <button 
              className="w-10 h-10 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            >
              -
            </button>
            <div className="mx-4 text-center flex-1">
              <span className="text-xl font-bold">{quantity}</span>
              <span className="text-secondary-500 mr-2">{getUnitLabel()}</span>
            </div>
            <button 
              className="w-10 h-10 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center"
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-secondary-700">{t('donation.total')}</span>
            <span className="text-xl font-bold">{total.toLocaleString()} ريال</span>
          </div>
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={!selectedMosque || quantity <= 0}
          className={`btn w-full ${
            selectedMosque && quantity > 0 ? 'btn-primary' : 'btn-secondary opacity-70'
          }`}
        >
          {t('common.next')}
          <ArrowRight size={18} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default DonationMosque;