import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";
import { AntDesign } from "@expo/vector-icons"; 

interface Props {
  title: string;
  logo: any;
  color?: string;
}

const SignInButton: React.FC<Props> = ({ title, logo, color }) => {
  return (
    <TouchableOpacity
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
        {logo && <Image source={logo} />}
        <Text style={[textStyle, { marginLeft: logo ? 5 : 0, fontFamily: "UrbanistSemiBold", fontSize: 16 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignInButton;
