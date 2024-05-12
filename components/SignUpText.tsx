import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface SignUpTextProps {
  text1: string;
  text2: string;
}

const SignUpText = ({ text1, text2 }: SignUpTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.greyText]}>{ text1 }</Text>
      <Text style={[styles.text, styles.blueText]}>{ text2 }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 5,
  },
  greyText: {
    color: "#9E9E9E",
  },
  blueText: {
    color: "#246BFD",
  },
});

export default SignUpText;
