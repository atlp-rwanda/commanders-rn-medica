import { View, Text } from "react-native";
import React from "react";
import { containerStyle, titleStyle } from "../styles/common";
import Button from "../components/button";

const App = () => {
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Medica App</Text>
      <Button title={"Click me"} />
    </View>
  );
};

export default App;
