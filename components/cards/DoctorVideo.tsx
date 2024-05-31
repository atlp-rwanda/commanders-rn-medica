import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type DocCardProps = {
  doctorImage: any;
  callType: string;
  doctorName: string;
  callDay: string;
  callTime: string;
  onPress?: () => void;
  isVideoCallScreen: boolean;
};

export default function DoctorCard(props: DocCardProps) {
  return (
    <ScrollView className="mb-6">
      <View className="bg-white rounded-3xl p-4">
        <View className="flex-row ">
          <Image source={props.doctorImage} className="w-28 h-28" />
          <View className="flex-1 pl-4 justify-around">
            <Text className="font-[18px] font-[UrbanistBold]">
              {props.doctorName}
            </Text>
            <Text className="font-[UrbanistMedium] text-xs">
              {props.callType}
            </Text>
            <Text className="font-[UrbanistMedium] text-xs">
              {props.callDay} {" | "} {props.callTime}
            </Text>
          </View>
          <Pressable
            className="justify-center items-center"
            onPress={props.onPress}
          >
            <Image
              source={
                props.isVideoCallScreen
                  ? require("../../assets/doctors/video.png")
                  : require("../../assets/doctors/next.png")
              }
              style={{ width: 56, height: 56 }}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
