'use client'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // <-- use backend for fetching
  .use(initReactI18next)
  .init({
    lng: navigator.language.split('-')[0], // Default language (browser)
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true, // missing keys
    missingKeyHandler: function (lng, ns, key) {
      console.warn(`Missing translation for key "${key}" in ${lng}`);
    },
    backend: {
      loadPath: `${process.env.NEXT_PUBLIC_BASE_URL}/setting/translation/{{lng}}?all=true`,
      parse: (data: string) => {
        const json = JSON.parse(data);
        return json.translations.translations; // pick the inner object
      },
    },
  });

export default i18n;
