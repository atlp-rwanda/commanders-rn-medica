import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Chat from "@/components/chats/chat";
import { SvgXml } from "react-native-svg";
import { searchDark } from "@/assets/icons/search";
import { moreTransparent } from "@/assets/icons/more";
import { back } from "@/assets/icons/userprofile/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { emoji } from "@/assets/icons/emoji";
import Touchable from "@/components/common/touchable";
import { attach } from "@/assets/icons/attach";
import { camera } from "@/assets/icons/camera";
import { voiceIcon24 } from "@/assets/icons/voice";

const ChatComponent = () => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <View
      className="w-full px-6 bg-white flex-1"
      style={{ paddingTop: insets.top }}
    >
      <View className="w-full flex-1">
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center justify-center  ml-0">
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={back} />
            </TouchableOpacity>
            <Text className="text-[22px] px-2 font-UrbanistBold">Latifah</Text>
          </View>
          <View className="flex-row items-center justify-center gap-3 mx-1">
            <SvgXml xml={searchDark} />
            <SvgXml
              xml={moreTransparent}
              onPress={() => setVisible(!visible)}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="z-[-1] flex-1"
        >
          <View className="flex-row justify-center items-center my-3">
            <View className="w-1/3 bg-[#75757512] justify-center items-center rounded-xl">
              <Text className="text-[13px] p-1 text-[#757575] font-UrbanistSemiBold">
                Session started
              </Text>
            </View>
          </View>

          <Chat
            direction="end"
            message="Hi, good afternoon Dr. Drake... 😁😁"
            time="16:00 PM"
            color="lightblue"
          />
          <Chat
            direction="end"
            message="I'm Andrew, I have a problem with my immune system 😢"
            time="16:00 PM"
            color="lightblue"
          />
          <Chat
            direction="start"
            message="Hello, good afternoon too Andrew 😁"
            time="16:01 PM"
            color="lightgrey"
          />
          <Chat
            direction="start"
            message="Can you tell me the problem you are having? So that I can identify it."
            time="16:01 PM"
            color="lightgrey"
          />
          <Chat
            direction="end"
            message="Recently I often feel unwell. I also sometimes experience pain in the legs, and I don't know why 😭😭
                          Do you know anything doc?"
            time="16:02 PM"
            color="lightblue"
          />
        </ScrollView>
        <View className="bottom-0 pb-6 pt-2 flex-row w-full justify-between items-center">
          <View
            className={`bg-whiteSmoke flex-row w-[82%] justify-between items-center px-3 rounded-2xl h-[56px]`}
          >
            <Touchable className="mr-2.5">
              <SvgXml xml={emoji} />
            </Touchable>
            <TextInput
              value={message}
              placeholder={"Type a message ..."}
              placeholderTextColor="#BDBDBD"
              onChangeText={setMessage}
              defaultValue={""}
              returnKeyType="search"
              className="font-['UrbanistRegular'] font-[14px] items-center bg-transparent flex-1 rounded-xl pr-2.5 h-full"
            />
            <Touchable className="mr-2.5">
              <SvgXml xml={attach} />
            </Touchable>
            <Touchable className="">
              <SvgXml xml={camera} />
            </Touchable>
          </View>
          <Touchable className="bg-[#246BFD] h-[56px] w-[56px] items-center justify-center rounded-full">
            <SvgXml xml={voiceIcon24} />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default ChatComponent;
