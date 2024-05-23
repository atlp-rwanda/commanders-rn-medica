import { View, Text } from "react-native";
import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import Touchable from "../common/touchable";
import { router } from "expo-router";
import ToggleSwitch from "toggle-switch-react-native";
import * as icons from "@/assets/icons/settings";

interface Props {
  text: string;
  text2?: string;
  rightIcon?: React.ReactNode;
  leftIcon: React.ReactNode;
  logout?: boolean;
  mode?: boolean;
  nextTo?: string;
  logoutAction?: any;
}

const SettingCard: React.FC<Props> = ({
  text,
  text2,
  rightIcon,
  leftIcon,
  logout = false,
  mode = false,
  nextTo,
  logoutAction,
}) => {
  const [phoneMode, setPhoneMode] = useState<"light" | "dark">("light");
  return (
    <Touchable
      className="flex-row items-center mb-5 justify-between"
      disabled={mode}
      onPress={logout ? logoutAction : () => router.push(`settings/${nextTo}`)}
    >
      <View className="flex-row items-center">
        {leftIcon}
        <Text
          className={`text-lg font-UrbanistSemiBold ${
            logout ? "text-error" : "text-greyscale-800"
          } text-center`}
        >
          {text}
        </Text>
      </View>
      {rightIcon || mode ? (
        mode ? (
          <ToggleSwitch
            onColor="#246BFD"
            offColor="#EEEEEE"
            isOn={phoneMode === "dark"}
            onToggle={(isOn) => setPhoneMode(isOn ? "dark" : "light")}
          />
        ) : (
          rightIcon
        )
      ) : (
        <View className="flex-row items-center">
          {text2 && (
            <Text
              className={
                "text-lg font-UrbanistSemiBold text-greyscale-800 mr-4 text-center"
              }
            >
              {text2}
            </Text>
          )}
          {!logout && (
            <Touchable disabled>
              <SvgXml xml={icons["arrowRight"]} />
            </Touchable>
          )}
        </View>
      )}
    </Touchable>
  );
};

export default SettingCard;
