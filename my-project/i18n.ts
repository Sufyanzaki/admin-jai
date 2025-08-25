'use client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const getDefaultLanguage = () => {
    if (typeof window !== "undefined" && navigator) {
        return navigator.language.split("-")[0];
    }
    return "en"; // fallback for SSR
};

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: getDefaultLanguage(), // safely get browser language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        saveMissing: true,
        missingKeyHandler: function (lng, ns, key) {
            console.warn(`Missing translation for key "${key}" in ${lng}`);
        },
        backend: {
            loadPath: `${process.env.NEXT_PUBLIC_BASE_URL}/setting/translation/{{lng}}?all=true`,
            parse: (data: string) => {
                const json = JSON.parse(data);
                return json.translations.translations;
            },
        },
    });

export default i18n;
