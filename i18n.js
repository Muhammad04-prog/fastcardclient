import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './src/locales/en/translation.json';
import translationRU from './src/locales/ru/translation.json';

const Languages = ['en', 'ru'];

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      ru: {
        translation: translationRU
      }
    },
    fallbackLng: 'en',
    debug: true,
    supportedLngs: Languages,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false // prevent suspense related loading errors
    }
  });

export default i18n;