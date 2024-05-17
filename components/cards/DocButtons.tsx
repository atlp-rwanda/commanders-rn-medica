import React from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";

interface DocButtonProps {
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
}

const DocButton: React.FC<DocButtonProps> = ({ selectedCategory, onCategorySelect }) => {
    let [fontsLoaded] = useFonts({
        UrbanistBold: require("../../assets/fonts/Urbanist-Bold.ttf"),
        UrbanistMedium: require("../../assets/fonts/Urbanist-Regular.ttf"),
        UrbanistSemiBold: require("../../assets/fonts/Urbanist-SemiBold.ttf"),
        UrbanistRegular: require("../../assets/fonts/Urbanist-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const getButtonStyle = (category: string) => {
        return selectedCategory === category ? styles.activeBtn : styles.regularBtn;
    };

    const getButtonTextStyle = (category: string) => {
        return selectedCategory === category ? styles.activeText : styles.btnText;
    };

    return (

        <View style={styles.btns}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={getButtonStyle("all")} onPress={() => onCategorySelect("all")}>
                    <Text style={getButtonTextStyle("all")}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("general")} onPress={() => onCategorySelect("general")}>
                    <Text style={getButtonTextStyle("general")}>General</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("dentist")} onPress={() => onCategorySelect("dentist")}>
                    <Text style={getButtonTextStyle("dentist")}>Dentist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("nutritionist")} onPress={() => onCategorySelect("nutritionist")}>
                    <Text style={getButtonTextStyle("nutritionist")}>Nutritionist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("pediatric")} onPress={() => onCategorySelect("pediatric")}>
                    <Text style={getButtonTextStyle("pediatric")}>Pediatric</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    btns: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        marginLeft: 10,
    },
    activeBtn: {
        backgroundColor: "#246BFD",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 100,
    },
    activeText: {
        color: "#FFFFFF",
        fontFamily: "UrbanistRegular",
    },
    regularBtn: {
        borderWidth: 1,
        borderColor: "#246BFD",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 100,
        marginHorizontal: 5,
    },
    btnText: {
        color: "#246BFD",
        fontFamily: "UrbanistRegular",
    },
});

export default DocButton;
