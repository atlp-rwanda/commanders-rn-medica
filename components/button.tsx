import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
}
const Button: React.FC<Props> = ({ title }) => {
  return (
    <TouchableOpacity style={btnStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;