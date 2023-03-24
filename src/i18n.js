// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
// import { TRANSLATIONS_EN } from "../src/utils/en/translation";
// import { TRANSLATIONS_ES } from "../src/utils/es/translation";

// var userLang = navigator.language || navigator.userLanguage;
// let preLanguage = userLang.includes("en") ? "en" : "es";
//  const fallbackLng = [preLanguage];
// const availableLanguages = ["es", "en"];
// const resources = {
//   en: {
//     translation: TRANSLATIONS_EN,
//   },
//   es: {
//     translation: TRANSLATIONS_ES,
//   },
// };

// export default i18n
//   .use(I18nextBrowserLanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     // fallbackLng,
//     whitelist: availableLanguages,
//   });



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
