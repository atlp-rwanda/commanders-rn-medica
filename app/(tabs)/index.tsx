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

const filters = ["All", "General", "Dentist", "Nutritionist", "Pediatric"];
const Home = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedType, selectType] = useState(0);
  return (
    <ScrollView
      style={{ flex: 1, marginTop: insets.top }}
      keyboardShouldPersistTaps="always"
    >
      <View style={{ padding: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // paddingTop: 6,
          }}
        >
          <View style={{ height: 48, width: 48 }}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../../assets/images/profilePicture.png")}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#246BFD",
                width: 15,
                height: 15,
                borderColor: "#FFFFFF",
                borderWidth: 3,
                position: "absolute",
                bottom: 0,
                right: 0,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ width: "65%" }}>
            <Text style={{ color: "#757575", fontSize: 16 }}>
              Good Morning 👋🏽
            </Text>
            <Text style={{ color: "#212121", fontSize: 20 }}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Doctor Speciality
              </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={{ color: "#246BFD", fontSize: 16 }}>See All</Text>
              </TouchableOpacity>
            </View>
          }
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
          }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                width: 80,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 12,
                marginBottom: 12,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: "rgba(36, 107, 253, 0.08)",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  marginBottom: 6,
                }}
              >
                <SvgXml xml={MenuIcons[item.name.toLowerCase()]} />
              </TouchableOpacity>
              <Text>
                {item.name.length > 7
                  ? item.name.substring(0, 6) + "..."
                  : item.name}
              </Text>
            </View>
          )}
          numColumns={4}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Top Doctors</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ color: "#246BFD", fontSize: 16 }}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width }}
        contentContainerStyle={{ alignItems: "center", marginBottom: 12 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: "#246BFD",
              marginStart: index === 0 ? 24 : 0,
              backgroundColor:
                selectedType === index ? "#246BFD" : "transparent",
              borderRadius: 20,
              marginEnd: index === filters.length - 1 ? 24 : 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectType(index)}
          >
            <Text
              style={{ color: selectedType === index ? "#FFFFFF" : "#246BFD" }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ paddingHorizontal: 24, marginBottom: 0, width }}>
        {[
          {
            name: "Eloi Chrysanthe",
            role: "Opthamologist",
            stars: "4.3",
            hospital: "N/A",
            reviews: "200",
            image: 0,
            images: 0,
          },
          {
            name: "Eloi Chrysanthe",
            role: "Opthamologist",
            stars: "4.3",
            hospital: "N/A",
            reviews: "200",
            image: 0,
            images: 0,
          },
        ].map((item, index) => (
          <DoctorCard
            key={index}
            name={item.name}
            role={item.role}
            stars={item.stars}
            hospital={item.hospital}
            reviews={item.reviews}
            image={item.image}
            images={require("../../assets/doctors/doctor.png")}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
