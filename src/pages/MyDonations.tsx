import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplet, Scroll, AlertTriangle, Coffee, Clock, Check, X } from 'lucide-react';

interface Donation {
  id: string;
  type: 'water' | 'tissues' | 'cleaning' | 'meals';
  mosque: string;
  location: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
}

const DonationCard: React.FC<{ donation: Donation }> = ({ donation }) => {
  const getIcon = () => {
    switch (donation.type) {
      case 'water':
        return <Droplet size={20} className="text-primary-500" />;
      case 'tissues':
        return <Scroll size={20} className="text-secondary-500" />;
      case 'cleaning':
        return <AlertTriangle size={20} className="text-warning-400" />;
      case 'meals':
        return <Coffee size={20} className="text-success-400" />;
    }
  };
  
  const getStatusIcon = () => {
    switch (donation.status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'completed':
        return <Check size={20} className="text-green-500" />;
      case 'rejected':
        return <X size={20} className="text-red-500" />;
    }
  };
  
  const getStatusText = () => {
    switch (donation.status) {
      case 'pending':
        return 'قيد التنفيذ';
      case 'completed':
        return 'تم التوصيل';
      case 'rejected':
        return 'مرفوض';
    }
  };
  
  const getStatusColor = () => {
    switch (donation.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };
  
  const getTypeName = () => {
    switch (donation.type) {
      case 'water':
        return 'ماء';
      case 'tissues':
        return 'مناديل';
      case 'cleaning':
        return 'منظفات';
      case 'meals':
        return 'وجبات';
    }
  };
  
  return (
    <div className="card mb-4">
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-full bg-gray-100 ml-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-secondary-800">
            {donation.mosque}
          </h3>
          <div className="flex items-center">
            <span className="text-sm text-secondary-500">{donation.location}</span>
            <span className="mx-2 text-secondary-300">•</span>
            <span className="text-sm text-secondary-500">{donation.date}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs flex items-center ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="mr-1">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <span className="text-secondary-600">نوع التبرع</span>
          <span className="font-medium">{getTypeName()}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-secondary-600">المبلغ</span>
          <span className="font-medium">{donation.amount.toLocaleString()} ريال</span>
        </div>
      </div>
    </div>
  );
};

const MyDonations: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock donations data
  const donations: Donation[] = [
    {
      id: '1',
      type: 'water',
      mosque: 'مسجد الرحمة',
      location: 'جول الشفاء',
      date: '20 مايو 2025',
      amount: 10000,
      status: 'completed'
    },
    {
      id: '2',
      type: 'tissues',
      mosque: 'مسجد التقوى',
      location: 'الشرج',
      date: '15 مايو 2025',
      amount: 5000,
      status: 'pending'
    },
    {
      id: '3',
      type: 'cleaning',
      mosque: 'مسجد الروضة',
      location: 'المكلا',
      date: '10 مايو 2025',
      amount: 7500,
      status: 'completed'
    },
    {
      id: '4',
      type: 'meals',
      mosque: 'مسجد بر الوالدين',
      location: 'فوة',
      date: '5 مايو 2025',
      amount: 15000,
      status: 'rejected'
    }
  ];
  
  return (
    <div className="py-6">
      <h2 className="text-xl font-bold text-secondary-800 mb-6">
        {t('profile.myDonations')}
      </h2>
      
      {donations.length > 0 ? (
        donations.map(donation => (
          <DonationCard key={donation.id} donation={donation} />
        ))
      ) : (
        <div className="card p-6 text-center">
          <p className="text-secondary-600">لا توجد تبرعات حتى الآن</p>
        </div>
      )}
    </div>
  );
};

export default MyDonations;