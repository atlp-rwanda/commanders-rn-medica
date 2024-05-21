import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { medicaLogo } from "@/assets/icons/medica-logo";
import { moreOutlinedIcon } from "@/assets/icons/more";
import Touchable from "@/components/common/touchable";
import { edit } from "@/assets/icons/edit";
import SettingCard from "@/components/settings/settingCard";
import * as icons from "@/assets/icons/settings";

const settings: {
  text: string;
  text2?: string;
  rightIcon?: React.ReactNode;
  leftIcon: string;
  logout?: boolean;
  mode?: boolean;
  nextTo?: string;
}[] = [
  { text: "Profile", nextTo: "editProfile", leftIcon: icons.profileSettings },
  {
    text: "Notification",
    nextTo: "notification",
    leftIcon: icons.notification,
  },
  {
    text: "Payment",
    nextTo: "payment",
    leftIcon: icons.wallet,
  },
  {
    text: "Security",
    nextTo: "security",
    leftIcon: icons.shieldDone,
  },
  {
    text: "Laguange",
    nextTo: "language",
    leftIcon: icons.language,
    text2: "English (US)",
  },
  {
    text: "Dark mode",
    nextTo: "mode",
    leftIcon: icons.eye,
    mode: true,
  },
  {
    text: "Help Center",
    nextTo: "help",
    leftIcon: icons.info,
  },
  {
    text: "Invite Friends",
    nextTo: "friends",
    leftIcon: icons.friends,
  },
  {
    text: "Logout",
    nextTo: "security",
    leftIcon: icons.logout,
    rightIcon: null,
    logout: true,
  },
];

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <View className={`flex-1 w-full mt-[${insets.top}px]`}>
      <View className="flex-row px-6 pt-6 items-center justify-between mt-6">
        <View className="flex-row items-center">
          <SvgXml xml={medicaLogo} className="mr-2.5" />
          <Text className="text-2xl font-UrbanistBold text-greyscale-900">
            Profile
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
              source={require("../../assets/doctors/doc1.png")}
              className="h-[140px] w-[140px] rounded-full"
            />
            <Touchable className="absolute bottom-0 right-0">
              <SvgXml xml={edit} />
            </Touchable>
          </View>
          <Text className="font-UrbanistBold text-2xl text-greyscale-900 mb-2">
            Andrew Ainsley
          </Text>
          <Text className="text-[14px] font-UrbanistSemiBold text-greyscale-900">
            +1 111 467 378 399
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={settings}
          className="mb-5"
          renderItem={({ item, index }) => (
            <SettingCard
              text={item.text}
              leftIcon={<SvgXml xml={item.leftIcon} className="mr-2.5" />}
              nextTo={item.nextTo}
              rightIcon={item.rightIcon}
              logout={item.logout}
              text2={item.text2}
              mode={item.mode}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;
