import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { notification } from "../../assets/icons/notification";
import { heart } from "../../assets/icons/heart";
import { SearchInput } from "../../components/searchInput";
import CarouselComponent from "../../components/carousel";
import { MenuIcons } from "../../assets/icons";
import DoctorCard from "../../components/cards/doctorCard";

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
const doctors = [
  {
    name: "Eloi Chrysanthe",
    role: "Opthamologist",
    stars: "4.3",
    hospital: "Muhima",
    reviews: "231",
    image: "",
    images: "",
  },
  {
    name: "Uwamahoro",
    role: "Pediatric",
    stars: "4.3",
    hospital: "Masaka",
    reviews: "2,542",
    image: "",
    images: "",
  },
  {
    name: "Hakizimana",
    role: "Nutritionist",
    stars: "4.3",
    hospital: "KHI",
    reviews: "1,242",
    image: "",
    images: "",
  },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  const [selectedRole, selectRole] = useState(0);
  const [filteredDoctors, filterDoctors] = useState(doctors);
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
              />
            </TouchableOpacity>
            <View className="right-0 bottom-0 absolute bg-primary-500 w-[15px] h-[15px] border-white border-[3px] rounded-lg" />
          </View>
          <View className="w-3/5">
            <Text className="font-['Urbanist-Regular'] text-[16px]">
              Good Morning 👋🏽
            </Text>
            <Text className="text-[20px] font-['Urbanist-Bold']">
              Andrew Ainsley
            </Text>
          </View>
          <SvgXml xml={notification} />
          <SvgXml xml={heart} />
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
              <Text className="text-[20px] font-['Urbanist-Bold']">
                Doctor Speciality
              </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text className="text-[16px] font-['Urbanist-Bold'] text-primary-500">
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
              className="w-20 items-center justify-center me-3 mb-3"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-[#246BFD14] p-2.5 items-center justify-center rounded-3xl mb-2"
              >
                <SvgXml xml={MenuIcons[item.name.toLowerCase()]} />
              </TouchableOpacity>
              <Text className="text-[16px] font-['Urbanist-Bold']">
                {item.name.length > 7
                  ? item.name.substring(0, 6) + "..."
                  : item.name}
              </Text>
            </View>
          )}
          numColumns={4}
        />
      </View>
      <View className="flex-row items-center w-full justify-between px-6 mb-3">
        <Text className="text-[20px] font-['Urbanist-Bold']">Top Doctors</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text className="text-[16px] font-['Urbanist-Bold'] text-primary-500">
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
            className={`px-4 py-1 border-primary-500 border ${
              index === 0 ? "ml-6" : "ml-0"
            } ${
              selectedRole === index ? "bg-primary-500" : "bg-transparent"
            } rounded-2xl items-center justify-center ${
              index === roleFilters.length - 1 ? "mr-6" : "mr-3"
            }`}
            onPress={() => {
              selectRole(index);
              filterDoctors(
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
                selectedRole === index ? "text-[#FFFFFF]" : "text-primary-500"
              } font-[Urbanist-SemiBold]`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="px-6 mb-0 w-full">
        {filteredDoctors.map((item, index) => (
          <DoctorCard
            key={index}
            name={item.name}
            role={item.role}
            stars={item.stars}
            hospital={item.hospital}
            reviews={item.reviews}
            image={require("../../assets/doctors/heart.png")}
            images={require("../../assets/doctors/doctor.png")}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
