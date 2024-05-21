import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Icon } from "@/components/Icon";
import { router } from "expo-router";
import NotifCard from "@/components/settings/notifCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationHeader } from "@/components/NavigationHeader";

interface Notif {
  id: number;
  title: string;
  value: boolean;
}
const notifSettings: Notif[] = [
  { id: 1, title: "General Notification", value: true },
  { id: 2, title: "Sound", value: true },
  { id: 3, title: "Vibrate", value: false },
  { id: 4, title: "Special Offers", value: true },
  { id: 5, title: "Promo & Discount", value: false },
  { id: 6, title: "Payments", value: true },
  { id: 7, title: "Cashback", value: false },
  { id: 8, title: "App Updates", value: true },
  { id: 9, title: "New Service Available", value: false },
  { id: 10, title: "New Tips Available", value: false },
];

const Notification = () => {
  const insets = useSafeAreaInsets();
  const [notifs, updateNotifs] = useState<Notif[]>(notifSettings);
  return (
    <View className={`flex-1 pt-[${insets.top}px] bg-white`}>
      <View className="px-6 mt-8 pb-6">
        <NavigationHeader title={"Notification"} onBack={router.back} />
      </View>
      <FlatList
        data={notifs}
        className="px-6 pb-6"
        renderItem={({ item, index }) => (
          <NotifCard
            key={index}
            title={item.title}
            value={item.value}
            updateValue={() =>
              updateNotifs((prev) =>
                prev.map((notif) =>
                  notif.id === item.id
                    ? { ...notif, value: !item.value }
                    : notif
                )
              )
            }
          />
        )}
      />
    </View>
  );
};

export default Notification;
