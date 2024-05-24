
import DoctorCard from "../../components/cards/doctCard";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import ReviewButtons from "../../components/cards/ReviewButtons";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { useFonts } from "expo-font";

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
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
      reviews: "4,942 ",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Raul Zirkind",
      role: "Nutritionist",
      hospital: "Franklin Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "6,362 ",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Elijah Baranick",
      role: "Allergists",
      hospital: "JFK Medical Center",
      image: require("../../assets/doctors/like.png"),
      stars: "4.6",
      reviews: "5,366 ",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Stephen Shute",
      role: "Pediatric",
      hospital: "The valley Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "3,279 ",
      images: require("../../assets/doctors/doc5.png"),
    },
    {
      name: "Dr. Elijah Baranick",
      role: "Allergists",
      hospital: "JFK Medical Center",
      image: require("../../assets/doctors/like.png"),
      stars: "4.6",
      reviews: "5,366 ",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Stephen Shute",
      role: "Pediatric",
      hospital: "The valley Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "3,279 ",
      images: require("../../assets/doctors/doc5.png"),
    },

  ];
  const filteredDocCards = selectedCategory === "all"
    ? docCards
    : docCards.filter(doc => doc.role.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <View className="flex-1 bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <StatusBar style="dark" />
          <View className="flex-row justify-between items-center my-[30px] ">
 
            <Icon name="back" onPress={router.back} />
            <Text className="flex-1 font-UrbanistBold text-2xl ml-2"> Top Doctor</Text>

            <View className="flex-row">
              <TouchableOpacity onPress={() => {
                router.push("/Doctors/searchDoctor");
              }}>
                <Image source={require("../../assets/doctors/searchIcon.png")}  className="w-[28px] h-[28px] mr-[15px]"
                /></TouchableOpacity>
              <TouchableOpacity onPress={() => {
                router.push("/Doctors/doctorsFound");
              }}><Image source={require("../../assets/doctors/menu.png")} className="w-[28px] h-[28px]" /></TouchableOpacity>
            </View>
          </View>
          <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

          {filteredDocCards.map((spot, index) => (
            <DoctorCard key={index} {...spot} />
          ))}


        </View>
      </ScrollView>
    </View>
  )
}



  
  
