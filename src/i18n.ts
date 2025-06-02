import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationAR from './locales/ar/translation.json';

// the translations
const resources = {
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;