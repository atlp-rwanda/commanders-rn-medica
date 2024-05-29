import { callxIcon } from "@/assets/icons/call";
import { loudspeakerIcon } from "@/assets/icons/loudspeaker";
import { voiceIcon } from "@/assets/icons/voice";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

export default function VoiceCallScreen() {
  const insets = useSafeAreaInsets();
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#F793EC", "#58DBE9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 overflow-hidden"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 24,
        paddingRight: insets.right + 24,
      }}
    >
      <NavigationHeader title="" iconClassName="text-white" />
      <View className="flex-1" />
      <View className="items-center">
        <Image
          source={require("@/assets/doctors/doc1.png")}
          className="rounded-full object-cover w-40 h-40 mb-4"
        />
        <Text className="text-3xl text-white font-UrbanistSemiBold mb-6">
          Dr. Eloi Nwokolo
        </Text>
        {isRinging ? (
          <Text className="text-lg text-white font-UrbanistSemiBold">
            Ringing...
          </Text>
        ) : (
          <Text className="text-lg text-white font-UrbanistSemiBold">
            16:25 mins
          </Text>
        )}
      </View>
      <View className="flex-1" />
      {!isRinging && (
        <Text className="text-lg text-white text-center">
          Audio recording is active...
        </Text>
      )}
      <View className="flex-1" />
      <View className="flex-row items-center justify-center my-12">
        <TouchableOpacity className="bg-white/40 p-5 rounded-full">
          <SvgXml
            xml={loudspeakerIcon}
            className="text-white"
            width={28}
            height={28}
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white/40 p-5 rounded-full mx-6">
          <SvgXml
            xml={voiceIcon}
            className="text-white"
            width={28}
            height={28}
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-error p-5 rounded-full" onPress={()=>{
            router.push("/Appointments/voice-call/session-ended");
        }}>
          <SvgXml
            xml={callxIcon}
            className="text-white"
            width={28}
            height={28}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
