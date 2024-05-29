
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
function Cardscomponent(props: any) {
  const [fontLoaded] = useFonts({
    UrbanistBold: require("../../../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistRegular: require("../../../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../../../assets/fonts/Urbanist-SemiBold.ttf"),
    UrbanistMedium: require("../../../assets/fonts/Urbanist-Medium.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <View
      style={props.bacColor}
      className='bg-white rounded-3xl flex items-center pt-3  pb-3 w-full shadow-md mb-4'
    >
      <View className="flex flex-row gap-4 justify-center items-center border-b-2 border-slate-100 pb-3">
        <Image source={props.imager} className="w-3/12 h-24 rounded-xl" />
        <View>
          <Text className="text-[18px] font-UrbanistBold pb-2">
            {props.name}
          </Text>
          <View className="flex items-center justify-center flex-row">
            <Text className="text-[12px] pb-3 pt-3 font-UrbanistRegular">
              {props.typecall} -{" "}
            </Text>
            <Text style={props.stile}>{props.action}</Text>
          </View>
          <Text className="font-UrbanistRegular pt-3 text-[12px]">
            {props.date} | <Text>{props.time}</Text>
          </Text>
        </View>
        <TouchableOpacity>
          <Image source={props.imagerr} className="w-12 h-12" />
        </TouchableOpacity>
      </View>
      <View style={styles.botfles}>
        <TouchableOpacity onPress={props.cancle}>
          <View style={styles.botnlef}>
            <Text className="text-center" style={styles.textsi}>
              {props.chance}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.fact}>
          <View style={styles.botn}>
            <Text className="text-center text-white " style={styles.tex}>
              {props.cantchance}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Cardscomponent;
const styles = StyleSheet.create({
  buttobok: {
    color: "#246BFD",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 2,
    borderColor: "#246BFD",
  },
  butleave: {
    backgroundColor: "#246BFD",
    color: "#fff",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 4,
    paddingBottom: 4,
  },
  botfles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  botn: {
    backgroundColor: "#246BFD",
    width: 168,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  textsi: {
    fontSize: 14,
    fontFamily: "UrbanistSemiBold",
    color: "#246BFD",
  },
  tex: {
    fontSize: 12,
    fontFamily: "UrbanistBold",
  },
  botnlef: {
    width: 168,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#246BFD",
  },
});