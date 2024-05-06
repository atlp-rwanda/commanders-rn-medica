import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const RememberMe = () => {
    const [rememberMe, setRememberMe] = useState(false);

     const toggleRememberMe = () => {
       setRememberMe(!rememberMe);
     };
    return (
      <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
        <MaterialIcons
          name={rememberMe ? "check-box" : "check-box-outline-blank"}
          size={24}
          color="#246BFD"
        />
        <Text>Remember me</Text>
      </TouchableOpacity>
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