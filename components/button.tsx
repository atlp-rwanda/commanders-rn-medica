import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
  backgroundColor?: string;
}

const Button: React.FC<Props> = ({ title, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={{
        ...btnStyle,
        borderRadius: 30,
        backgroundColor: backgroundColor || btnStyle.backgroundColor,
      }}
    >
      <Text style={{ ...textStyle, color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
