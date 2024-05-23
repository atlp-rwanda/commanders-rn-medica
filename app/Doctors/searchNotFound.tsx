
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { SearchInput } from "../../components/searchinput2";
import { NavigationHeader } from "@/components/NavigationHeader";

export default function searchNotFound() {
    const [selectedCategory, setSelectedCategory] = useState("all");
   
    return (
        <View className="flex-1 bg-white px-4 py-5">
            <View className="pt-10">
                <View className="flex-row justify-around" >
                    <NavigationHeader title="" />
                    <SearchInput />
                </View>
                <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
            </View>
            <View className="flex-row justify-between mx-[15px]">
     
                <Text className="text-[#212121] text-[20px] font-UrbanistRegular">0 found</Text>
                <View className="flex-row">
                    <Text className="text-[#246BFD] text-[16px] font-UrbanistRegular" onPress={() => {
                        router.push("Doctors/doctorsFound")
                    }}>Default  </Text>
                    <Image source={require("../../assets/doctors/arrows.png")} />
                </View>
            </View>

            <View className="flex-1 justify-center items-center content-center">
                <Image source={require("../../assets/doctors/notfound.png")} />
                <Text className="text-[24px] font-UrbanistBold text-center py-[15px]">Not Found</Text>
    
                <Text className="text-[#212121] font-UrbanistRegular text-center text-[18px] mx-[15px]">Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
   
            </View>
        </View>
    )
}
