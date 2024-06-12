
import DoctorCard from "../../components/cards/doctCard";
import { NavigationHeader } from "@/components/NavigationHeader";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { SearchInput } from "../../components/searchinput2";
import { supabase } from "../supabase";
import { Doctor } from "@/redux/reducers/doctors";
export default function DoctorDetails() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);


  const fetchDoctors = async () => {
    

    try {
      let { data: doctorsData, error } = await supabase
        .from("doctor")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Doctors:----->", doctorsData);
      
        setDoctors(doctorsData || []);
        setFilteredDoctors(doctorsData || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);


  const filteredDocCards = selectedCategory === "all"
    ? doctors
    : doctors.filter(doc => doc.role.toLowerCase() === selectedCategory.toLowerCase());


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
