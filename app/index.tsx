import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Counter from "./counter/Counter";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Medica App</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Pressable>
        <Link href="counter/Counter">
          <Text>Click me to test redux</Text>
        </Link>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
