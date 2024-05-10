import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { btnStyle, textStyle } from "../styles/common";

interface Props {
  title: string;
  logo: any;
}

const SiginButton: React.FC<Props> = ({ title, logo }) => {
  return (
    <TouchableOpacity
      style={[
        btnStyle,
        {
          borderColor: "rgba(0, 0, 0, 0.2)",
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
        <Image source={logo} />
        <Text style={[textStyle, { marginLeft: logo ? 5 : 0 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SiginButton;
