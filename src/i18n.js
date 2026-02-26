// i18n/index.js
import { createI18n } from "vue-i18n";
import en from "./locales/en.js";
import km from "./locales/km.js";

const savedLang = localStorage.getItem("language") || "en";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLang,
  fallbackLocale: "en",

  messages: {
    en,
    km
  },

  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },

    km: {
      currency: {
        style: "currency",
        currency: "KHR",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    },
  },


  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
      long: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    km: {
      short: {
        year: "numeric",
        month: "short",
        day: "2-digit",
        numberingSystem: "khmr"
      },
      medium: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        numberingSystem: "khmr"
      },
      long: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        numberingSystem: "khmr"
      },
    },
  },
});

export default i18n;
