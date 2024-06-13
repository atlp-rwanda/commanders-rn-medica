import { back } from "@/assets/icons/userprofile/icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "expo-router";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { supabase } from "../supabase";
import { useState } from "react";

export default function CreatePin() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setError("Invalid PIN, Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setError("Failed to retrieve user. Please log in again.");
      setLoading(false);
      return;
    }

    if (user) {
      const userId = user.id;

      const { error: insertError } = await supabase
        .from("patient")
        .update({ pin })
        .eq("id", userId);

      setLoading(false);

      if (insertError) {
        setError("Failed to save PIN. Please try again.");
      } else {
        navigation.navigate("Userprofile/setfingerprint" as never);
      }
    } else {
      setError("User not found. Please log in again.");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <View className="my-4 flex-row gap-x-2 mt-10 ml-2">
          <SvgXml xml={back} onPress={() => navigation.goBack()} />
          <Text className="text-xl text-black font-UrbanistSemiBold">
            Create New Pin
          </Text>
        </View>
        <View>
          <Text className="text-lg text-center mt-20 px-5 font-UrbanistRegular">
            Add a PIN number to make your account more secure
          </Text>
        </View>
        <View className="flex-row justify-center">
          <OTPInputView
            style={{ width: "70%", height: 200 }}
            pinCount={4}
            autoFocusOnLoad={false}
            secureTextEntry={true}
            codeInputFieldStyle={{
              width: 60,
              height: 50,
              marginHorizontal: 5,
              borderWidth: 1,
              color: "black",
              fontSize: 40,
              borderRadius: 10,
              borderColor: "#00000020",
              fontFamily: "UrbanistBold",
              textAlign: "center",
              backgroundColor: "#FAFAFA",
            }}
            codeInputHighlightStyle={{
              borderColor: "#246BFD",
              borderWidth: 1,
              backgroundColor: "#246BFD14",
            }}
            onCodeFilled={(code) => setPin(code)}
          />
        </View>
        <View>
          <TouchableOpacity
            className="bg-lightblue w-7/8 rounded-3xl py-3 mt-2 mx-5"
            onPress={handlePinSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-def text-base text-center font-UrbanistBold">
                Continue
              </Text>
            )}
          </TouchableOpacity>
          {error ? (
            <Text
              style={{
                marginTop: 10,
                color: "red",
                fontFamily: "UrbanistSemiBold",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}