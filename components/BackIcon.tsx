import React from "react";
import { View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface BackIconProps {
  imageSource: any;
}

const BackIcon = ({ imageSource }: BackIconProps) => {
  return (
    <View style={{ width: "80%", rowGap: 24 }}>
      <View style={{ alignItems: "flex-start" }}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </View>
      <View style={{ alignItems: "center", width: "100%" }}>
        <Image source={imageSource} />
      </View>
    </View>
  );
};

export default BackIcon;
