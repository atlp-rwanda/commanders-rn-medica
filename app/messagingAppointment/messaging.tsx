import { deleteBtn } from "@/assets/icons/delete";
import { download } from "@/assets/icons/download";
import { Menu } from "@/assets/icons/menu";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ChatInput } from "@/components/chatInput";
import Chat from "@/components/chats/chat";
import Recording from "@/components/recording";
import moment from "moment";
import { router, useGlobalSearchParams } from "expo-router";
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

import { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { supabase } from "../supabase";
import { getMessages } from "@/redux/reducers/appointment";
import { SendMessageButton } from "@/components/SendMessageButton";
import checkSession, { isSessionInFuture } from "@/utils/checkSession";
export default function messagingAppointment() {
  const [visible, setVisible] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [textMessage, setTextMessage] = useState("");
  const [userId, setUserId] = useState("");
  const appointment = useSelector(
    (state: RootState) => state.appointment.selectedAppointment
  );
  const messages = useSelector(
    (state: RootState) => state.appointment.messages
  );
  console.log("hello ", appointment);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setVisible(!visible);
  };

  const fetchMessages = async () => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;
      setUserId(userData?.user?.id);
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
	  *
	`
        )
        .eq("appointment_id", appointment.id);

      if (error) {
        console.log("Error occured while fetching appointments", error);
      } else {
        console.log("messages", data);
        dispatch(getMessages(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `appointment_id=eq.${appointment.id}`,
      },
      (payload) => {
        console.log("Change received!", payload);
        dispatch(getMessages([...messages, payload.new]));
      }
    )
    .subscribe();

  useEffect(() => {
    // checkSession();
    fetchMessages();
  }, [dispatch]);

  async function handleSendMessage(message: string, type: string) {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          message: message || textMessage,
          sender_id: userId,
          appointment_id: appointment.id,
          type: type || "message",
        },
      ])
      .select();

    if (data) {
      if (textMessage.trim().length > 0) {
        setTextMessage("");
      }
    } else {
      console.log("data note inserted well", error);
    }
  }

  return (
    <View className="flex-1 bg-white py-10 px-6">
      <NavigationHeader title={appointment.doctor.name} onBack={router.back}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/search.png")}
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
          {messages &&
            messages.map((message: any, index: any) => (
              <Chat
                key={index}
                direction={message.sender_id === userId ? "end" : "start"}
                message={message.message}
                type={message.type}
                time={moment(`${message.created_at}`).calendar()}
                color={message.sender_id === userId ? "lightblue" : "lightgrey"}
              />
            ))}
        </ScrollView>
        {!checkSession(
          appointment.duration,
          appointment.appointment_date,
          appointment.appointment_time
        ) &&
          (!isSessionInFuture(
            appointment.duration,
            appointment.appointment_date,
            appointment.appointment_time
          ) ? (
            <View className="flex-row justify-center items-center gap-2">
              <View className="flex-1">
                <ChatInput
                  onChangeText={(text) => setTextMessage(text)}
                  onKeyPress={() => handleSendMessage(textMessage, "message")}
                  handleMessage={handleSendMessage}
                  autoFocus={true}
                />
              </View>
              {/* Replace recording icon onChangeText to send Icon */}
              {textMessage.trim().length === 0 ? (
                <Recording direction={""} handleMessage={handleSendMessage} />
              ) : (
                <SendMessageButton
                  onPress={() => handleSendMessage(textMessage, "message")}
                />
              )}
            </View>
          ) : (
            <View className="flex-row justify-center items-center my-3">
              <View className="bg-[#75757512] justify-center items-center rounded-lg px-6 py-1.5">
                <Text className="text-sm text-[#757575] font-UrbanistSemiBold">
                  Session is Not Yet Started
                </Text>
              </View>
            </View>
          ))}

        {checkSession(
          appointment.duration,
          appointment.appointment_date,
          appointment.appointment_time
        ) && (
          <View className="flex-row justify-center items-center my-3">
            <View className="bg-[#75757512] justify-center items-center rounded-lg px-6 py-1.5">
              <Text className="text-sm text-[#757575] font-UrbanistSemiBold">
                Session End
              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
