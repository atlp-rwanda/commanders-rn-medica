import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Urbanist:require("../assets/fonts/Urbanist.ttf")});
  //   if(!fontsLoaded){
  //     return null;
  //   }
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

// import React from "react";
// import DoctorDetails from "./Doctors/favoriteDoctors";
// export default function App(){
//   return (<DoctorDetails/>)
// }