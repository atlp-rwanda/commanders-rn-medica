import { View, Text, ImageBackground, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import Touchable from "@/components/common/touchable";
import { videoIconWhite28 } from "@/assets/icons/video";
import { volume } from "@/assets/icons/volume";
import { voiceIcon } from "@/assets/icons/voice";
import { endCall } from "@/assets/icons/endCall";
import { arrowLeft } from "@/assets/icons/arrow";
import { router } from "expo-router";
import { useEffect } from "react";

const Ringing = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("videoCallAppointment/videoCall");
    }, 5000);
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/bannerImg.png")}
        className="w-max flex-1 r-[25%] top-[15%]"
        blurRadius={5}
      />
      <View className="absolute bg-[#181A2055] self-center h-full w-full items-center justify-center">
        <Touchable className="w-full px-6 mb-7" onPress={() => router.back()}>
          <SvgXml xml={arrowLeft} />
        </Touchable>
        <View className="bg-greyscale-300 rounded-full overflow-hidden backdrop-blur-lg">
          <Image
            source={require("../../assets/images/bannerImg.png")}
            className="w-[200px] h-[200px] left-[-5%] top-[15%]"
          />
        </View>
        <Text className="text-[32px] font-UrbanistBold text-white my-7">
          Dr. Maria Foose
        </Text>
        <Text className="text-[18px] font-UrbanistBold text-white mb-7">
          Ringing...
        </Text>
        <View className="flex-row gap-5">
          <Touchable
            disabled
            className="w-[60px] h-[60px] bg-[#F0F0F052] items-center justify-center rounded-full"
          >
            <SvgXml xml={volume} />
          </Touchable>
          <Touchable
            disabled
            className="w-[60px] h-[60px] bg-[#F0F0F052] items-center justify-center rounded-full"
          >
            <SvgXml xml={videoIconWhite28} />
          </Touchable>
          <Touchable
            disabled
            className="w-[60px] h-[60px] bg-[#F0F0F052] items-center justify-center rounded-full"
          >
            <SvgXml xml={voiceIcon} />
          </Touchable>
          <Touchable
            disabled
            className="w-[60px] h-[60px] bg-[#F75555] items-center justify-center rounded-full"
          >
            <SvgXml xml={endCall} />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default Ringing;
