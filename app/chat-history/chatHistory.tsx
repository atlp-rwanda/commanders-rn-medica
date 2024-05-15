import { Text, View, ScrollView, Image, Pressable, FlatList, TouchableOpacity, Modal, Dimensions } from "react-native";
import { useState } from "react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Icon } from "@/components/Icon";
import { SvgXml } from "react-native-svg";
import { searchDark } from "@/assets/icons/search";
import { moreTransparent } from "@/assets/icons/more";
import { messages, MessagesType } from "./data";
import { back } from "@/assets/icons/userprofile/icons";
import {doubleTick } from "@/assets/icons/doubletick";
import { download } from "@/assets/icons/download";
import { deleteBtn,deleteRed } from "@/assets/icons/delete";
import Chat from "@/components/chats/chat";


export default function Chathistory() {
    const y=Dimensions.get("screen").height;
    const [selected, setSelected] = useState("Messages");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [docName, setDocname] = useState('');
    const handleDocName = (doc: string) => {
        setDocname(doc);
        setIsModalVisible(true);
    }
    const renderItems = ({ item }: { item: MessagesType }) => {
        return (
            <View className="flex flex-row w-1/1 justify-between items-center py-3 ">
                <View className="flex-none w-[20%]">
                    <Image source={item.image} style={{ width: 58, height: 58 }} />
                </View>
                <TouchableOpacity className="flex-auto w-[73%] pl-2" onPress={() => handleDocName(item.name)}>
                    <Text className="font-UrbanistBold text-[16px] pb-2">{item.name}</Text>
                    <Text className="font-UrbanistRegular text-grey">{item.message}</Text>
                </TouchableOpacity>
                <View className="flex-auto w-[30%] justify-start">
                    <Text className="font-UrbanistRegular text-grey pb-2 text-right">{item.date}</Text>
                    <Text className="font-UrbanistRegular text-grey text-right">{item.time}</Text>
                </View>
            </View>
        )
    }
    return (
        <>
            <Modal visible={isModalVisible} transparent={false}>
                <View className={`${visible? '': 'hidden'} absolute w-[100%] right-0 z-[0] top-[5px]`}>
                    <View className="w-[100%]">
                        <View className="w-[37%] relative top-[50px] left-[59%] p-4 right-0 bg-white rounded-xl">
                            <TouchableOpacity className="flex-row gap-2 py-2">
                                <SvgXml xml={deleteBtn} />
                                <Text className="font-UrbanistSemiBold">Clear chat</Text>
                            </TouchableOpacity>
                            <View className="w-[85%] ml-3 pt-2 border-b-[1px] border-grey opacity-40"/>
                            <TouchableOpacity className="flex-row gap-2 pb-2 pt-4 ">
                                <SvgXml xml={download} />
                                <Text className="font-UrbanistSemiBold" > Export chat</Text>
                            </TouchableOpacity>
                            <View className="w-[85%] ml-3 pb-2 border-b-[1px] border-grey opacity-40"/>
                            <TouchableOpacity className="flex-row gap-2 pt-3" onPress={()=>{setVisible(false)}} >
                                <SvgXml xml={deleteRed} stroke={'#F75555'} />
                                <Text className="font-UrbanistSemiBold text-[#F75555]">Delete chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className='w-1/1 pt-7 mx-4'>
                    <View className='flex-row items-center justify-between pb-5'>
                        <View className='flex-row items-center justify-center  ml-0'>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <SvgXml xml={back} />
                            </TouchableOpacity>
                            <Text className="text-[22px] px-2 font-UrbanistBold">{docName}</Text>
                        </View>
                        <View className='flex-row items-center justify-center gap-3 mx-1'>
                            <SvgXml xml={searchDark} />
                            <SvgXml xml={moreTransparent} onPress={() => setVisible(!visible)} />
                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} className="mb-5 z-[-1]">
                        <View className="flex-row justify-center items-center my-3">
                            <View className="w-1/3 bg-[#75757512] justify-center items-center rounded-xl">
                                <Text className="text-[13px] p-1 text-[#757575] font-UrbanistSemiBold">Session started</Text>
                            </View>
                        </View>

                        <Chat direction="end"
                            message="Hi, good afternoon Dr. Drake... 😁😁"
                            time="16:00 PM"
                            color="lightblue"
                        />
                        <Chat direction="end"
                            message="I'm Andrew, I have a problem with my immune system 😢"
                            time="16:00 PM"
                            color="lightblue"
                        />
                        <Chat direction="start"
                            message="Hello, good afternoon too Andrew 😁"
                            time="16:01 PM"
                            color="lightgrey"
                        />
                        <Chat direction="start"
                            message="Can you tell me the problem you are having? So that I can identify it."
                            time="16:01 PM"
                            color="lightgrey"
                        />
                        <Chat direction="end"
                            message="Recently I often feel unwell. I also sometimes experience pain in the legs, and I don't know why 😭😭
                        Do you know anything doc?"
                            time="16:02 PM"
                            color="lightblue"
                        />
                        <View className={`w-[100%] flex items-end my-3`}>
                            <View className={` rounded-xl p-4 w-3/4 flex justify-end gap-r-2`}>
                                <View className={` w-[73%] flex-row gap-x-4 pb-3`}>
                                    <Image source={require("../../assets/images/chat/leg.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                                    <Image source={require("../../assets/images/chat/leg1.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                                </View>
                                {/* <View className="flex-row items-center gap-x-1 justify-end">
                                    <Text className={`font-UrbanistRegular text-[10px]`}>16:03 PM</Text>
                                    <SvgXml xml={doubleTick} stroke={'black'} />
                                </View> */}
                            </View>
                        </View>
                    </ScrollView>

                </View>

            </Modal>
            <View className='w-1/1 pt-10 mx-4 '>
                <View className='flex-row items-center justify-between'>
                    <View className='flex-row items-center justify-center'>
                        <Image source={require("../../assets/images/chat/logo.png")} style={{ width: 28, height: 28 }} />
                        <Text className="text-[24px] font-UrbanistBold px-4">History</Text>
                    </View>
                    <View className='flex-row items-center justify-center gap-3 mx-1'>
                        <SvgXml xml={searchDark} />
                        <SvgXml xml={moreTransparent} />
                    </View>
                </View>
                <View className="my-4 w-1/1 justify-between mr-3">
                    <View className="flex-row justify-between w-[100%]" >
                        <Pressable className=" flex-initial items-center w-1/3" onPress={() => setSelected("Messages")}>
                            <Text className={`font-UrbanistSemiBold text-[18px] ${selected === 'Messages' ? 'text-lightblue' : 'text-grey'} pb-2`}>Messages</Text>
                            <View className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${selected === 'Messages' ? '' : 'hidden'}`} />
                        </Pressable>
                        <Pressable className="flex-initial items-center w-1/3" onPress={() => setSelected("Calls")}>
                            <Text className={`font-UrbanistSemiBold text-[18px] ${selected === 'Calls' ? 'text-lightblue' : 'text-grey'} pb-2`}>Voice Call</Text>
                            <View className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${selected === 'Calls' ? '' : 'hidden'}`} />
                        </Pressable>
                        <Pressable className="flex-initial items-center w-1/3">
                            <Text className={`font-UrbanistSemiBold text-[18px] ${selected === 'Videos' ? 'text-lightblue' : 'text-grey'} pb-2`} onPress={() => setSelected("Videos")}>
                                Video Call</Text>
                            <View className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${selected === 'Videos' ? '' : 'hidden'}`}></View>
                        </Pressable>
                    </View>
                    <View className="w-[100%] border-b-[2px] border-[#EEEEEE] relative bottom-[2.6px] z-[-1]" ></View>
                </View>
                
                <FlatList data={messages} renderItem={renderItems} style={{ height:'82%' }} showsVerticalScrollIndicator={false} />
                
            </View>
        </>
    )
}