import { Icon } from "@/components/Icon";
import { Text } from "@/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ScrollView,
  View
} from "react-native";
import NotificationComponent, {
  Notification,
} from "../../components/notifications/notification";

export default function NotificationsScreen() {
  const pickerRef = useRef<Picker<String>>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      title: "Appointment Cancelled!",
      description:
        "You have successfully cancelled your appointment with Dr. Alan Watson on December 24, 2024, 13:00 p.m. 80% of the funds will be returned to your account.",
      date: "Today",
      time: "15:36 PM",
      type: "appointment",
      state: "error",
      new: true,
    },
    {
      title: "Schedule Changed",
      description:
        "You have successfully changed your schedule with Dr. Alan Watson on December 24, 2024, 13:00 p.m. Don't forget to activate your reminder.",
      date: "Yesterday",
      time: "09:23 AM",
      type: "schedule",
      state: "success",
      new: true,
    },
    {
      title: "Appointment Success!",
      description:
        "You have successfully booked an appointment with Dr. Alan Watson on December 24, 2024, 13:00 p.m. Don't forget to activate your reminder.",
      date: "19 Dec. 2022",
      time: "18:35 PM",
      type: "appointment",
      state: "info",
    },
    {
      title: "New Service Available!",
      description:
        "You can make multiple doctoral appointments at once. You can also cancel your appointment.",
      date: "14 Dec. 2022",
      time: "10:52 AM",
      type: "service",
      state: "warning",
    },
    {
      title: "Credic Card Connected!",
      description:
        "Your credit card has been successfully linke with Medica. Enjoy our service.",
      date: "12 Dec. 2022",
      time: "14:36 PM",
      type: "card",
      state: "info",
    },
  ]);

  return (
    <>
      <View className="flex-row items-center gap-x-3 px-8 py-5 mt-8">
        <Icon name="back" onPress={router.back} />
        <Text className="flex-1 font-UrbanistBold text-2xl">Notification</Text>
        <View className="relative">
          <Icon
            name="more-circle"
            size="lg"
            onPress={() => {
              pickerRef.current?.focus();
            }}
          />
          <View className="absolute top-10 right-10 pr-4 left-0 bottom-0 opacity-0">
            <Picker ref={pickerRef} mode="dropdown" onValueChange={() => {}}>
              <Picker.Item label="Clear Notifications" value="clear" style={{
                fontFamily: "UrbanistRegular",
              }} />
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView
        className="flex-1"
      >
        {notifications.map((notification, index) => {
          return (
            <NotificationComponent key={index} notification={notification} />
          );
        })}
      </ScrollView>
    </>
  );
}
