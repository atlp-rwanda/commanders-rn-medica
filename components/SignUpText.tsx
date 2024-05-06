import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SignUpText = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.greyText]}>Don’t have an account?</Text>
      <Text style={[styles.text, styles.blueText]}>Sign up</Text>
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
