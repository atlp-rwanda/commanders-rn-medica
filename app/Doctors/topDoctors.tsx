
import DoctorCard from "../../components/cards/doctCard";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import ReviewButtons from "../../components/cards/ReviewButtons";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { Doctor } from "@/redux/reducers/doctors";
import { supabase } from "../supabase";

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
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



  
  
