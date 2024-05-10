import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
}
const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
