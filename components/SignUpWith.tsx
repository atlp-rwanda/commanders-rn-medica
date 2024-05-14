import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

type iconName = "apple" | "google" | "facebook" | undefined

const SignUpWith = () => {
  const handleFacebookSignUp = () => {
    // Handle Facebook sign-up
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up
  };

  const handleAppleSignUp = () => {
    // Handle Apple sign-up
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFacebookSignUp}>
        <Image source={require("../assets/facebook.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoogleSignUp}>
        <Image source={require("../assets/google.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAppleSignUp}>
        <Image source={require("../assets/apple.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default SignUpWith;
