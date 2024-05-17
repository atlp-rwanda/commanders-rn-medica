import DoctorCard from "../../components/cards/doctCard";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DocButton from "@/components/cards/DocButtons";
import { Icon } from "@/components/Icon";
import React, { useState } from "react";

import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Text, ImageSourcePropType, Modal } from "react-native";
type cardSpot = {
  name: string;
  role: string;
  hospital: string;
  image: ImageSourcePropType;
  stars: string;
  reviews: string;
  images: ImageSourcePropType;
};
import { useFonts } from "expo-font";
export default function DoctorDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<cardSpot | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const toggleModal = (spot: any) => {
    setIsVisible(!isVisible);
    setSelectedSpot(spot);
  };
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
      name: "Dr. Travis Westaby",
      role: "Dentist",
      hospital: "Alka Hospital",
      image: require("../../assets/doctors/heart.png"),
      stars: "4.3",
      reviews: "5,376",
      images: require("../../assets/doctors/doc1.png"),
    },
    {
      name: "Dr. Nathaniel Valle",
      role: "Nutritionist",
      hospital: "B&B Hospital",
      image: require("../../assets/doctors/heart.png"),
      stars: "4.6",
      reviews: "3,837",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Beckett Calge",
      role: "Dentist",
      hospital: "Venus Hospital",
      image: require("../../assets/doctors/heart.png"),
      stars: "4.4",
      reviews: "4,942",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Jada Srnsky",
      role: "General",
      hospital: "Bir Hospital",
      image: require("../../assets/doctors/heart.png"),
      stars: "4.6",
      reviews: "5,366",
      images: require("../../assets/doctors/doc4.png"),
    },
    {
      name: "Dr. Bernard Bliss",
      role: "Cardiologist",
      hospital: "The valley Hospital",
      image: require("../../assets/doctors/heart.png"),
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
        <View className="bg-white px-4 py-5">
          <StatusBar style="dark" />
          <View style={styles.search}>
            <Icon name="back" onPress={router.back} />
            <Text className="flex-1 font-UrbanistBold text-2xl ml-2"> My Favorite Doctor</Text>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  router.push("/Doctors/searchDoctor");
                }}
              >
                <Image
                  source={require("../../assets/doctors/searchIcon.png")}
                  style={styles.image1}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/doctors/menu.png")}
                  style={styles.images}
                />
              </TouchableOpacity>
            </View>
          </View>
          <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

          {filteredDocCards.map((spot, index) => (
            <DoctorCard key={index} {...spot} onPress={() => toggleModal(spot)} />
          ))}


          <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: 'white', borderTopRightRadius: 48, borderTopLeftRadius: 48 }}>
                <Text style={styles.title}>Remove from favorite?</Text>
                <Text style={styles.line}></Text>
                {selectedSpot && (
                  <>
                    <View className="bg-white rounded-3xl p-4 m-4" style={styles.card1}>
                      <View className="flex-row justify-between w-full">
                        <Image source={selectedSpot.images} />
                        <View style={styles.details}>
                          <Text style={styles.title1}>{selectedSpot.name}</Text>
                          <Text style={styles.line}></Text>
                          <View style={styles.docinfo}>
                            <Text style={styles.title2}>{selectedSpot.role}</Text>
                            <Text style={styles.separator}></Text>
                            <Text style={styles.title2}>{selectedSpot.hospital}</Text>
                          </View>
                          <View style={styles.views}>
                            <Image source={require("../../assets/doctors/star.png")} />
                            <Text style={styles.title3}>{selectedSpot.stars}</Text>
                            <Text style={styles.title3}>({selectedSpot.reviews} reviews)</Text>
                          </View>
                        </View>
                        <Image source={selectedSpot.image} style={styles.icons} />
                      </View>
                    </View>
                    <View style={styles.btns}>
                      <TouchableOpacity style={styles.regularBtn} onPress={() => {
                        setIsVisible(false)
                      }}>
                        <Text style={styles.btnText} >Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.activeBtn} onPress={() => {
                        setIsVisible(false)
                      }}>
                        <Text style={styles.activeText} >Yes, Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  card1: { elevation: 5 },
  container: {
    shadowColor: "rgba(4, 6, 15, 0.5)",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
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
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 24,
    fontFamily: "UrbanistBold"
  },

  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },

  results: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  activeBtn: {
    backgroundColor: "#246BFD",
    width: 184,
    height: 58,
    padding: 12,
    borderRadius: 100,

  },
  activeText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "UrbanistBold",
    fontSize: 18
  },
  regularBtn: {
    backgroundColor: "#E9F0FF",

    width: 184,
    height: 58,
    padding: 12,
    borderRadius: 100,
    marginHorizontal: 6,
  },
  line: {
    marginVertical: 10,
    borderWidth: 0.3,
    paddingHorizontal: 50,
    height: 0,
    backgroundColor: "#EEEEEE",
    opacity: 0.1,
  },
  btnText: {
    color: "#246BFD",
    textAlign: "center",
    fontFamily: "UrbanistBold",
    fontSize: 18
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  subtitles: {
    color: "#212121",
    fontSize: 18,
    marginVertical: 15,
    fontFamily: "UrbanistRegular"
  },


  separator: {
    width: 1,
    height: 14,

    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#424242",
  },


  icons: {
    width: 15.83,
    height: 15,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  details: {
    marginTop: 0,
    marginLeft: 5,
  },
  views: {
    flexDirection: "row",
  },
  docinfo: {
    flexDirection: "row",
    marginTop: 10,
  },
  title1: {
    color: "#212121",
    fontSize: 18,
    fontFamily: "UrbanistBold"
  },
  title2: {
    color: "#424242",
    fontSize: 12,
    marginBottom: 15,
    fontFamily: "UrbanistRegular"
  },
  roles: {
    color: "#424242",
    fontSize: 12,
    fontFamily: "UrbanistRegular"
  },
  title3: {
    top: -2,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: "UrbanistRegular"
  },
})




