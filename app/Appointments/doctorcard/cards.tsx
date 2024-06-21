import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Cardcomponent(props: any) {
  const handlePush = () => {
    switch (props.typecall) {
      case "Voice call":
        if (props.action === "Upcoming") {
          router.push("/Appointments/voice-call/");
        }
        break;
      default:
        break;
    }
  };

  return (
    <View
      className="bg-white rounded-3xl flex flex-row px-4 py-5 items-center shadow-md mb-4"
      style={styles.shadow}
    >
      <Image source={{uri:props.imager}} className="w-24 h-24 rounded-xl mr-3" />
      <View className="flex-1">
        <Text className="text-xl font-UrbanistBold mb-3">{props.name}</Text>
        <View className="flex items-center flex-row mb-3">
          <Text className="font-UrbanistRegular">{props.typecall} - </Text>
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
  );
}
export default Cardcomponent;
const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
  },
});
