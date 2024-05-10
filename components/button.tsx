import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
  backgroundColor?: string;
}
const Button: React.FC<Props> = ({ title, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={[btnStyle, { backgroundColor }]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
