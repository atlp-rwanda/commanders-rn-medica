import { View, Text } from "react-native";
import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { SvgXml } from "react-native-svg";
import { arrowRight } from "@/assets/icons/settings";

interface Notif {
  title: string;
  value: boolean;
  updateValue: () => void;
  auth?: boolean;
}

const SecurityCard: React.FC<Notif> = ({ title, value, updateValue, auth }) => {
  return (
    <View className="mb-6 flex-row justify-between">
      <Text className="font-UrbanistSemiBold text-lg text-greyscale-900">
        {title}
      </Text>
      {auth ? (
        <SvgXml xml={arrowRight} />
      ) : (
        <ToggleSwitch
          onColor="#246BFD"
          offColor="#EEEEEE"
          isOn={value}
          onToggle={updateValue}
        />
      )}
    </View>
  );
};

export default SecurityCard;
