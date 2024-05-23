import { View, Text } from "react-native";
import React from "react";
import ToggleSwitch from "toggle-switch-react-native";

interface Notif {
  title: string;
  value: boolean;
  updateValue: () => void;
}

const NotifCard: React.FC<Notif> = ({ title, value, updateValue }) => {
  return (
    <View className="mb-6 flex-row justify-between">
      <Text className="font-UrbanistSemiBold text-lg">{title}</Text>
      <ToggleSwitch
        onColor="#246BFD"
        offColor="#EEEEEE"
        isOn={value}
        onToggle={updateValue}
      />
    </View>
  );
};

export default NotifCard;
