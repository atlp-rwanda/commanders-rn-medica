import { title } from "process";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

interface RememberMeProps {
  text: string
}

const RememberMe = ({text}: RememberMeProps) => {
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
      <Text style={{ fontFamily: "UrbanistSemiBold", fontSize: 15 }}>
        {text}
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
