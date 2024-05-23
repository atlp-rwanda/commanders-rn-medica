import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
export default function Languages() {

    const [languages, setLanguages] = useState([
        { language: "Kinyarwanda", key: 3 },
        { language: "Swahili", key: 4 },
        { language: "Spanish", key: 5 },
        { language: "French", key: 6 },
        { language: "Lugande", key: 7 },
        { language: "Yoruba", key: 8 },
        { language: "Arabic", key: 9 },
        { language: "Fulani", key: 10 },
        { language: "Mandarin", key: 11 },
        { language: "Hausa", key: 12 },
        { language: "Chinese", key: 13 },
        { language: "Russian", key: 14 },
        { language: "Shona", key: 15 },
    ])
    const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
    return (
        <View className="flex-1 bg-white py-10 px-4">
            <View className="flex-row px-2 py-6">
                <Icon name="back" onPress={router.back} />
                <Text className="flex-1 font-UrbanistBold text-[24px] ml-4 mt-[-6px]"> Language</Text>
            </View>
            <Text className="font-UrbanistBold  text-[20px] text-[#212121]  my-3 mx-4">Suggested</Text>
            <View>
                <View className="flex-row justify-between  my-5 mx-4">

                    <Text className="font-UrbanistSemiBold  text-[18px] text-[#212121]">English (US)</Text>
                    <TouchableOpacity className="w-[20px] h-[20px] border-[3px] rounded-[10px] border-[#246BFD] items-center justify-center"
                        onPress={() => setSelectedLanguage("English (US)")}>
                        {selectedLanguage === "English (US)" && (<View
                            className="w-[11.67px] h-[11.67px] rounded-[5.8px] bg-lightblue"
                        ></View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between my-5 mx-4">
                    <Text className="font-UrbanistSemiBold  text-[18px] text-[#212121]">English (UK)</Text>
                    <TouchableOpacity className="w-[20px] h-[20px] border-[3px] rounded-[10px] border-[#246BFD] items-center justify-center" onPress={() => setSelectedLanguage("English (UK)")}>
                        {selectedLanguage === "English (UK)" && (<View
                           className="w-[11.67px] h-[11.67] rounded-[5.8px] bg-lightblue"
                        ></View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className="border-[#EEEEEE] border-[1px]  mt-3 mx-4"></View>
            </View>
            <Text className="font-UrbanistBold  text-[20px] text-[#212121]  my-5 mx-4 ">Language</Text>
            <FlatList data={languages} renderItem={({ item }) => (
                <View className="flex-row justify-between my-5 mx-4">

                    <Text className="font-UrbanistSemiBold  text-[18px] text-[#212121]">{item.language}</Text>
                    <TouchableOpacity className="w-[20px] h-[20px] border-[3px] rounded-[10px] border-[#246BFD] items-center justify-center" onPress={() => setSelectedLanguage(item.language)}>
                        {selectedLanguage === item.language && (<View
                            
                            className="w-[11.67px] h-[11.67] rounded-[5.8px] bg-lightblue"
                        ></View>
                        )}
                    </TouchableOpacity>
                </View>)}
                showsVerticalScrollIndicator={false} />

        </View>
    )
}