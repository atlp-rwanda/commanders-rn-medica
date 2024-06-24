import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import Kinyarwanda from "../locales/kinyarwanda.json";
import Swahili from "../locales/Swahili.json"
import Spanish from "../locales/Spanish.json";
import Yoruba from "../locales/Yoruba.json";
import Arabic from "../locales/Arabic.json";
import Fulani from "../locales/Fulani.json";
import Mandarin from "../locales/Mandarin.json";
import Luganda from "../locales/Luganda.json";
import Hausa from "../locales/Hausa.json";
import Russian from "../locales/Russian.json";
import Chinese from "../locales/Chinese.json";
import Shona from "../locales/Shona.json"
import { supabase } from "./supabase";

const customDetector = {
  name: "customDetector",
  async: true,
  detect: async (callback: (arg0: string) => void) => {
    try {
      const { data, error } = await supabase
        .from("selected_language")
        .select("language")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();

      let selectedLanguage = "en";
      if (data && data.language) {
        selectedLanguage =
          data.language.toLowerCase() === "french" ? "fr" : data.language;
      } else {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (storedLanguage) {
          selectedLanguage =
            storedLanguage.toLowerCase() === "french" ? "fr" : storedLanguage;
        }
      }

      callback(selectedLanguage);
    } catch (error) {
      console.error("Error fetching selected language from Supabase:", error);
      const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
      callback(storedLanguage || "en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.setItem("selectedLanguage", lng);
  },
  lookup: () => {
    let storedLanguage = "en";
    AsyncStorage.getItem("selectedLanguage")
      .then((language) => {
        if (language) {
          storedLanguage = language;
        }
      })
      .catch(() => {
        storedLanguage = "en";
      });
    return storedLanguage;
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customDetector);

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      Kinyarwanda: { translation: Kinyarwanda },
      Swahili: { translation: Swahili },
      Spanish: { translation: Spanish },
      Luganda: { translation: Luganda },
      Yoruba: { translation: Yoruba },
      Arabic: { translation: Arabic },
      Fulani: { translation: Fulani },
      Mandarin: { translation: Mandarin },
      Russian: { translation: Russian },
      Chinese: { translation: Chinese },
      Shona: { translation: Shona },
      Hausa: { translation: Hausa },
    },
    detection: {
      order: ["customDetector", "navigator"],
      caches: ["asyncStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
