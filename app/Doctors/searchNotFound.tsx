
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DocButton from "../../components/cards/DocButtons";
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { SearchInput } from "../../components/searchinput2";
import { NavigationHeader } from "@/components/NavigationHeader";
import { useFonts } from "expo-font";
export default function searchNotFound() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    let [fontsLoaded] = useFonts({
        UrbanistBold: require("../../assets/fonts/Urbanist-Bold.ttf"),
        UrbanistMedium: require("../../assets/fonts/Urbanist-Regular.ttf"),
        UrbanistSemiBold: require("../../assets/fonts/Urbanist-SemiBold.ttf"),
        UrbanistRegular: require("../../assets/fonts/Urbanist-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View className="flex-1 bg-white px-4 py-5">
            <View className="pt-10">
                <View className="flex-row py-2" >
                    <NavigationHeader title="" />
                    <SearchInput />
                </View>
                <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
            </View>
            <View style={styles.found}>
                <Text className="text-[#212121] text-[20px] font-[UrbanistRegular]">0 found</Text>
                <View className="flex-row">
                    <Text style={styles.default} onPress={() => {
                        router.push("Doctors/doctorsFound")
                    }}>Default  </Text>
                    <Image source={require("../../assets/doctors/arrows.png")} />
                </View>
            </View>

            <View style={styles.results}>
                <Image source={require("../../assets/doctors/notfound.png")} />
                <Text style={styles.titleResult}>Not Found</Text>
                <Text style={styles.paragraph}>Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    results: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    found: {
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    default: {
        color: "#246BFD",
        fontSize: 16,
        fontFamily: "UrbanistRegular"
    },
    images: {
        width: 28,
        height: 28,
        marginHorizontal: 10,
        marginTop: 15,
    },
    titleResult: {
        fontSize: 24,
        paddingVertical: 15,
        fontFamily: "UrbanistBold",
        textAlign: "center",
    },
    paragraph: {
        fontSize: 18,
        marginHorizontal: 15,
        color: "#212121",
        fontFamily: "UrbanistRegular",
        textAlign: "center",
    }
})