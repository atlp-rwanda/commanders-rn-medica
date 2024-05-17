
import DoctorCard from "../../components/cards/doctCard";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import ReviewButtons from "../../components/cards/ReviewButtons";
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { useFonts } from "expo-font";

const roleFilters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
export default function DoctorDetails() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  let [fontsLoaded] = useFonts({
    UrbanistBold: require("../../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistMedium: require("../../assets/fonts/Urbanist-Regular.ttf"),
    UrbanistSemiBold: require("../../assets/fonts/Urbanist-SemiBold.ttf"),
    UrbanistRegular: require("../../assets/fonts/Urbanist-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
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
      images: require("../../assets/doctors/doc1.png"),
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
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <StatusBar style="dark" />
          <View style={styles.search}>
            <Icon name="back" onPress={router.back} />
            <Text className="flex-1 font-UrbanistBold text-2xl ml-2"> Top Doctor</Text>

            <View className="flex-row">
              <TouchableOpacity onPress={() => {
                router.push("/Doctors/searchDoctor");
              }}>
                <Image source={require("../../assets/doctors/searchIcon.png")} style={styles.image1}
                /></TouchableOpacity>
              <TouchableOpacity onPress={() => {
                router.push("/Doctors/doctorsFound");
              }}><Image source={require("../../assets/doctors/menu.png")} style={styles.images} /></TouchableOpacity>
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
const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  images: {
    width: 28,
    height: 28,

  },
  image1: {
    width: 28,
    height: 28,
    marginRight: 15,
  },
  activeBtn: {
    backgroundColor: "#246BFD",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  activeText: {
    color: "#FFFFFF",
    fontFamily: "UrbanistRegular"
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginLeft: 15,
    fontFamily: "UrbanistBold"
  },
  regularBtn: {
    borderWidth: 1,
    borderColor: "#246BFD",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  btnText: {
    color: "#246BFD",
  },

  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  title2: {
    fontSize: 24,
    color: "#212121",
    textAlign: "center",
    fontFamily: "UrbanistRegular"
  },
  titleResult: {
    fontSize: 24,
    paddingVertical: 15,
  },
  activeBn: {
    backgroundColor: "#246BFD",
    paddingVertical: 18,
    width: 184,
    height: 58,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  activeTxt: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "UrbanistRegular"
  },
  regularBn: {
    backgroundColor: "#E9F0FF",
    width: 184,
    height: 58,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  line: {
    marginVertical: 15,
    borderWidth: 0.3,
    paddingHorizontal: 50,
    height: 0,
    backgroundColor: "#EEEEEE",
    opacity: 0.1,
  },
  buttonText: {
    color: "#246BFD",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  subtitles: {
    color: "#212121",
    fontSize: 18,
    marginVertical: 15,
    marginLeft: 20,
    fontFamily: "UrbanistRegular"

  }
});
