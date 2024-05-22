import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { btnStyle, textStyle as commonTextStyle } from "../styles/common";
import { SvgXml } from "react-native-svg";
import { play } from "@/assets/icons/playBtn";

interface Props {
  title: string;
  icon?: any;
  color?: string;
  textColor?: string;
  onPress?: TouchableOpacityProps["onPress"];
}
const Button: React.FC<Props> = ({ title,icon, textColor, color, onPress }) => {
  return (
    <TouchableOpacity className={`bg-${color?color:'lightblue'} p-4 rounded-full flex-row justify-center items-center`} onPress={onPress}>
      {icon?<SvgXml xml={icon}/>:''}
      <Text className={`font-UrbanistMedium text-${textColor?textColor:'white'} px-3 text-[16px]`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
