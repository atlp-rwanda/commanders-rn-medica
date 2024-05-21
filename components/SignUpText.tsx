import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface SignUpTextProps {
  text1: string;
  text2: string;
  onPress: () => void; 
}

const SignUpText = ({ text1, text2, onPress }: SignUpTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.greyText]}>{text1}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, styles.blueText]}>{text2}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginRight: 5,
  },
  greyText: {
    color: "#9E9E9E",
    fontFamily: "UrbanistRegular",
  },
  blueText: {
    color: "#246BFD",
    fontFamily: "UrbanistSemiBold",
  },
});

export default SignUpText;
