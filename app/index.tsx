import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {useFonts} from "expo-font"
import Counter from "./counter/Counter";
import { Link } from "expo-router";


export default function App() {

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <Link href={"/Userprofile/userprofile"}>
      <Text className='text-3xl text-darkblue'>Medica App</Text>
      </Link>
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
