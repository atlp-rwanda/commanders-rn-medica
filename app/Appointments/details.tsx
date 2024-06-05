import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { back } from "@/assets/icons/userprofile/icons";
import { NavigationHeader } from "@/components/NavigationHeader";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Touchable from "@/components/common/touchable";
import { heartFilledIcon } from "@/assets/icons/heart";
import { videoIcon, videoIconWhite } from "@/assets/icons/video";
import Button from "@/components/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { chatIcon, chatIconWhite } from "@/assets/icons/chat";
import { callIcon, callIconWhite } from "@/assets/icons/call";
import AppointmentPkg from "@/components/cards/packages/appointmentPackage";

const pkgs = {
  Messaging: {
    key: "1",
    title: "Messaging",
    description: "Chat messages with doctor",
    price: "$20",
    period: "30 mins",
    icon: chatIcon,
    button: {
      title: "Message (Start at 16:00 PM)",
      icon: chatIconWhite,
      nextTo: "/messagingAppointment/messaging",
    },
  },
  "Voice call": {
    key: "2",
    title: "Voice Call",
    description: "Voice call with doctor",
    price: "$40",
    period: "30 mins",
    icon: callIcon,
    button: {
      title: "Voice Call (Start at 14:00 PM)",
      icon: callIconWhite,
      nextTo: "/Appointments/voice-call/call",
    },
  },
  "Video call": {
    key: "3",
    title: "Video Call",
    description: "Video call with doctor",
    price: "$60",
    period: "30 mins",
    icon: callIcon,
    button: {
      title: "Video Call (Start at 10:00 AM)",
      icon: videoIconWhite,
      nextTo: "/videoCallAppointment",
    },
  },
};

const VideoCallAppointment = ({ route }: any) => {
  const insets = useSafeAreaInsets();

  const { typecall } = useLocalSearchParams<{
    typecall: "Voice call" | "Messaging" | "Video call";
  }>();

  return (
    <View className={`flex-1 pt-[${insets.top}px] bg-white`}>
      <View className="px-6 mt-8">
        <NavigationHeader
          title={"My Appointment"}
          onBack={router.back}
          children={
            <Touchable>
              <Image
                source={require("../../assets/doctors/menu.png")}
                className="w-7 h-7"
              />
            </Touchable>
          }
        />
      </View>
      <ScrollView className={`flex-1 pt-2`}>
        <Touchable
          onPress={() => {}}
          style={styles.container}
          className="my-2 mx-6"
        >
          <View className="bg-white rounded-3xl p-4 mb-6" style={styles.card1}>
            <View className="flex-row justify-between w-full">
              <Image
                source={require("../../assets/doctors/doctor2.png")}
                className="w-28 h-28"
              />
              <View className="justify-evenly pl-1 w-[60%]">
                <Text className="text-[18px] font-[UrbanistBold] text-greyscale-900">
                  Dr. Maria Foose
                </Text>
                <View className="border-t border-t-[#EEEEEE] w-full" />
                <Text className="font-[UrbanistMedium] text-xs text-greyscale-800">
                  Dermatologists
                </Text>
                <Text className="font-[UrbanistMedium] text-xs text-greyscale-800">
                  The Venus Hospital in Paris, France
                </Text>
              </View>
            </View>
          </View>
        </Touchable>
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Scheduled Appointment
          </Text>
          <Text className="text-[16px] font-UrbanistRegular text-greyscale-800 mb-3">
            Today, December 22, 2022
          </Text>
          <Text className="text-[16px] font-UrbanistRegular text-greyscale-800 mb-3">
            10:00 - 10:30 AM (30 minutes)
          </Text>
        </View>
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Patient Information
          </Text>
          <Detail title={"Full Name"} text={"Andrew Ainsley"} />
          <Detail title={"Gender"} text={"Male"} />
          <Detail title={"Age"} text={"27"} />
          <Detail
            title={"Problem"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. view more"
            }
          />
        </View>
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Your Package
          </Text>
          {typecall && pkgs[typecall] && <AppointmentPkg {...pkgs[typecall]} />}
        </View>
        <Button
          title={typecall ? pkgs[typecall].button.title : ""}
          rounded
          startIcon={
            <SvgXml
              xml={typecall ? pkgs[typecall].button.icon : chatIconWhite}
              className="mr-2.5"
            />
          }
          onPress={() =>
            router.push(typecall ? pkgs[typecall].button.nextTo : "")
          }
          classes="mx-6"
        />
      </ScrollView>
    </View>
  );
};

const Detail: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <View className="flex-row gap-2 items-start mb-2">
    <View className="flex-row w-[90px] justify-between items-center">
      <Text className="text-[16px] font-UrbanistRegular text-greyscale-900">
        {title}
      </Text>
      <Text className="text-[16px] font-UrbanistRegular text-greyscale-900">
        :
      </Text>
    </View>
    {title === "Problem" ? (
      <Text className="text-[16px] font-UrbanistRegular text-greyscale-900 max-w-[281px] min-h-min align-text-top leading-5">
        I have been feeling pain in my chest for the past 2 days.{" "}
        <Text className="text-primary-500 font-UrbanistRegular">View more</Text>
      </Text>
    ) : (
      <Text className="text-[16px] font-UrbanistRegular text-greyscale-900 max-w-[281px] min-h-min align-text-top">
        {text}
      </Text>
    )}
  </View>
);

export default VideoCallAppointment;

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
