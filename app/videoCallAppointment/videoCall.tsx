import { View, Text, ImageBackground, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import Touchable from "@/components/common/touchable";
import { videoIconWhite28 } from "@/assets/icons/video";
import { volume } from "@/assets/icons/volume";
import { voiceIcon } from "@/assets/icons/voice";
import { endCall } from "@/assets/icons/endCall";
import { arrowLeft } from "@/assets/icons/arrow";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera } from "@/components/camera/camera";

const VideoCall = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/bannerImg.png")}
        className="w-max flex-1 r-[25%] top-[15%]"
        blurRadius={5}
      />
      <View
        className="absolute bg-[#181A2055] self-center h-full w-full items-center justify-between"
        style={{ paddingTop: insets.top + 20 }}
      >
        <Touchable className="w-full px-6 mb-7" onPress={() => router.back()}>
          <SvgXml xml={arrowLeft} />
        </Touchable>
        <View
          className="justify-center items-center w-full"
          style={{ marginBottom: insets.bottom + 24 }}
        >
          <View className="overflow-hidden self-end right-6 rounded-[20px]">
            <Camera />
          </View>
          <Text className="text-[18px] font-UrbanistBold text-white my-2">
            25:38 mins
          </Text>
          <Text className="text-[18px] font-UrbanistMedium text-white mb-2">
            Video recording is active...
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
              className="w-[60px] h-[60px] bg-[#F75555] items-center justify-center rounded-full"
              onPress={() =>
                router.push("/Appointments/voice-call/session-ended")
              }
            >
              <SvgXml xml={endCall} />
            </Touchable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoCall;
