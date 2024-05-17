
import DoctorCard from "../../components/cards/doctCard";
import { NavigationHeader } from "@/components/NavigationHeader";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import ReviewButtons from "../../components/cards/ReviewButtons";
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Modal } from "react-native";
import { useFonts } from "expo-font";
import { SearchInput } from "../../components/searchinput2";

export default function DoctorDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const toggleModal = () => {
    setIsVisible(!isVisible);
  }
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
      reviews: "4,942",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Raul Zirkind",
      role: "Neurologists",
      hospital: "Franklin Hospital",
      image: require("../../assets/doctors/like.png"),
      stars: "4.8",
      reviews: "6,362",
      images: require("../../assets/doctors/doc1.png"),
    },
    {
      name: "Dr. Elijah Baranick",
      role: "Allergists",
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
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white px-4 py-5">
          <View className="pt-10">

            <View className="flex-row">
              <NavigationHeader title="" />
              <SearchInput />
            </View>

            <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
          </View>
          <View style={styles.found}>
            <Text style={styles.btnTxt}>489 founds</Text>
            <View className="flex-row">
              <Text style={styles.default} onPress={toggleModal}>Default  </Text>
              <Image source={require("../../assets/doctors/arrows.png")} />
            </View>
          </View>
          {filteredDocCards.map((spot, index) => (
            <DoctorCard key={index} {...spot} />
          ))}

          <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: 'white', borderTopRightRadius: 48, borderTopLeftRadius: 48 }}>
                <Text style={styles.title2}>Filter</Text>
                <Text style={styles.line}></Text>
                <View>
                  <Text style={styles.subtitles}>Speciality
                  </Text>
                  <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
                  <Text style={styles.subtitles}>Rating
                  </Text>
                  <ReviewButtons />
                  <Text style={styles.line}></Text>
                </View>
                <View style={styles.btns}>
                  <TouchableOpacity style={styles.regularBn} onPress={() => {
                    setIsVisible(false)
                  }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.activeBn} onPress={() => {
                    setIsVisible(false)
                  }}>
                    <Text style={styles.activeTxt}>Apply</Text>
                  </TouchableOpacity>


                </View>
              </View>
            </View>
          </Modal>
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
    margin: 10,

  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "UrbanistBold"
  },
  regularBtn: {
    borderWidth: 1,
    borderColor: "#246BFD",
    width: 184,
    height: 58,
    padding: 12,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  btnText: {
    color: "#246BFD",
  },
  images: {
    width: 28,
    height: 28,
    marginHorizontal: 10,
    marginTop: 15,
  },
  title2: {
    fontSize: 24,
    color: "#212121",
    textAlign: "center",
    fontFamily: "UrbanistBold",
    marginVertical: 10,
  },
  found: {
    paddingHorizontal: 10,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  default: {
    color: "#246BFD",
    fontSize: 16,
    fontFamily: "UrbanistRegular"
  },
  titleResult: {
    fontSize: 24,
    paddingVertical: 15,
  },
  activeBn: {
    backgroundColor: "#246BFD",
    width: 184,
    height: 58,
    padding: 12,
    borderRadius: 100,
  },
  activeTxt: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "UrbanistBold",
    fontSize: 16,
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
    fontFamily: "UrbanistBold",
    fontSize: 16,
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
    fontFamily: "UrbanistBold"
  },
  btnTxt: {
    color: "#212121",
    fontSize: 20,
    fontFamily: "UrbanistRegular"

  }
});
