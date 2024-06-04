import { voiceIcon } from "@/assets/icons/voice";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { getDurationFormatted } from "./utils";
export default function Recording() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [currentDuration, setCurrentDuration] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (recording) {
      interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          setCurrentDuration(status.durationMillis || 0);
        }
      }, 100);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recording]);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        alert("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setCurrentDuration(0);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        alert(
          "Recording stopped and the recording duration is " +
            getDurationFormatted(currentDuration)
        );
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        console.log("Recording stopped and stored at", uri);
        setRecording(undefined);
        setCurrentDuration(0);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  return (
    <View className="relative ml-3 bottom-1">
      <Text
        className={`font-UrbanistRegular text-center relative bottom-1 ${
          recording ? "text-[#913831]" : "text-transparent"
        }`}
      >
        {getDurationFormatted(currentDuration)}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-blue-500 p-4 rounded-full"
        onPress={recording ? stopRecording : startRecording}
      >
        <SvgXml xml={voiceIcon} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}
