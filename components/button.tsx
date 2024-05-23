import React from "react";
import { Text, TouchableOpacityProps, ViewStyle } from "react-native";
import Touchable from "./common/touchable";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
  secondary?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  classes?: string;
  width?: ViewStyle["width"];
}
const Button: React.FC<Props> = ({
  title,
  onPress,
  secondary = false,
  rounded = false,
  disabled = false,
  classes,
  width,
}) => {
  return (
    <Touchable
      style={{ width }}
      className={`${
        disabled
          ? "bg-darkblue"
          : secondary
          ? "bg-primary-100"
          : "bg-primary-500"
      } p-4 my-5 ${rounded ? "rounded-full" : "rounded-2xl"} ${classes}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`${
          secondary ? "text-primary-500" : "text-white"
        } text-center font-UrbanistBold`}
      >
        {title}
      </Text>
    </Touchable>
  );
};

export default Button;
