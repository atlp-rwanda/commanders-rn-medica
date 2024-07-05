import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";
import { language } from "@/assets/icons/settings";

interface Language {
  key: number;
  id?: string;
  language: string;
}

export default function Languages() {
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [changingLanguage, setChangingLanguage] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUserId(data.user?.id || null);
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, []);

  const fetchLanguages = async () => {
    setLoadingLanguages(true);
    try {
      const { data: supabaseData, error } = await supabase
        .from("language")
        .select("id, language, key")
        .order("key", { ascending: true });
      if (error || !supabaseData) {
        console.log("Error loading languages from Supabase:", error);
        throw new Error("Fallback to local languages");
      }
      setLanguages(supabaseData);
    } catch (error) {
      console.log("Error loading languages:", error);
      setLanguages(localLanguages);
    } finally {
      setLoadingLanguages(false);
    }
  };

  const localLanguages: Language[] = [
    { language: "English (US)", key: 1 },
    { language: "English (UK)", key: 2 },
    { language: "Kinyarwanda", key: 3 },
    { language: "Swahili", key: 4 },
    { language: "Spanish", key: 5 },
    { language: "French", key: 6 },
    { language: "Luganda", key: 7 },
    { language: "Yoruba", key: 8 },
    { language: "Arabic", key: 9 },
    { language: "Fulani", key: 10 },
    { language: "Mandarin", key: 11 },
    { language: "Hausa", key: 12 },
    { language: "Chinese", key: 13 },
    { language: "Russian", key: 14 },
    { language: "Shona", key: 15 },
  ];

  const handleLanguageChange = async (languageName: string) => {
    setChangingLanguage(true);
    const selectedLanguage = languages.find(
      (lang) => lang.language === languageName
    );

    if (!selectedLanguage) {
      console.log("Selected language not found in languages array.");
      setChangingLanguage(false);
      return;
    }

    setSelectedLanguage(languageName);
    i18n.changeLanguage(languageName.toLowerCase());
    await AsyncStorage.setItem("selectedLanguage", languageName);

    const { data: existingData, error: fetchError } = await supabase
      .from("selected_language")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching existing language:", fetchError);
      setChangingLanguage(false);
      return;
    }

    if (existingData) {
      const { error: updateError } = await supabase
        .from("selected_language")
        .update({
          language_id: selectedLanguage.id,
          language: selectedLanguage.language,
        })
        .eq("id", existingData.id);

      if (updateError) {
        console.error("Error updating language:", updateError);
        setChangingLanguage(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("selected_language")
        .insert({
          user_id: userId,
          language_id: selectedLanguage.id,
          language: selectedLanguage.language,
        });

      if (insertError) {
        console.error("Error inserting language:", insertError);
        setChangingLanguage(false);
        return;
      }
    }
    setChangingLanguage(false);
  };

  const loadSelectedLanguage = () => {
    AsyncStorage.getItem("selectedLanguage")
      .then((storedLanguage) => {
        if (storedLanguage !== null && storedLanguage !== undefined) {
          setSelectedLanguage(storedLanguage);
          const selectedLanguage = languages.find(
            (lang) => lang.language === storedLanguage
          );
        } else {
          console.log("No stored language found in AsyncStorage.");
        }
      })
      .catch((error) => {
        console.error("Error loading selected language:", error);
      });
  };

  useEffect(() => {
    fetchLanguages();
    loadSelectedLanguage();
  }, []);

  return (
    <View className="flex-1 bg-white py-10 px-4">
      <View className="flex-row px-2 py-6">
        <Icon name="back" onPress={router.back} />
        <Text className="flex-1 font-UrbanistBold text-[24px] ml-4 mt-[-6px]">
          {t("language")}
        </Text>
      </View>
      <Text className="font-UrbanistBold text-[20px] text-[#212121] my-3 mx-4">
        {t("suggested")}
      </Text>
      <View>
        {loadingLanguages ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          languages.slice(0, 2).map((item) => (
            <View key={item.key} className="flex-row justify-between my-5 mx-4">
              <Text className="font-UrbanistSemiBold text-[18px] text-[#212121]">
                {t(item.language)}
              </Text>
              <TouchableOpacity
                className="w-[20px] h-[20px] border-[3px] rounded-[10px] border-[#246BFD] items-center justify-center"
                onPress={() => handleLanguageChange(item.language)}
                disabled={changingLanguage}
              >
                {selectedLanguage === item.language && (
                  <View className="w-[11.67px] h-[11.67px] rounded-[5.8px] bg-lightblue"></View>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
        <View className="border-[#EEEEEE] border-[1px] mt-3 mx-4"></View>
      </View>
      <Text className="font-UrbanistBold text-[20px] text-[#212121] my-5 mx-4">
        {t("language")}
      </Text>
      {loadingLanguages ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={languages.slice(2)}
          renderItem={({ item }) => (
            <View className="flex-row justify-between my-5 mx-4" key={item.key}>
              <Text className="font-UrbanistSemiBold text-[18px] text-[#212121]">
                {t(item.language)}
              </Text>
              <TouchableOpacity
                className="w-[20px] h-[20px] border-[3px] rounded-[10px] border-[#246BFD] items-center justify-center"
                onPress={() => handleLanguageChange(item.language)}
                disabled={changingLanguage}
              >
                {selectedLanguage === item.language && (
                  <View className="w-[11.67px] h-[11.67px] rounded-[5.8px] bg-lightblue"></View>
                )}
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, key) => item.language}
          showsVerticalScrollIndicator={false}
        />
      )}
      {changingLanguage && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
