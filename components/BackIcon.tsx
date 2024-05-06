import React from "react";
import { View, Image  } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BackIcon = () => {
  return (
    <View style={{ width: "80%", rowGap: 24 }}>
      <View style={{ alignItems: "flex-start" }}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </View>
      <Image
        source={require("../assets/Frame.png")}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default BackIcon;
