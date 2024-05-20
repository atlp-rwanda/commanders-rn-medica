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
}
const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Text style={commonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
