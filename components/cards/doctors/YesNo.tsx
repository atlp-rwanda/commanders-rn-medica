import React, { useState } from "react";
import { View, Image, Text, Pressable } from "react-native";

const YesNo = () => {
  const [yesSelected, setYesSelected] = useState<boolean>(false);
  const [noSelected, setNoSelected] = useState<boolean>(false);

  const handleYesPress = () => {
    setYesSelected(!yesSelected);
    if (noSelected) setNoSelected(false); 
  };

  const handleNoPress = () => {
    setNoSelected(!noSelected);
    if (yesSelected) setYesSelected(false); 
  };

  return (
    <View className="flex-row items-center w-full gap-x-6 mt-5">
      <View className="flex-row items-center">
        <Pressable onPress={handleYesPress}>
          <Image
            source={
              yesSelected
                ? require("@/assets/doctors/Ellipse-ok.png")
                : require("@/assets/doctors/Ellipse.png")
            }
            className="mr-3"
          />
        </Pressable>
        <Text>Yes</Text>
      </View>
      <View className="flex-row items-center">
        <Pressable onPress={handleNoPress}>
          <Image
            source={
              noSelected
                ? require("@/assets/doctors/Ellipse-ok.png")
                : require("@/assets/doctors/Ellipse.png")
            }
            className="mr-3"
          />
        </Pressable>
        <Text>No</Text>
      </View>
    </View>
  );
};

export default YesNo;
