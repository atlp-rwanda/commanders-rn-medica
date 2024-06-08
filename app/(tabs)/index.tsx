import { RootState } from "@/redux/store/store";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { MenuIcons } from "../../assets/icons";
import { heart } from "../../assets/icons/heart";
import { notification } from "../../assets/icons/notification";
import DoctorCard from "../../components/cards/doctorCard";
import CarouselComponent from "../../components/carousel";
import { SearchInput } from "../../components/searchInput";
import { supabase } from "../supabase"; 
import { Doctor } from "@/redux/reducers/doctors"

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState(0);

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

  useEffect(() => {
    setFilteredDoctors(
      selectedRole === 0
        ? doctors
        : doctors.filter((doctor) => doctor.role === roleFilters[selectedRole])
    );
  }, [selectedRole, doctors]);

  return (
    <ScrollView
      style={{ marginTop: insets.top }}
      className={`flex-1`}
      keyboardShouldPersistTaps="always"
    >
      <View className="p-6">
        <View className="flex-row items-center justify-between">
          <View className="h-12 w-12">
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../../assets/images/profilePicture.png")}
                className="h-12 w-12"
              />
            </TouchableOpacity>
            <View className="right-0 bottom-0 absolute bg-lightblue w-[15px] h-[15px] border-white border-[3px] rounded-lg" />
          </View>
          <View className="w-3/5">
            <Text className="font-['UrbanistRegular'] text-[16px]">
              Good Morning 👋🏽
            </Text>
            <Text className="text-[20px] font-['UrbanistBold']">
              Andrew Ainsley
            </Text>
          </View>
          <Link href="/notifications/">
            <SvgXml
              xml={notification}
              width={26}
              height={26}
              className="text-gray-900"
            />
          </Link>
          <Link href="/Doctors/favoriteDoctors">
            <SvgXml
              xml={heart}
              width={26}
              height={26}
              className="text-gray-900"
            />
          </Link>
        </View>
        <SearchInput />
        <CarouselComponent />
        <FlatList
          data={[
            { name: "General" },
            { name: "Dentist" },
            { name: "Opthamologist" },
            { name: "Nutritionist" },
            { name: "Neurologist" },
            { name: "Pediatric" },
            { name: "Radiologist" },
            { name: "More" },
          ]}
          scrollEnabled={false}
          ListHeaderComponent={
            <View className="flex-row items-center w-full justify-between mt-6 mb-3">
              <Text className="text-[20px] font-['UrbanistBold']">
                Doctor Speciality
              </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text className="text-[16px] font-['UrbanistBold'] text-lightblue">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          }
          className="w-full"
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
          }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="w-[86px] items-center justify-between me-3 mb-6 h-24"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-[#246BFD14] p-2.5 items-center justify-center rounded-full mb-3 w-[60px] h-[60px]"
              >
                <SvgXml xml={MenuIcons[item.name.toLowerCase()]} />
              </TouchableOpacity>
              <Text
                className="text-[16px] font-['UrbanistBold'] text-[#616161]"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
          )}
          numColumns={4}
        />
      </View>
      <View className="flex-row items-center w-full justify-between px-6 mb-3">
        <Text className="text-[20px] font-['UrbanistBold']">Top Doctors</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text
            className="text-[16px] font-['UrbanistBold'] text-lightblue"
            onPress={() => {
              router.push("/Doctors/topDoctors");
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={roleFilters}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full"
        contentContainerStyle={{ alignItems: "center", marginBottom: 12 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            className={`px-4 py-1 border-lightblue border ${
              index === 0 ? "ml-6" : "ml-0"
            } ${
              selectedRole === index ? "bg-lightblue" : "bg-transparent"
            } rounded-2xl items-center justify-center ${
              index === roleFilters.length - 1 ? "mr-6" : "mr-3"
            }`}
            onPress={() => {
              setSelectedRole(index);
              setFilteredDoctors(
                index === 0
                  ? doctors
                  : doctors.filter(
                      (doctor) => doctor.role === roleFilters[index]
                    )
              );
            }}
          >
            <Text
              className={`${
                selectedRole === index ? "text-[#FFFFFF]" : "text-lightblue"
              } font-[UrbanistSemiBold]`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="px-6 mb-0 w-full">
        {filteredDoctors.map((item, index) => (
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
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;