import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { Icon } from "@/components/Icon";
import { router } from "expo-router";
import NotifCard from "@/components/settings/notifCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationHeader } from "@/components/NavigationHeader";
import SecurityCard from "@/components/settings/securityCard";
import Touchable from "@/components/common/touchable";
import Button from "@/components/button";

interface Setting {
  id: number;
  title: string;
  value: boolean;
  auth?: boolean;
}
const securitySettings: Setting[] = [
  { id: 1, title: "Remember me", value: true },
  { id: 2, title: "Face ID", value: false },
  { id: 3, title: "Biometric ID", value: true },
  { id: 4, title: "Google Authenticator", auth: true, value: true },
];

const Security = () => {
  const insets = useSafeAreaInsets();
  const [settings, updateSettings] = useState<Setting[]>(securitySettings);
  return (
    <View className={`flex-1 pt-[${insets.top}px] bg-white`}>
      <View className="px-6 mt-8 pb-6">
        <NavigationHeader title={"Security"} onBack={router.back} />
      </View>
      <ScrollView className="flex-1 px-6 pb-6">
        <FlatList
          data={settings}
          scrollEnabled={false}
          className=""
          renderItem={({ item, index }) => (
            <SecurityCard
              key={index}
              title={item.title}
              value={item.value}
              auth={item.auth}
              updateValue={() =>
                updateSettings((prev) =>
                  prev.map((setting) =>
                    setting.id === item.id
                      ? { ...setting, value: !item.value }
                      : setting
                  )
                )
              }
            />
          )}
        />
        <Button title={"Change PIN"} rounded secondary />
        <Button title={"Change Password"} rounded secondary />
      </ScrollView>
    </View>
  );
};

export default Security;
