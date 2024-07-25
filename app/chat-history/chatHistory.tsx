import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { moreTransparent } from "@/assets/icons/more";
import { searchDark } from "@/assets/icons/search";
import { back } from "@/assets/icons/userprofile/icons";
import moment from "moment";
import Chat from "@/components/chats/chat";
// import Index from "./VideoCall";
// import VoiceCalls from "./voiceCalls";
import { supabase } from "../supabase";


export default function Chathistory() {
  const y = Dimensions.get("screen").height;
  const [selected, setSelected] = useState("Messages");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [docName, setDocname] = useState("");
  const [messages, setMessage]=useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [appointment, setAppointment]=useState<any[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const handleDocName = (doc: string, appointmentId: string) => {
    setDocname(doc);
    setSelectedAppointmentId(appointmentId);
    setIsModalVisible(true);
  };

  useEffect(()=>{
const fetchAppointments=async()=>{
const {data, error}=await supabase.auth.getUser();
if(error) throw error;
const userId=data?.user?.id;
setUserId(userId);
const {data:AppointmentData, error:Error}=await supabase.from("appointment").select("*, doctor(name,image)").eq("patient_id", userId).eq("package","Messaging")
if(Error) throw Error
if(AppointmentData){
setAppointment(AppointmentData);
}
const{data:MessageData, error:MessageError}=await supabase.from("messages").select("*")
if(MessageData){
  setMessage(MessageData);
}
if(MessageError)throw MessageError;

}
fetchAppointments();
  },[])
  const renderHistory = (appointment: any, index:number) => {
    const latestMessage = messages
    .filter((message: any) => message.appointment_id === appointment.id)
    .slice(-1)[0]?.message;
    return (
      <View key={index} className="flex flex-row w-1/1 justify-between items-center py-3 ">
        <View className="flex-none w-[20%]">
          <Image source={{uri:appointment.doctor.image}} style={{ width: 58, height: 58 }} />
        </View>
        <TouchableOpacity
          className="flex-auto w-[73%] pl-2"
          onPress={() => handleDocName(appointment.doctor.name, appointment.id)}
        >
          <Text className="font-UrbanistBold text-[16px] pb-2">
            {appointment.doctor.name}
          </Text>
          <Text className="font-UrbanistRegular text-grey"> {latestMessage ? latestMessage: ""}</Text>
        </TouchableOpacity>
        <View className="flex-auto w-[30%] justify-start">
          <Text className="font-UrbanistRegular text-grey pb-2 text-right">
            {appointment.appointment_date}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Modal visible={isModalVisible} transparent={false}>
        <View
          className={`${
            visible ? "" : "hidden"
          } absolute w-[100%] right-0 z-[0] top-[5px]`}
        >
          <View className="w-[100%]">
            <View className="w-[37%] relative top-[50px] left-[59%] p-4 right-0 bg-white rounded-xl">
              
            </View>
          </View>
        </View>
        <View className="w-1/1 pt-7 mx-4">
          <View className="flex-row items-center justify-between pb-5">
            <View className="flex-row items-center justify-center  ml-0">
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <SvgXml xml={back} />
              </TouchableOpacity>
              <Text className="text-[22px] px-2 font-UrbanistBold">
                {docName}
              </Text>
            </View>
            <View className="flex-row items-center justify-center gap-3 mx-1">
             
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mb-5 z-[-1]"
          >
            <View className="flex-row justify-center items-center my-3">
              <View className="w-1/3 bg-[#75757512] justify-center items-center rounded-xl">
                <Text className="text-[13px] p-1 text-[#757575] font-UrbanistSemiBold">
                  Session started
                </Text>
              </View>
            </View>
            {messages
    .filter((message: any) => message.appointment_id === selectedAppointmentId)
    .map((message: any, index: any) => (
      <Chat
      key={index}
      direction={message.sender_id === userId ? "end" : "start"}
      message={message.message}
      time={moment(`${message.created_at}`).calendar()}
      color={message.sender_id === userId ? "lightblue" : "lightgrey"}
      type={message.type}
    />
            ))}
            <View className="flex-row justify-center items-center my-3">
              <View className="w-1/3 bg-[#75757512] justify-center items-center rounded-xl">
                <Text className="text-[13px] p-1 text-[#757575] font-UrbanistSemiBold">
                  Session Ended
                </Text>
              </View>
            </View>
 <View className={`w-[100%] flex items-end my-3`}>
              <View
                className={` rounded-xl p-4 w-3/4 flex justify-end gap-r-2`}
              >
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View className="w-1/1 pt-10 mx-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-center">
            <Image
              source={require("../../assets/images/chat/logo.png")}
              style={{ width: 28, height: 28 }}
            />
            <Text className="text-[24px] font-UrbanistBold px-4">History</Text>
          </View>
        </View>
        <View className="my-4 w-1/1 justify-between mr-3">
          <View className="flex-row justify-between w-[100%]">
            <Pressable
              className=" flex-initial items-center w-full"
              onPress={() => setSelected("Messages")}
            >
              <Text
                className={`font-UrbanistSemiBold text-[18px] text-center ${
                  selected === "Messages" ? "text-lightblue" : "text-grey"
                } pb-2`}
              >
                Messages
              </Text>
              <View
                className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${
                  selected === "Messages" ? "" : "hidden"
                }`}
              />
            </Pressable>
            {/* <Pressable
              className="flex-initial items-center w-1/3"
              onPress={() => setSelected("Calls")}
            >
              <Text
                className={`font-UrbanistSemiBold text-[18px] ${
                  selected === "Calls" ? "text-lightblue" : "text-grey"
                } pb-2`}
              >
                Voice Call
              </Text>
              <View
                className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${
                  selected === "Calls" ? "" : "hidden"
                }`}
              />
            </Pressable>
            <Pressable className="flex-initial items-center w-1/3">
              <Text
                className={`font-UrbanistSemiBold text-[18px] ${
                  selected === "Videos" ? "text-lightblue" : "text-grey"
                } pb-2`}
                onPress={() => setSelected("Videos")}
              >
                Video Call
              </Text>
              <View
                className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${
                  selected === "Videos" ? "" : "hidden"
                }`}
              ></View>
            </Pressable> */}
          </View>
          <View className="w-[100%] border-b-[2px] border-[#EEEEEE] relative bottom-[2.6px] z-[-1]"></View>
        </View>
        {selected === "Messages" && (
          <ScrollView style={{ height: "82%" }} showsVerticalScrollIndicator={false}>
            {appointment.map((appointmentItem,index) => renderHistory(appointmentItem,index))}
          </ScrollView>
        )}
{/* {selected==="Calls"&&<VoiceCalls/>}
        {selected === "Videos" && <Index />} */}
      </View>
    </>
  );
}
