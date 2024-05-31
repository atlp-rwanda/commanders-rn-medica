import React from "react";
import { View, ScrollView } from "react-native";
import DoctorVideo from "@/components/cards/DoctorVideo";
import { useRouter } from "expo-router";
import { DoctorCard } from "./types"; // Import the types

const VideoCall = () => {
  const router = useRouter();

  const docCards: DoctorCard[] = [
    {
      name: "Dr. Randy Wigham",
      callDay: "Wednesday",
      callTime: "1:00 PM",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Jenny Watson",
      callDay: "Wednesday",
      callTime: "1:00 PM",
      images: require("../../assets/doctors/doc3.png"),
    },
    {
      name: "Dr. Raul Zirkind",
      callDay: "Wednesday",
      callTime: "1:00 PM",
      images: require("../../assets/doctors/doc1.png"),
    },
    {
      name: "Dr. Elijah Baranick",
      callDay: "Wednesday",
      callTime: "1:00 PM",
      images: require("../../assets/doctors/doc2.png"),
    },
    {
      name: "Dr. Stephen Shute",
      callDay: "Wednesday",
      callTime: "1:00 PM",
      images: require("../../assets/doctors/doc5.png"),
    },
  ];

  const handlePress = (doctor: DoctorCard) => {
    router.push({
      pathname: "/chat-history/VideoRecord",
      params: { doctor: JSON.stringify(doctor) },
    });
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "#FAFAFA", paddingBottom: 6 }}>
        {docCards.map((doctor, index) => (
          <DoctorVideo
            key={index}
            onPress={() => handlePress(doctor)}
            doctorName={doctor.name}
            doctorImage={doctor.images}
            callType="Video Call"
            callDay={doctor.callDay}
            callTime={doctor.callTime}
            isVideoCallScreen={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoCall;