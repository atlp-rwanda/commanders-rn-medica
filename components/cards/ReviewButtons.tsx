import React, { useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View, Image, TouchableOpacity, Text ,ScrollView} from "react-native";


export default function ReviewButtons() {
    const [selectedRating, setSelectedRating] = useState(null);

    let [fontsLoaded] = useFonts({
        UrbanistBold: require("../../assets/fonts/Urbanist-Bold.ttf"),
        UrbanistMedium: require("../../assets/fonts/Urbanist-Regular.ttf"),
        UrbanistSemiBold: require("../../assets/fonts/Urbanist-SemiBold.ttf"),
        UrbanistRegular: require("../../assets/fonts/Urbanist-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleRatingSelect = (rating:any) => {
        setSelectedRating(rating);
    };

    const getButtonStyle = (rating:any) => {
        return selectedRating === rating ? styles.activeBtn : styles.regularBtn;
    };

    const getButtonTextStyle = (rating:any) => {
        return selectedRating === rating ? styles.activeText : styles.btnText;
    };
const getImage=(rating:any)=>{
    return selectedRating === rating ? require("../../assets/doctors/whitestar.png") : require("../../assets/doctors/astar.png");
}
    return (
 
        <View style={styles.btns}>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={getButtonStyle("all")} onPress={() => handleRatingSelect("all")}>
                <Text style={getButtonTextStyle("all")}><Image source={getImage("all")} style={styles.images}/> All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getButtonStyle(5)} onPress={() => handleRatingSelect(5)}>
                <Text style={getButtonTextStyle(5)}><Image source={getImage(5)} style={styles.images}/>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getButtonStyle(4)} onPress={() => handleRatingSelect(4)}>
                <Text style={getButtonTextStyle(4)}><Image source={getImage(4)} style={styles.images}/> 4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getButtonStyle(3)} onPress={() => handleRatingSelect(3)}>
                <Text style={getButtonTextStyle(3)}> <Image source={getImage(3)} style={styles.images}/> 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getButtonStyle(2)} onPress={() => handleRatingSelect(2)}>
                <Text style={getButtonTextStyle(2)}> <Image source={getImage(2)} style={styles.images}/> 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getButtonStyle(1)} onPress={() => handleRatingSelect(1)}>
                <Text style={getButtonTextStyle(1)}> <Image source={getImage(1)} style={styles.images}/> 1</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
       
    );
}

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
    images: {
        width: 16,
        height: 16,
    },
});
