import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import DoctorVideo from "@/components/cards/DoctorVideo";
import { areaView } from "@/styles/common";
import PlayButton from "@/components/cards/PlayButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DoctorCard } from "./types";
import { moreTransparent } from "@/assets/icons/more";
import { back } from "@/assets/icons/userprofile/icons";

const VideoRecord: React.FC = () => {
  const router = useRouter();
  const { doctor: doctorString } = useLocalSearchParams();
  const doctor: DoctorCard = doctorString
    ? JSON.parse(doctorString as string)
    : null;

  const [modalVisible, setModalVisible] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  useEffect(() => {
    const fetchDuration = async () => {
      const duration = await AsyncStorage.getItem("videoDuration");
      if (duration) {
        setVideoDuration(Number(duration));
      }
    };

    fetchDuration();
  }, []);

  if (!doctor) {
    return null;
  }

  const handlePress = () => {
    router.push("/chat-history/PlayRecord");
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleMorePress = () => {
    setModalVisible((prev) => !prev);
  };

  const handleDownload = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    setModalVisible(false);
  };

  const { name, images, callDay, callTime } = doctor;

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")} hours`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")} minutes`;
    }
  };

  return (
    <SafeAreaView style={areaView}>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
        <View style={{ rowGap: 28 }}>
          <View className="flex-row items-center justify-between w-full">
            <SvgXml xml={back} onPress={handleBackPress} />
            <SvgXml xml={moreTransparent} onPress={handleMorePress} />
          </View>
          <View style={{ rowGap: 28, backgroundColor: "#FAFAFA" }}>
            <DoctorVideo
              doctorName={name}
              doctorImage={images}
              callType="Video Call"
              callDay={callDay}
              callTime={callTime}
              isVideoCallScreen={true}
            />
            <View
              style={{
                height: 1,
                backgroundColor: "#EEEEEE",
              }}
            />
            <Text style={{ fontSize: 16, fontFamily: "UrbanistMedium" }}>
              { " "}{formatTime(videoDuration)} of video calls have been
              recorded.
            </Text>
            <PlayButton
              onPress={handlePress}
              title="Play Video Recordings"
              backgroundColor={"#246BFD"}
            />
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Pressable onPress={handleDownload} style={styles.modalOption}>
                  <Image source={require("@/assets/doctors/Download.png")} />
                  <Text style={styles.modalText}>Download Video</Text>
                </Pressable>
                <Image source={require("@/assets/doctors/Line.png")} />
                <Pressable onPress={handleDelete} style={styles.modalOption}>
                  <Image source={require("@/assets/doctors/Delete.png")} />
                  <Text style={[styles.modalText, { color: "red" }]}>
                    Delete Video
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  modalBackground: {
    width: 187,
    height: 112,
    backgroundColor: "white",
    marginRight: 20,
    marginTop: 50,
  },
  modalContainer: {
    padding: 20,
    rowGap: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "UrbanistSemiBold",
    marginLeft: 12,
  },
});

export default VideoRecord;
