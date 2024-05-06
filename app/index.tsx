import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Medica App</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Pressable>
        <Link href="/(tabs)">Tabs</Link>
        <Link href="/counter/Counter">
          <Text>Click me to test redux</Text>
        </Link>
      </Pressable>
      <Link href="/reset-password/" style={{ marginTop: 20 }}>
        Forgot Password
      </Link>
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
