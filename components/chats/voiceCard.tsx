import { leftArrowBlue, leftFilledArrowIcon } from "@/assets/icons/arrow";
import { heart, heartFilledIcon } from "@/assets/icons/heart";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";
export type CallsType = {
    name: string;
    type: string;
    time: string;
    date: string;
    icon?: any;
    image: ImageSourcePropType;
    onPress?: () => void;
};

export default function CallsCard(props: CallsType) {
    return (
        <Pressable onPress={props.onPress} style={styles.container}>
            <View className="bg-white rounded-3xl p-4 mb-6 mr-1" style={styles.card1}>
                <View className="flex-row justify-between w-full">
                    <Image source={props.image} className="w-24 h-24" />
                    <View className="justify-evenly pl-2 w-[50%]">
                        <View className="justify-between w-full items-center flex-row">
                            <Text className="text-[16px] font-[UrbanistBold]">
                                {props.name}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="font-UrbanistMedium">{props.type}</Text>
                        </View>
                        <View className="flex-row gap-1">
                            <Text className="font-[UrbanistMedium] text-xs">
                                {props.date}
                                {"   |   "}
                                {props.time}
                            </Text>

                        </View>
                    </View>
                    <TouchableOpacity className="justify-center" onPress={props.onPress}>
                        <View className="bg-reducedblue p-4 rounded-full">
                        <SvgXml xml={props.icon?props.icon:leftArrowBlue} style={{ height: 30, width: 30 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    card1: { elevation: 10, shadowColor: "rgba(4, 6, 15, 0.5)" },
    container: {
        shadowColor: "rgba(4, 6, 15, 0.5)",
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
    },
    icons: {
        width: 15.83,
        height: 15,
    },
    title3: {
        marginLeft: 10,
        fontSize: 12,
    },
});
