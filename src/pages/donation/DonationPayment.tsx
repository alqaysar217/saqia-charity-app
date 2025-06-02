import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard, Copy, Check } from 'lucide-react';

interface TransferCompany {
  id: string;
  name: string;
  accountNumber: string;
  logo: string;
}

const DonationPayment: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Mock data for transfer companies
  const transferCompanies: TransferCompany[] = [
    { 
      id: 'alamqy', 
      name: 'العمقي', 
      accountNumber: '25419655',
      logo: 'https://play-lh.googleusercontent.com/rNelKXjJo4-kZ6jK5uPYqFbHsK8P_vCL0oRRQzrvAzNc2peMy4TpA_i64ln-j5LJ2CY'
    },
    { 
      id: 'alkuraimi', 
      name: 'الكريمي', 
      accountNumber: '23710714',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/KuraimiBank.png'
    },
    { 
      id: 'albasiri', 
      name: 'بن دول', 
      accountNumber: '23185663',
      logo: 'https://play-lh.googleusercontent.com/XsXAsTkc9Takj-CGjz2Aiyyt1QdbWAHq4nblRWwFUUhBDBUojuz_3eVxAtFbUWVHL43M'
    },
    { 
      id: 'hadramout', 
      name: 'حضرموت', 
      accountNumber: '775258830',
      logo: 'https://play-lh.googleusercontent.com/T05EaWBHw6zfdMZ_tDRdxrpnZQmMXVPriamFJ3piK_knJq1K-9g6wUzcvO3qrtDvWIg'
    },
    { 
      id: 'tadamon', 
      name: 'التضامن', 
      accountNumber: '775258830',
      logo: 'https://play-lh.googleusercontent.com/u1fTCQC5UMJrU-HO4pj3QrVcELxJeeNWN4lp9069VoKCq6rUjLGfzUFI0UtP5srNJsZF=w240-h480-rw'
    },
    { 
      id: 'busairi', 
      name: 'البسيري', 
      accountNumber: '775258830',
      logo: 'https://play-lh.googleusercontent.com/4vIt4yBp_TOQ5-ioMsu09YurbXkuTD7_v31NP32u_eL__0s4sGM4G568bStfEreCMPOI'
    },
    { 
      id: 'almahdhar', 
      name: 'المحظار', 
      accountNumber: '775258830',
      logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b4/cb/02/b4cb02db-adf4-a767-698f-871d03a497a1/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
    },
    { 
      id: 'alkatibi', 
      name: 'القطيبي', 
      accountNumber: '775258830',
      logo: 'https://play-lh.googleusercontent.com/9ogRFViSt4AaUhGqq7KWV8jVvybLbmw5pXVCcoM03B6NKFpC4Sh6Rrk8f3pk4-qJdVg'
    }
  ];
  
  const donationTotal = localStorage.getItem('donationTotal') || '0';
  
  const handleCopyAccount = () => {
    const company = transferCompanies.find(c => c.id === selectedCompany);
    if (company) {
      navigator.clipboard.writeText(company.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleContinue = () => {
    if (selectedCompany) {
      localStorage.setItem('selectedCompany', selectedCompany);
      navigate('/donate/confirm');
    }
  };
  
  const selectedCompanyData = transferCompanies.find(c => c.id === selectedCompany);
  
  return (
    <div className="py-6">
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-secondary-800 mb-6 text-center">
          {t('donation.transferCompany')}
        </h2>
        
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
          {transferCompanies.map((company) => (
            <motion.div
              key={company.id}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors flex items-center ${
                selectedCompany === company.id 
                  ? 'bg-primary-100 border-primary-400' 
                  : 'bg-white border-gray-200'
              }`}
              onClick={() => setSelectedCompany(company.id)}
            >
              <div className="w-10 h-10 ml-3 rounded-lg overflow-hidden">
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="font-medium">{company.name}</span>
              </div>
              
              {selectedCompany === company.id && (
                <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {selectedCompany && (
          <div className="bg-secondary-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-secondary-800 mb-3">{t('donation.transferDetails')}</h3>
            
            <div className="mb-4">
              <label className="text-sm text-secondary-600 mb-1 block">رقم الحساب</label>
              <div className="flex items-center">
                <div className="input-field flex-1 flex items-center justify-between">
                  <span className="font-mono">{selectedCompanyData?.accountNumber}</span>
                  <button 
                    onClick={handleCopyAccount}
                    className="text-primary-500"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-secondary-600 mb-1 block">المبلغ المطلوب تحويله</label>
              <div className="input-field font-bold">
                {parseInt(donationTotal).toLocaleString()} ريال
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-secondary-700 text-sm">
              <p>
                1. قم بتحويل المبلغ إلى رقم الحساب الموضح أعلاه.
              </p>
              <p>
                2. احتفظ بصورة سند الإيداع، ستحتاجها في الخطوة التالية.
              </p>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleContinue}
          disabled={!selectedCompany}
          className={`btn w-full ${
            selectedCompany ? 'btn-primary' : 'btn-secondary opacity-70'
          }`}
        >
          {t('common.next')}
          <ArrowRight size={18} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default DonationPayment;