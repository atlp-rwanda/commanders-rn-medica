
import DoctorCard from "../../components/cards/doctCard";
import { NavigationHeader } from "@/components/NavigationHeader";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { SearchInput } from "../../components/searchinput2";
export default function DoctorDetails() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const docCards = [
    {
      name: "Dr. Randy Wigham",
      role: "Dentist",
      hospital: "The valley Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "4,279",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Jenny Watson",
      role: "General",
      hospital: "Christ Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.4",
      reviews: "4,942",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Raul Zirkind",
      role: "Nutritionist",
      hospital: "Franklin Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "6,362",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Elijah Baranick",
      role: "pediatric",
      hospital: "JFK Medical Center",
      image: require("../../assets/doctors/like.png"),
      stars: "4.6",
      reviews: "5,366",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Stephen Shute",
      role: "Cardiologist",
      hospital: "The valley Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "3,279",
      images: require("../../assets/doctors/doc5.png"),
    },

  ];
  const filteredDocCards = selectedCategory === "all"
    ? docCards
    : docCards.filter(doc => doc.role.toLowerCase() === selectedCategory.toLowerCase());


  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <View className="pt-10">

            <View className="flex-row justify-around">
              <NavigationHeader title="" />
              <SearchInput />
            </View>

            <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
          </View>
          <View className="px-[10px] my-[15px] flex-row justify-between">
            <Text className="text-[#212121] text-[20px] font-UrbanistRegular">489 founds</Text>
            <View className="flex-row">
              <Text className="text-[#246BFD] text-[16px] font-UrbanistRegular">Default </Text>
              <Image source={require("../../assets/doctors/arrows.png")} />
            </View>
          </View>
          {filteredDocCards.map((spot, index) => (
            <DoctorCard key={index} {...spot} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
