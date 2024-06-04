import { deleteBtn } from "@/assets/icons/delete";
import { download } from "@/assets/icons/download";
import { Menu } from "@/assets/icons/menu";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ChatInput } from "@/components/chatInput";
import Chat from "@/components/chats/chat";
import Recording from "@/components/recording";
import { router } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useState } from "react";
import { SvgXml } from "react-native-svg";
export default function CustomerService() {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };
  return (
    <View className="flex-1 bg-white py-10 px-6">
      <NavigationHeader title={"Customer Service"} onBack={router.back}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/contact/call.png")}
            className="w-6 h-6 mr-3"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <SvgXml xml={Menu} />
        </TouchableOpacity>
        <Modal
          visible={visible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View className={` absolute w-[100%] right-0 z-[0] top-[5px]`}>
              <View className="w-[100%]">
                <View className="w-[37%] relative top-[50px] left-[59%] p-4 right-0 bg-white rounded-xl">
                  <TouchableOpacity className="flex-row gap-2 py-2">
                    <SvgXml xml={deleteBtn} />
                    <Text className="font-UrbanistSemiBold">Clear chat</Text>
                  </TouchableOpacity>
                  <View className="w-[85%] ml-3 pt-2 border-b-[1px] border-grey opacity-40" />
                  <TouchableOpacity className="flex-row gap-2 pb-2 pt-4 ">
                    <SvgXml xml={download} />
                    <Text className="font-UrbanistSemiBold">Export chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </NavigationHeader>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 mb-4"
        >
          <View className="flex-row justify-center items-center my-3">
            <View className="bg-[#75757512] justify-center items-center rounded-lg px-6 py-1.5">
              <Text className="text-sm text-[#757575] font-UrbanistSemiBold">
                Today
              </Text>
            </View>
          </View>

          <Chat
            direction="start"
            message="Hello, good morning."
            time="9:41 AM"
            color="lightgrey"
          />
          <Chat
            direction="start"
            message="I am a Customer Service, is there anything I can help you with? 😄"
            time="9:41 AM"
            color="lightgrey"
          />
          <Chat
            direction="end"
            message="Hi, I'm having problems with my payment."
            time="9:42 AM"
            color="lightblue"
          />
          <Chat
            direction="end"
            message="Can you help me?"
            time="9:42 AM "
            color="lightblue"
          />
          <Chat
            direction="start"
            message="Of course..."
            time="9:42 AM"
            color="lightgrey"
          />
          <Chat
            direction="start"
            message=" Can you tell me the problem you are having? so I can help solve it 😁"
            time="9:42 AM"
            color="lightgrey"
          />
          <Chat
            direction="start"
            message=" Can you tell me the problem you are having? so I can help solve it 😁"
            time="9:42 AM"
            color="lightgrey"
          />
        </ScrollView>
        <View className="flex-row justify-center items-center gap-2">
          <View className="flex-1">
            <ChatInput autoFocus={true} />
          </View>
          <Recording />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
