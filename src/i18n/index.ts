import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import te from './locales/te.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import pa from './locales/pa.json';
import or from './locales/or.json';
import as from './locales/as.json';

const resources = {
  english: { translation: en },
  hindi: { translation: hi },
  bengali: { translation: bn },
  telugu: { translation: te },
  marathi: { translation: mr },
  tamil: { translation: ta },
  gujarati: { translation: gu },
  kannada: { translation: kn },
  malayalam: { translation: ml },
  punjabi: { translation: pa },
  odia: { translation: or },
  assamese: { translation: as },
};

// Get saved language from localStorage
const savedLanguage = localStorage.getItem('agriverse_language') || 'english';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'english',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;