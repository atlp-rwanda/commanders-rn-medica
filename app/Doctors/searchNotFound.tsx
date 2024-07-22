
import { router } from "expo-router";
import { View, Image, Text } from "react-native";

export default function searchNotFound() {
   
    return (
        <View className="flex-1 bg-white px-4 py-5">
            <View className="flex-1 justify-center items-center content-center">
                <Image source={require("../../assets/doctors/notfound.png")} />
                <Text className="text-[24px] font-UrbanistBold text-center py-[15px]">Not Found</Text>
    
                <Text className="text-[#212121] font-UrbanistRegular text-center text-[18px] mx-[15px]">Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
   
            </View>
        </View>
    )
}
