import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { SvgXml } from "react-native-svg";
import { arrowRight } from "@/assets/icons/settings";

interface SecurityCardProps {
  title: string;
  value: boolean;
  auth?: boolean;
  onPressToggle: () => void;
  isBiometric: boolean;
  onPressEnableBiometric?: () => void;
}

const SecurityCard: React.FC<SecurityCardProps> = ({
  title,
  value,
  auth,
  onPressToggle,
  isBiometric,
  onPressEnableBiometric
}) => {
  return (
    <View className="mb-6 flex-row justify-between">
      <Text className="font-UrbanistSemiBold text-lg text-greyscale-900">
        {title}
      </Text>
      {auth && title === "Biometric" ? (
        <Button
          title={isBiometric ? "Enable Biometric" : "Biometric Not Available"}
          onPress={onPressEnableBiometric}
          disabled={!isBiometric}
        />
      ) : auth ? (
        <SvgXml xml={arrowRight} />
      ) : (
        <ToggleSwitch
          onColor="#246BFD"
          offColor="#EEEEEE"
          isOn={value}
          onToggle={onPressToggle}
        />
      )}
    </View>
  );
};

export default SecurityCard;
