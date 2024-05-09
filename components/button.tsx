import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { btnStyle, textStyle as commonTextStyle } from "../styles/common";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
  backgroundColor?: string; 
}

const Button: React.FC<Props> = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[btnStyle, { backgroundColor, borderRadius: 30 }]}
      onPress={onPress}
    >
      <Text
        style={{ color: "white", fontFamily: "UrbanistBold", fontSize: 16 }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
