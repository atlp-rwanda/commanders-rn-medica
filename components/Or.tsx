import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface OrProps {
  text: string;
}

const Or: React.FC<OrProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    marginHorizontal: 10,
    fontFamily: "UrbanistSemiBold",
    color: "#757575",
    fontSize: 18
  },
});

export default Or;
