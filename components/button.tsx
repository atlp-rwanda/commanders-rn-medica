import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { btnStyle, textStyle as commonTextStyle } from "../styles/common";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
  backgroundColor?: string;
}
const Button: React.FC<Props> = ({ title, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={[btnStyle, { backgroundColor }]} onPress={onPress}>
      <Text style={commonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
