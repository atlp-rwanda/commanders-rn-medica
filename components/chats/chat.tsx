import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { doubleTick } from "@/assets/icons/doubletick";
import { PropsWithChildren } from "react";

interface ChatProps {
    direction: string;
    message: string;
    time: string;
    color: string;
}

export default function Chat({ direction, message, time, color }: ChatProps) {
    const borderRadiusStyle = direction === 'end' ? styles.senderBorderRadius : styles.receiverBorderRadius;

    return (
        <View className={`w-[100%] flex items-${direction} my-3`}>
            <View className={`bg-${color} p-4 w-3/4 flex justify-end gap-r-2`} style={borderRadiusStyle}>
                <Text className={`font-UrbanistRegular ${direction === 'start' ? '' : 'text-white'} w-[73%] leading-loose`}>
                    {message}
                </Text>
                <View className="flex-row items-center gap-x-1 justify-end">
                    <Text className={`font-UrbanistRegular ${direction === 'start' ? '' : 'text-white'} text-[10px]`}>{time}</Text>
                    <SvgXml xml={doubleTick} className={`${direction == 'start' ? 'hidden' : ''}`} />
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
        borderTopLeftRadius:8,
    },
});
