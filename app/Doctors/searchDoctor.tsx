
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationHeader } from "@/components/NavigationHeader";
import DocButton from "../../components/cards/DocButtons";
import React, { useState, useEffect } from "react";
import { View, Image,  Animated,
  Easing
} from "react-native";
import { SearchInput } from "../../components/searchinput2";
import { UIActivityIndicator } from "react-native-indicators";

export default function searchDoctor() {

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); 
  const [loading, setLoading]=useState(true);

  
  
  return (
    <View className="flex-1 bg-white px-4 py-5">
      <View className="flex-1 justify-center items-center">
        <View>
      <UIActivityIndicator color={"#246BFD"} size={32} />
        </View>
      </View>
    </View>
  );
}
