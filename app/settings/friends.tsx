import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
export default function Friends() {
    const [friends, setFriends] = useState([{
        image: require("../../assets/friends/aileen.png"),
        name: "Ingabire Diane",
        phone: "078 567 821",
        key: 1,
        invited: false
    }, {
        image: require("../../assets/friends/charolette.png"),
        name: "Umurungi Gloria",
        phone: "078 567 451",
        key: 2,
        invited: false
    },
    {
        image: require("../../assets/friends/darron.png"),
        name: "Irakoze Anny",
        phone: "078 567 211",
        key: 3,
        invited: false
    },

    {
        image: require("../../assets/friends/lauralee.png"),
        name: "Laurance Mutoni",
        phone: "078 567 890",
        key: 4,
        invited: false
    },
    {
        image: require("../../assets/friends/rodolfo.png"),
        name: "Paul Rugamba",
        phone: "078 782 145",
        key: 5,
        invited: false
    },
    {
        image: require("../../assets/friends/rodolfo.png"),
        name: "Shema Rick",
        phone: "078 782 132",
        key: 6,
        invited: false
    },
    {
        image: require("../../assets/friends/rodolfo.png"),
        name: "Eric Bikorimana",
        phone: "078 673 268",
        key: 7,
        invited: false
    },
    {
        image: require("../../assets/friends/rodolfo.png"),
        name: "James Mucyo",
        phone: "078 678 214",
        key: 8,
        invited: false
    }])
    const handleInviteClick = (index: any) => {
        if (friends[index].invited) {
            Alert.alert("Already Invited", `${friends[index].name} has already been invited.`);
        } else {
            Alert.alert(
                "New Invitation",
                `Are you sure you want to send an invitation to ${friends[index].name}?`,
                [
                    {
                        text: "No",
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: () => {
                            const newFriends = [...friends];
                            newFriends[index].invited = true;
                            setFriends(newFriends);
                        },
                    },
                ]
            );
        }
    };

    return (
        <View className="bg-white flex-1 px-4 py-10">
            <View className="flex-row px-2 py-6">
                <Icon name="back" onPress={router.back} />
                <Text className="flex-1 font-UrbanistBold text-2xl  ml-4 mt-[-6px]">Invite Friends</Text>
            </View>
            <FlatList data={friends}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item, index }) => (
                    <View className="flex-row justify-between mt-2">
                        <View className="flex-row mb-4">
                            <Image source={item.image} className="w-20 h-20 rounded-full" />
                            <View className="ml-4 mt-3">
                                <Text className="text-[#212121] text-[18px] font-UrbanistBold">{item.name}</Text>
                                <Text className="text-[#616161] text-[14px] font-UrbanistMedium mt-2">{item.phone}</Text>
                            </View>
                        </View>

                        <TouchableOpacity className={`w-[69px] h-[32px] px-[16px] py-[6px] rounded-full mt-3 ${item.invited ? ' w-[77px] h-[32px] px-[16px] py-[6px] bg-white border border-blue-500' : 'bg-blue-500'}`} onPress={() => {
                            handleInviteClick(index)
                        }}><Text className={`text-sm font-semibold  text-center ${item.invited ? 'text-blue-500' : 'text-white'}`}>
                                {item.invited ? 'Invited' : 'Invite'}
                            </Text></TouchableOpacity>
                    </View>
                )}
                showsVerticalScrollIndicator={false} />

        </View>
    )
}
