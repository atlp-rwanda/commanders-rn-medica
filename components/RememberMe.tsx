import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Image } from "react-native";

const RememberMe = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Pressable onPress={toggleRememberMe} style={styles.checkbox}>
      <Image
        source={
          rememberMe
            ? require("../assets/checked.png")
            : require("../assets/unchecked.png")
        }
        style={{ width: 24, height: 24 }}
      />
      <Text style={{ fontFamily: "UrbanistSemiBold", fontSize: 14 }}>
        Remember me
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
});

export default RememberMe;
