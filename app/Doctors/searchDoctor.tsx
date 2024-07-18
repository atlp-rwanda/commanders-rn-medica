
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationHeader } from "@/components/NavigationHeader";
import DocButton from "../../components/cards/DocButtons";
import React, { useState, useEffect } from "react";
import { View, Image,  Animated,
  Easing
} from "react-native";
import { SearchInput } from "../../components/searchinput2";

export default function searchDoctor() {

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); 
  const rotateValue = new Animated.Value(0);
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
      }, 2000);
    });
  };
  useEffect(() => {

    spin();

  }
  )
  
  return (
    <View className="flex-1 bg-white px-4 py-5">
      <View className="flex-1 justify-center items-center">
        <View>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Image source={require("../../assets/doctors/loading.png")} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
