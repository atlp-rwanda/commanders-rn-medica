import { Text } from "@/components/ThemedText";
import { Image, ImageSourcePropType, View } from "react-native";

export type NotificationType = "appointment" | "schedule" | "service" | "card";
export type NotificationState = "error" | "success" | "warning" | "info";

export type Notification = {
  title: String;
  description: String;
  date: String;
  time: String;
  type: NotificationType;
  state: NotificationState;
  new?: boolean;
};

type NotificationComponentProps = {
  notification: Notification;
};

export default function NotificationComponent({
  notification,
}: NotificationComponentProps) {
  return (
    <View className="py-3 px-4 my-3 gap-3">
      <View className="flex-row items-center mb-1 gap-x-3">
        <NotificatonIcon type={notification.type} state={notification.state} />
        <View className="flex-1">
          <Text className="text-xl font-UrbanistSemiBold mb-1">
            {notification.title}
          </Text>
          <Text className="text-gray-500 text-[16px]">
            {notification.date} | {notification.time}
          </Text>
        </View>
        {notification.new && (
          <View className="bg-primary-500 rounded-md px-[10px] py-[6px]">
            <Text className="text-white text-xs">New</Text>
          </View>
        )}
      </View>
      <Text className="text-gray-500 text-base opacity-90">
        {notification.description}
      </Text>
    </View>
  );
}

const NotificatonIcon = ({
  type,
  state,
}: {
  type: NotificationType;
  state: NotificationState;
}) => {
  let image: ImageSourcePropType | undefined = undefined;

  switch (type) {
    case "appointment":
      switch (state) {
        case "error":
          image = require("../../assets/icons/close-square.png");
          break;
        case "info":
          image = require("../../assets/icons/calendar-info.png");
          break;
      }
      break;
    case "schedule":
      image = require("../../assets/icons/calendar.png");
      break;
    case "service":
      image = require("../../assets/icons/ticket.png");
      break;
    case "card":
      image = require("../../assets/icons/wallet.png");
      break;
  }

  let className = "";
  switch (state) {
    case "error":
      className = "bg-red-50";
      break;
    case "info":
      className = "bg-blue-50";
      break;
    case "success":
      className = "bg-green-50";
      break;
    case "warning":
      className = "bg-yellow-50";
      break;
    default:
      className = "bg-gray-50";
      break;
  }

  return (
    <View className={"p-4 rounded-full " + className}>
      <Image className="w-7 h-7" source={image} />
    </View>
  );
};
