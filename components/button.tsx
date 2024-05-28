import React, { ReactNode } from "react";
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
  startIcon?: ReactNode;
}
const Button: React.FC<Props> = ({
  title,
  onPress,
  secondary = false,
  rounded = false,
  disabled = false,
  classes,
  width,
  startIcon,
}) => {
  return (
    <Touchable
      style={{
        width,
        shadowColor: "rgba(36, 107, 253, 0.25)",
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
      }}
      className={`${
        disabled
          ? "bg-darkblue"
          : secondary
          ? "bg-primary-100"
          : "bg-primary-500"
      } p-4 my-5 ${
        rounded ? "rounded-full" : "rounded-2xl"
      } ${classes} shadow-[#246BFD40] flex-row justify-center items-center`}
      onPress={onPress}
      disabled={disabled}
    >
      {startIcon && startIcon}
      <Text
        className={`${
          secondary ? "text-primary-500" : "text-white"
        } text-center font-UrbanistBold text-base`}
      >
        {title}
      </Text>
    </Touchable>
  );
};

export default Button;
