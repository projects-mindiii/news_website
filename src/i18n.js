import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_EN } from "../src/utils/en/translation";
import { TRANSLATIONS_ES } from "../src/utils/es/translation";
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: TRANSLATIONS_EN
    },
    es: {
      translations: TRANSLATIONS_ES
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'es'];

export default i18n;
