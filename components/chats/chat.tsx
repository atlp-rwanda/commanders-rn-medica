import { View, Text, StyleSheet, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { doubleTick } from "@/assets/icons/doubletick";
import { PropsWithChildren } from "react";
import AudioPlayer from "../AudioPlayer";

interface ChatProps {
  direction: string;
  message: string;
  time: string;
  color: string;
  type: string;
}

export default function Chat({
  direction,
  message,
  time,
  color,
  type,
}: ChatProps) {
  const borderRadiusStyle =
    direction === "end"
      ? styles.senderBorderRadius
      : styles.receiverBorderRadius;

  return type == "image" ? (
    <View className={`w-[100%] flex items-${direction} my-3`}>
      <View className={`p-4 w-3/4 flex justify-end gap-r-2`}>
        <View className={` w-[100%] flex-row gap-x-4 pb-3`}>
          <Image
            source={{ uri: message }}
            className="w-[100%]"
            style={{ height: 100 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  ) : type == "audio" ? (
    <View className={`w-[100%] flex items-${direction} my-3`}>
      <View className={`p-4 w-3/4 flex justify-end gap-r-2`}>
        <View className={` w-[100%] flex-row gap-x-4 pb-3`}>
          <AudioPlayer source={message} />
        </View>
      </View>
    </View>
  ) : (
    <View className={`w-[100%] flex items-${direction} my-3`}>
      <View
        className={`bg-${color} p-4 w-3/4 flex justify-end gap-r-2`}
        style={borderRadiusStyle}
      >
        <Text
          className={`font-UrbanistRegular ${direction === "start" ? "" : "text-white"} w-[73%] leading-loose`}
        >
          {message}
        </Text>
        <View className="flex-row items-center gap-x-1 justify-end">
          <Text
            className={`font-UrbanistRegular ${direction === "start" ? "" : "text-white"} text-[10px]`}
          >
            {time}
          </Text>
          <SvgXml
            xml={doubleTick}
            className={`${direction == "start" ? "hidden" : ""}`}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  senderBorderRadius: {
    borderRadius: 20,
    borderBottomRightRadius: 8,
  },
  receiverBorderRadius: {
    borderRadius: 20,
    borderTopLeftRadius: 8,
  },
});
