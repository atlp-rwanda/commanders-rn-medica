import { View, Text, ScrollView, Image, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { NavigationHeader } from "@/components/NavigationHeader";
import { router, useLocalSearchParams } from "expo-router";
import Touchable from "@/components/common/touchable";
import { videoIconWhite } from "@/assets/icons/video";
import Button from "@/components/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { chatIcon, chatIconWhite } from "@/assets/icons/chat";
import { callIcon, callIconWhite } from "@/assets/icons/call";
import AppointmentPkg from "@/components/cards/packages/appointmentPackage";
import { createMeeting, videoSDKToken } from "@/utils/api";
import { PermissionRequest } from "@/utils/permissionsRquest";
import { TextInput } from "@/components/Input";

export enum TypeCall {
  VoiceCall = "Voice Call",
  Messaging = "Messaging",
  VideoCall = "Video Call",
}
const pkgs = {
  [TypeCall.Messaging]: {
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
  [TypeCall.VoiceCall]: {
    key: "2",
    title: TypeCall.VoiceCall,
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
  [TypeCall.VideoCall]: {
    key: "3",
    title: TypeCall.VideoCall,
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
  const [meetId, setMeetId] = useState<string | undefined>(undefined);
  const [joinMeetId, setJointMeetId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.getProfileReducer);

  const { typecall } = useLocalSearchParams<{
    typecall: TypeCall;
  }>();

  const appointment = useSelector(
    (state: RootState) => state.appointment.selectedAppointment
  );

  const getMeetingId = async (id?: string): Promise<void> => {
    setIsLoading(true);
    if (!videoSDKToken) {
      console.log("PLEASE PROVIDE TOKEN IN api.js FROM app.videosdk.live");
      Alert.alert("Please provide valid Token");
      setIsLoading(false);
      return;
    }
    const meetingId = id
      ? id
      : appointment.meetingId
        ? appointment.meetingId
        : await createMeeting({ token: videoSDKToken });
    setMeetId(meetingId);
  };

  useEffect(() => {
    PermissionRequest();
    if (meetId && isLoading) {
      router.push({
        pathname: "/Appointments/voice-call/call",
        params: { meetId },
      });
      setIsLoading(false);
    }
  }, [meetId]);

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
                source={{ uri: appointment.doctor.image }}
                className="w-28 h-28"
              />
              <View className="justify-evenly pl-1 w-[60%]">
                <Text className="text-[18px] font-[UrbanistBold] text-greyscale-900">
                  {appointment.doctor.name}
                </Text>
                <View className="border-t border-t-[#EEEEEE] w-full" />
                <Text className="font-[UrbanistMedium] text-xs text-greyscale-800">
                  {appointment.doctor.role}
                </Text>
                {/* <Text className="font-[UrbanistMedium] text-xs text-greyscale-800">
                  The Venus Hospital in Paris, France
                </Text> */}
              </View>
            </View>
          </View>
        </Touchable>
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Scheduled Appointment
          </Text>
          <Text className="text-[16px] font-UrbanistRegular text-greyscale-800 mb-3">
            {appointment.appointment_date}
          </Text>
          <Text className="text-[16px] font-UrbanistRegular text-greyscale-800 mb-3">
            {appointment.appointment_time}
          </Text>
        </View>
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Patient Information
          </Text>
          <Detail title={"Full Name"} text={appointment.patient.full_name} />
          <Detail title={"Gender"} text={appointment.patient.gender} />
          <Detail title={"Age"} text={appointment.patient.date_of_birth} />
          <Detail title={""} text={appointment.Reason_couse_toUpdated} />
        </View>
        {/* <TextInput
          onChangeText={setJointMeetId}
          className="bg-white border border-primary-100"
        /> */}
        <View className="mb-5 mx-6">
          <Text className="text-[20px] font-UrbanistBold text-greyscale-900 mb-4">
            Your Package
          </Text>
          {typecall && pkgs && pkgs[typecall] && (
            <AppointmentPkg {...pkgs[typecall]} />
          )}
        </View>
        <Button
          title={typecall && pkgs ? pkgs[typecall]?.button.title : ""}
          rounded
          loading={isLoading}
          startIcon={
            <SvgXml
              xml={
                typecall && pkgs ? pkgs[typecall].button.icon : chatIconWhite
              }
              className="mr-2.5"
            />
          }
          onPress={() =>
            typecall === TypeCall.VoiceCall
              ? getMeetingId(joinMeetId)
              : router.push(
                  typecall && pkgs ? pkgs[typecall].button.nextTo : ""
                )
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
