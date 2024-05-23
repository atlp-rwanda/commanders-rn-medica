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
import { SvgXml } from "react-native-svg";
import { scan } from "@/assets/icons/settings";
import * as icons from "@/assets/icons/settings";
import PayCard from "@/components/settings/payCard";

interface Setting {
  id: number;
  title: string;
  icon: string;
}
const securitySettings: Setting[] = [
  { id: 1, title: "PayPal", icon: icons.paypal },
  { id: 2, title: "Google Play", icon: icons.googlePay },
  { id: 3, title: "Apple Pay", icon: icons.applePay },
  { id: 4, title: "•••• •••• •••• •••• 4679", icon: icons.masterCard },
  { id: 5, title: "•••• •••• •••• •••• 2766", icon: icons.masterCard },
  { id: 6, title: "•••• •••• •••• •••• 3892", icon: icons.masterCard },
];

const Payment = () => {
  const insets = useSafeAreaInsets();
  const [settings, updateSettings] = useState<Setting[]>(securitySettings);
  return (
    <View className={`flex-1 pt-[${insets.top}px] bg-white`}>
      <View className="px-6 mt-8">
        <NavigationHeader title={"Payment"} onBack={router.back}>
          <Touchable>
            <SvgXml xml={scan} />
          </Touchable>
        </NavigationHeader>
      </View>
      <ScrollView className="flex-1 pb-6">
        <FlatList
          data={settings}
          scrollEnabled={false}
          className="pt-2"
          renderItem={({ item, index }) => (
            <PayCard
              key={index}
              title={item.title}
              icon={<SvgXml xml={item.icon} className="mr-5" />}
            />
          )}
        />
        <Button title={"Add New Card"} rounded classes="mx-6" />
      </ScrollView>
    </View>
  );
};

export default Payment;
