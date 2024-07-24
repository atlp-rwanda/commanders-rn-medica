import DoctorCard from "../../components/cards/doctCard";
import { NavigationHeader } from "@/components/NavigationHeader";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SearchInput } from "../../components/searchinput2";
import { supabase } from "../supabase";
import { Doctor } from "@/redux/reducers/doctors";
import SearchNotFound from "./searchNotFound"; 

export default function DoctorDetails() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); 

  const fetchDoctors = async () => {
    setLoading(true); 
    try {
      let { data: doctorsData, error } = await supabase
        .from("doctor")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setDoctors(doctorsData || []);
        setFilteredDoctors(doctorsData || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);
  
  const applyFilters = () => {
    let filtered = doctors;
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.role.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedRating > 0) {
      filtered = filtered.filter((doctor) => doctor.stars >= selectedRating);
    }
    if (searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredDoctors(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedRating, searchQuery, doctors]);


  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <View className="pt-10">
            <View className="flex-row justify-around">
              <NavigationHeader title="" />
              <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </View>

            <DocButton
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </View>
          <View className="px-[10px] my-[15px] flex-row justify-between">
            <Text className="text-[#212121] text-[20px] font-UrbanistRegular">
              {filteredDoctors.length} founds
            </Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }
              }>
                <Text className="text-[#246BFD] text-[16px] font-UrbanistRegular">
                  Default{" "}
                </Text>
              </TouchableOpacity>
              <Image source={require("../../assets/doctors/arrows.png")} />
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#246BFD" />
          ) : filteredDoctors.length === 0 ? (
            <SearchNotFound />
          ) : (
            filteredDoctors.map((spot, index) => (
              //@ts-ignore
              <DoctorCard key={index} {...spot} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
