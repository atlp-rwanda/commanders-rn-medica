import { heart, heartFilledIcon } from "@/assets/icons/heart";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
type docCardProps = {
  name: string;
  role: string;
  stars: string;
  hospital: string;
  reviews: string;
  image: string;
  images: ImageSourcePropType;
  liked?: boolean;
  id:string;
  created_at:string;

  onPress?: () => void;
};

export default function DoctorCard(props: docCardProps) {

  if(!props.name){
    console.log("here is your image --->",props.image)
  }
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View className="bg-white rounded-3xl p-4 mb-6" style={styles.card1}>
        <View className="flex-row justify-between w-full">
          <Image source={{uri:props.image}} className="w-28 h-28" />
          <View className="justify-evenly pl-1 w-[60%]">
            <View className="justify-between w-full items-center flex-row">
              <Text className="font-[18px] font-[UrbanistBold]">
                {props?.name}
              </Text>
              <SvgXml
                xml={props.liked ? heartFilledIcon : heart}
                width={20}
                height={20}
                className={props.liked ? "text-primary-500" : "text-gray-900"}
              />
            </View>
            <View className="border-t border-t-[#EEEEEE] w-full" />
            <View className="flex-row items-center">
              <Text className="font-[UrbanistMedium] text-xs">
                {props.role}
                {"   |   "}
                {props?.hospital}
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
  card1: { elevation: 10, shadowColor: "rgba(4, 6, 15, 0.5)" },
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
  title3: {
    marginLeft: 10,
    fontSize: 12,
  },
});
