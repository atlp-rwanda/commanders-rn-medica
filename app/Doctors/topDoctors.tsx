import DoctorCard from "../../components/cards/doctCard";
import { router, useGlobalSearchParams, useNavigation } from "expo-router";
import { Icon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { Doctor } from "@/redux/reducers/doctors";
import { supabase } from "../supabase";
import SearchDoctor from "./searchDoctor";

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
export default function DoctorDetails() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let { data: doctorsData, error } = await supabase
        .from("doctor")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // console.log("Doctors:----->", doctorsData);

        setDoctors(doctorsData || []);
        setFilteredDoctors(doctorsData || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  let { category = "all" } = useGlobalSearchParams<{ category: string }>();
  if (category == "More") {
    category = "all";
  }
  useEffect(() => {
    fetchDoctors();
    setSelectedCategory(category as string);
  }, []);

  const filteredDocCards =
    selectedCategory === "all"
      ? doctors
      : doctors.filter(
          (doc) => doc.role.toLowerCase() === selectedCategory.toLowerCase()
        );

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <StatusBar style="dark" />
          <View className="flex-row justify-between items-center my-[30px] ">
            <Icon name="back" onPress={router.back} />
            <Text className="flex-1 font-UrbanistBold text-2xl ml-2">
              {" "}
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
            </Text>

            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  router.push("/Doctors/doctorsFound");
                }}
              >
                <Image
                  source={require("../../assets/doctors/searchIcon.png")}
                  className="w-[28px] h-[28px] mr-[15px]"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/Doctors/doctorsFound");
                }}
              >
                <Image
                  source={require("../../assets/doctors/menu.png")}
                  className="w-[28px] h-[28px]"
                />
              </TouchableOpacity>
            </View>
          </View>
          <DocButton
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {loading ? (
            <View className="flex-1 justify-center">
              <SearchDoctor />
            </View>
          ) : filteredDocCards.length === 0 ? (
            <View className="px-6 mb-0 w-full">
              <Image source={require("../../assets/doctors/notfound.png")} />
              <Text className="text-[24px] font-UrbanistBold text-center py-[15px]">
                Not Found
              </Text>

              <Text className="text-[#212121] font-UrbanistRegular text-center text-[18px] mx-[15px]">
                Sorry, we couldn't find any results based on your filter
                criteria. Please adjust your filters.
              </Text>
            </View>
          ) : (
            filteredDocCards.map((item, index) => (
              //@ts-ignore
              <DoctorCard
                key={index}
                {...item}
                onPress={() => {
                  router.push({
                    pathname: "/doctor-appointments/",
                    params: {
                      doctorId: item.id,
                    },
                  });
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
