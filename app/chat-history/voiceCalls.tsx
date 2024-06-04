import DoctorCard from "@/components/cards/doctorCard";
import CallsCard, { CallsType } from "@/components/chats/voiceCard";
import { router } from "expo-router";
import { Text, View, ScrollView, ImageSourcePropType } from "react-native";
import { FlatList } from "react-native";

interface VoiceCardType {
    name:string,
    type:string,
    date:string,
    time:string,
    image:ImageSourcePropType,
}
export default function VoiceCalls() {
    const data = [{
        name: 'Dr. Jenny Watson',
        type: 'Voice call',
        date: 'Today',
        time: '14:00 PM',
        image: require('@/assets/doctors/doc1.png')
    },
    {
        name: 'Dr. Dustin Jurries',
        type: 'Voice call',
        date: 'Yesterday',
        time: '19:00 PM',
        image: require('@/assets/doctors/doc2.png')
    },
    {
        name: 'Dr. Aidan Allende',
        type: 'Voice call',
        date: 'Dec 10, 2022',
        time: '10:30 AM',
        image: require('@/assets/doctors/doc3.png')
    },
    {
        name: 'Dr. Raul Zirkind',
        type: 'Voice call',
        date: 'Dec 05, 2022',
        time: '15:00 PM',
        image: require('@/assets/doctors/doc4.png')
    },

    ]
    const renderItems = ({ item }: { item: VoiceCardType }) => {
        return (
            <>
                <CallsCard
                    name={item.name}
                    type={item.type}
                    date={item.date}
                    time={item.time}
                    image={item.image}
                    onPress={()=>router.push('chat-history/singleCall')}
                />
            </>
        )
    }

    const image = require('@/assets/doctors/doc1.png');
    return (
        <>
        <FlatList data={data} renderItem={renderItems} showsVerticalScrollIndicator={false} className="h-[82%]"/>
        </>
    )
}