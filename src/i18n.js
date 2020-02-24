import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from 'react-i18next';

import translationEng from "./locales/en/translation.json";
import translationVie from "./locales/vi/translation.json";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'vi',
    fallbackLng: 'vi', // use en if detected lng is not available
    
    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      vi: {
        translations: translationVie,
      },
      en: {
        translations: translationEng,
      },
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    react: {
      wait: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    },
  });

export default i18n;