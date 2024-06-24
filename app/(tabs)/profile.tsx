import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { medicaLogo } from "@/assets/icons/medica-logo";
import { moreOutlinedIcon } from "@/assets/icons/more";
import Touchable from "@/components/common/touchable";
import { edit } from "@/assets/icons/edit";
import SettingCard from "@/components/settings/settingCard";
import * as icons from "@/assets/icons/settings";
import { Modalize } from "react-native-modalize";
import LogoutModal from "@/components/settings/logoutModal";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";
import { getProfileImage } from "@/utils/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface SettingItem {
  text: string;
  text2?: string;
  rightIcon?: React.ReactNode;
  leftIcon: string;
  logout?: boolean;
  mode?: boolean;
  nextTo?: string;
}

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<any | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const fetchAndSetLanguage = async () => {
    let language;
    try {
      const { data, error } = await supabase
        .from("selected_language")
        .select("language")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();
      if (data && data.language) {
        language =
          data.language.toLowerCase() === "french" ? "fr" : data.language;
        setSelectedLanguage(data.language);
      }
    } catch (error) {
      console.error("Error fetching selected language from Supabase:", error);
    }

    if (!language) {
      const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
      language = storedLanguage || "en";
      setSelectedLanguage(language);
    }

    i18n.changeLanguage(language);
  };

  const fetchSettings = async () => {
    const initialSettings: SettingItem[] = [
      {
        text: t("profile.title"),
        nextTo: "editProfile",
        leftIcon: icons.profileSettings,
      },
      {
        text: t("profile.notification"),
        nextTo: "notification",
        leftIcon: icons.notification,
      },
      { text: t("profile.payment"), nextTo: "payment", leftIcon: icons.wallet },
      {
        text: t("profile.security"),
        nextTo: "security",
        leftIcon: icons.shieldDone,
      },
      {
        text: t("profile.language"),
        nextTo: "language",
        leftIcon: icons.language,
      },
      {
        text: t("profile.dark_mode"),
        nextTo: "mode",
        leftIcon: icons.eye,
        mode: true,
      },
      {
        text: t("profile.help_center"),
        nextTo: "help",
        leftIcon: icons.info,
      },
      {
        text: t("profile.invite_friends"),
        nextTo: "friends",
        leftIcon: icons.friends,
      },
      {
        text: t("profile.logout"),
        leftIcon: icons.logout,
        rightIcon: null,
        logout: true,
      },
    ];

    const updatedSettings: SettingItem[] = initialSettings.map((item) => {
      if (item.text === t("profile.language")) {
        return { ...item, text2: selectedLanguage || undefined };
      }
      return item;
    });

    setSettings(updatedSettings);
  };

 useEffect(() => {
   fetchAndSetLanguage();
 }, []);

 useFocusEffect(
   React.useCallback(() => {
     const fetchLanguageAndSettings = async () => {
       await fetchAndSetLanguage();
     };
     fetchLanguageAndSettings();
   }, [])
 );

 useEffect(() => {
   fetchSettings();
 }, [selectedLanguage]);
  
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const { data: userData } = await supabase
        .from("patient")
        .select("*")
        .eq("id", data.user?.id)
        .single();
      const profileUrl = await getProfileImage({
        bucket: "files",
        fileName: userData.profile_picture.startsWith("public/")
          ? userData.profile_picture
          : userData.profile_picture.split("/files/")[1],
      });
      profileUrl
        ? setUser({ ...userData, profile_picture: profileUrl })
        : setUser({
            ...userData,
            profile_picture:
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
          });
    })();
  }, []);

  return (
    <View className={`flex-1 w-full mt-[${insets.top}px]`}>
      <View className="flex-row px-6 pt-6 items-center justify-between mt-6">
        <View className="flex-row items-center">
          <SvgXml xml={medicaLogo} className="mr-2.5" />
          <Text className="text-2xl font-UrbanistBold text-greyscale-900">
            {t("profile.title")}
          </Text>
        </View>
        <Touchable>
          <SvgXml xml={moreOutlinedIcon} className="self-end" />
        </Touchable>
      </View>
      <ScrollView
        className="flex-1 p-6"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pb-10 border-b border-b-greyscale-200 mb-10">
          <View>
            <Image
              src={user && user.profile_picture}
              className="h-[140px] w-[140px] rounded-full"
            />
            <Touchable className="absolute bottom-0 right-0">
              <SvgXml xml={edit} />
            </Touchable>
          </View>
          <Text className="font-UrbanistBold text-2xl text-greyscale-900 mb-2">
            {user && user.full_name}
          </Text>
          <Text className="text-[14px] font-UrbanistSemiBold text-greyscale-900">
            {user && user.phone}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={settings}
          className="mb-5"
          renderItem={({ item, index }) => (
            <SettingCard
              key={index}
              text={item.text}
              leftIcon={
                <SvgXml xml={item.leftIcon} style={{ marginRight: 10 }} />
              }
              nextTo={item.nextTo}
              rightIcon={item.rightIcon}
              logout={item.logout}
              text2={item.text2}
              mode={item.mode}
              logoutAction={() => modalizeRef.current?.open()}
            />
          )}
        />
      </ScrollView>
      <LogoutModal
        modalizeRef={modalizeRef}
        onClose={() => modalizeRef.current?.close()}
      />
    </View>
  );
};

export default Profile;
