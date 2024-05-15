import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {useFonts} from "expo-font"
import Counter from "./counter/Counter";
import { Link } from "expo-router";
import OnBoarding from './onboarding';

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Urbanist:require("../assets/fonts/Urbanist.ttf")});
  //   if(!fontsLoaded){
  //     return null;
  //   }
  return (
    <OnBoarding />
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