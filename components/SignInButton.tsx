import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
  logo: any;
  color?: string;
  onPress?: () => void;
}

const SignInButton: React.FC<Props> = ({ title, logo, color, onPress }) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        btnStyle,
        {
          borderColor: "#EEEEEE",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderRadius: 16,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {logo && <Image source={logo} className="w-6 h-6" />}
        <Text style={[textStyle, { marginLeft: logo ? 5 : 0, fontFamily: "UrbanistSemiBold", fontSize: 16 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignInButton;
