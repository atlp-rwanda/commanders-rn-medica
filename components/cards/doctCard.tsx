import { Text } from "react-native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
type docCardProps = {
  name: string;
  role: string;
  stars: string;
  hospital: string;
  reviews: string;
  image: string;
  images: ImageSourcePropType;
  onPress?: () => void;
};

export default function DoctorCard(props: docCardProps) {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View className="bg-white rounded-3xl p-4 mb-6" style={styles.card1}>
        <View className="flex-row justify-between w-full">
          <Image source={{uri:props.image}} className="w-28 h-28" />
          <View className="justify-evenly pl-1 w-[60%]">
            <View className="justify-between w-full items-center flex-row">
              <Text className="font-[18px] font-[UrbanistBold]">
                {props.name}
              </Text>
              <Image source={props.images} className="w-4 h-4" />
            </View>
            <Text style={styles.line}></Text>
            <View className="flex-row items-center">
              <Text className="font-[UrbanistMedium] text-xs">
                {props.role}
              </Text>
              <Text className="w-[1px] h-4 mx-2.5 bg-[#424242]"></Text>
              <Text className="font-[UrbanistMedium] text-xs">
                {props.hospital}
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image source={require("../../assets/doctors/star.png")} />
              <Text className="font-[UrbanistMedium] text-xs">
                {props.stars}
              </Text>
              <Text className="font-[UrbanistMedium] text-xs">
                ({props.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card1: { elevation: 5 },
  container: {
    shadowColor: "rgba(4, 6, 15, 0.5)",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  icons: {
    width: 15.83,
    height: 15,
  },
  line: {
    marginVertical: 2,
    borderWidth: 0.3,
    paddingHorizontal: 50,
    height: 0,
    backgroundColor: "#EEEEEE",
    opacity: 0.1,
  },
  title3: {
    marginLeft: 10,
    fontSize: 12,
  },
});
