import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";
import { AntDesign } from "@expo/vector-icons"; 

type IconName = "facebook-square" | "apple1" | "google" | undefined;

interface Props {
  title: string;
  iconName?: IconName; 
  color?: string;
}

const SiginButton: React.FC<Props> = ({
  title,
  iconName,
  color = "transparent",
}) => {
  return (
    <TouchableOpacity
      style={[
        btnStyle,
        {
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          backgroundColor: color,
          borderRadius: 16,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {iconName && <AntDesign name={iconName} size={24} />}
        <Text style={[textStyle, { marginLeft: iconName ? 5 : 0 }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SiginButton;
