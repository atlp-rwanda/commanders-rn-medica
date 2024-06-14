import { NavigationHeader } from "@/components/NavigationHeader";
import { router, useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { OtpInput } from "react-native-otp-entry";

export default function PinScreen() {
  const dimensions = useWindowDimensions();
  const { redirect } = useLocalSearchParams<{ redirect: string }>();
  return (
    <KeyboardAvoidingView
      className="flex-1 px-8"
      contentContainerStyle={{ flex: 1 }}
      behavior="padding"
      style={{ maxHeight: dimensions.height }}
    >
      <NavigationHeader title="Enter Your PIN" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-lg mt-20 text-center font-UrbanistRegular">
          Ente your PIN to confirm appointment
        </Text>
        <View className="flex-row justify-center items-center mx-auto">
          <OtpInput
            numberOfDigits={4}
            secureTextEntry={true}
            onTextChange={(code) => console.log(code)}
            theme={{
              containerStyle: {
                width: "auto",
                height: 50,
                marginHorizontal: "auto",
              },
              pinCodeContainerStyle: {
                width: 60,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 8,
                borderColor: "#00000020",
                backgroundColor: "#FAFAFA",
                alignItems: "center",
                justifyContent: "center",
              },
              focusedPinCodeContainerStyle: {
                borderColor: "#246BFD",
                borderWidth: 1,
                backgroundColor: "#246BFD14",
              },
              pinCodeTextStyle: {
                color: "black",
                fontSize: 80,
                fontFamily: "UrbanistBold",
                textAlign: "center",
                lineHeight: 70,
              },
            }}
          />
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 rounded-3xl py-3 mt-2"
          onPress={() => {
            if (redirect) {
              router.replace(redirect);
            }
          }}
        >
          <Text className="text-def text-base text-center font-UrbanistBold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
