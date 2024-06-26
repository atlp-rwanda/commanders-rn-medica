import { back } from "@/assets/icons/userprofile/icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from "react-native-svg";
import { supabase } from "../supabase";

export default function CreatePin() {
  const [pin, setPin] = useState<string>("");
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
        router.push("/Userprofile/setfingerprint");
      }
    } else {
      setError("User not found. Please log in again.");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView
        className="flex-1 pb-12"
        bounces={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="my-4 flex-row gap-x-2 mt-10 ml-2">
          <SvgXml xml={back} onPress={() => router.back()} />
          <Text className="text-xl text-black font-UrbanistSemiBold">
            Create New Pin
          </Text>
        </View>
        <View>
          <Text className="text-lg text-center mt-20 px-5 font-UrbanistRegular">
            Add a PIN number to make your account more secure
          </Text>
        </View>
        <View className="flex-row justify-center items-center flex-1">
          <OtpInput
            numberOfDigits={4}
            secureTextEntry={true}
            onTextChange={(code) => setPin(code)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
