import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Check } from 'lucide-react';

const DonationConfirm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [receiptNumber, setReceiptNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptImage(e.target.files[0]);
      setIsImageUploaded(true);
    }
  };
  
  const handleSubmit = () => {
    if (receiptNumber && isImageUploaded) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Clear localStorage donation data
        localStorage.removeItem('selectedDonationType');
        localStorage.removeItem('selectedMosque');
        localStorage.removeItem('donationQuantity');
        localStorage.removeItem('donationTotal');
        localStorage.removeItem('selectedCompany');
        
        // Redirect to home after success
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 2000);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="py-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-success-400 p-4 rounded-full mb-4">
          <Check size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-800 mb-2 text-center">
          تم التبرع بنجاح
        </h2>
        <p className="text-secondary-600 text-center mb-6">
          شكراً لك على تبرعك. سيتم إشعارك عند وصول تبرعك للمسجد.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-secondary-800 mb-6 text-center">
          {t('donation.confirmDonation')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-secondary-700 mb-1">
            {t('donation.receiptNumber')}
          </label>
          <input 
            type="text" 
            className="input-field"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
            placeholder="أدخل رقم سند الإيداع"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-secondary-700 mb-2">
            {t('donation.uploadReceipt')}
          </label>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              isImageUploaded ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-300'
            }`}
            onClick={() => document.getElementById('receipt-upload')?.click()}
          >
            <input
              type="file"
              id="receipt-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            
            {isImageUploaded ? (
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 p-2 rounded-full mb-2">
                  <Check size={24} className="text-primary-500" />
                </div>
                <p className="text-primary-600 font-medium">
                  تم رفع الصورة بنجاح
                </p>
                <p className="text-sm text-secondary-500 mt-1">
                  {receiptImage?.name}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={32} className="text-secondary-400 mb-2" />
                <p className="text-secondary-600 font-medium">
                  انقر لرفع صورة سند الإيداع
                </p>
                <p className="text-xs text-secondary-500 mt-1">
                  (صيغة JPG أو PNG)
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-secondary-700 text-sm mb-6">
          <p>
            سيتم مراجعة تبرعك خلال 24 ساعة وإشعارك عند الانتهاء من التوصيل.
          </p>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!receiptNumber || !isImageUploaded || isSubmitting}
          className={`btn w-full ${
            receiptNumber && isImageUploaded && !isSubmitting
              ? 'btn-primary' 
              : 'btn-secondary opacity-70'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common.loading')}
            </>
          ) : (
            <>
              {t('donation.confirmDonation')}
              <ArrowRight size={18} className="mr-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DonationConfirm;