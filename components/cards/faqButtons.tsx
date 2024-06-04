import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";

interface faqButtonProps {
    selectedCategory: string;
    handleCategorySelect: (category: string) => void;
}
const FaqButtons: React.FC<faqButtonProps> = ({ selectedCategory, handleCategorySelect }) => {
    const getButtonStyle = (category: any) => {
        return selectedCategory === category ? styles.activeBtn : styles.regularBtn;
    };

    const getButtonTextStyle = (category: any) => {
        return selectedCategory === category ? styles.activeText : styles.btnText;
    };

    return (
        <View style={styles.btns}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={getButtonStyle("general")} onPress={() => handleCategorySelect("general")}>
                    <Text style={getButtonTextStyle("general")}>General</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("account")} onPress={() => handleCategorySelect("account")}>
                    <Text style={getButtonTextStyle("account")}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("service")} onPress={() => handleCategorySelect("service")}>
                    <Text style={getButtonTextStyle("service")}>Service</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle("payment")} onPress={() => handleCategorySelect("payment")}>
                    <Text style={getButtonTextStyle("payment")}>Payment</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default FaqButtons;

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
