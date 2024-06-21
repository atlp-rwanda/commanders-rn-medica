import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
function Cardscomponent(props: any) {
  const handlePush = () => {
    if (props.action === "Upcoming") {
      router.push({
        pathname: "/Appointments/details/",
        params: { typecall: props.typecall },
      });
    }
  };

  return (
    <View
      style={props.bacColor}
      className="bg-white rounded-3xl px-4 py-4 w-full shadow-md mb-4"
    >
      <View className="flex-row justify-center items-center border-b-2 border-slate-100 pb-3">
        <Image source={{uri:props.imager}} className="w-24 h-24 rounded-xl mr-3" />
        <View className="flex-1">
          <Text className="text-xl font-UrbanistBold mb-3">{props.name}</Text>
          <View className="flex items-center flex-row mb-3">
            <Text className=" font-UrbanistRegular">{props.typecall} - </Text>
            <Text style={props.styles}>{props.action}</Text>
          </View>
          <Text className="font-UrbanistRegular">
            {props.date} | <Text>{props.time}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={handlePush}>
          <Image source={props.imagerr} className="w-12 h-12" />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-3 pt-3">
        <TouchableOpacity
          onPress={props.cancle}
          className="flex-1 rounded-full border border-primary-500 p-2.5"
        >
          <Text className="text-center" style={styles.textsi}>
            {props.chance}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.fact}
          className="flex-1 bg-primary-500 rounded-full p-2.5"
        >
          <Text className="text-center text-white " style={styles.tex}>
            {props.cantchance}
          </Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#246BFD",
  },
});
