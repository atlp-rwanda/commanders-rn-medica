import { View, Text } from "react-native";
import React from "react";

interface Notif {
  title: string;
  icon: React.ReactNode;
}

const PayCard: React.FC<Notif> = ({ title, icon }) => {
  return (
    <View className="mb-6 flex-row p-6 bg-white rounded-[20px] shadow mx-6 shadow-[rgba(4, 6, 15, 0.05)] justify-between">
      <View className="flex-row">
        <View className="w-12">{icon}</View>
        <Text className="font-UrbanistSemiBold text-lg text-greyscale-900">
          {title}
        </Text>
      </View>
      <Text className="font-UrbanistBold text-base text-primary-500">
        Connected
      </Text>
    </View>
  );
};

export default PayCard;
