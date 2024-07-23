import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { Host } from "react-native-portalize";
import { OtpInput } from "react-native-otp-entry";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import {
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { LogBox } from "react-native";
import { register } from "@videosdk.live/react-native-sdk";

LogBox.ignoreAllLogs();
register();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    UrbanistBold: require("../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistMedium: require("../assets/fonts/Urbanist-Medium.ttf"),
    UrbanistRegular: require("../assets/fonts/Urbanist-Regular.ttf"),
    UrbanistSemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem("securitySettings");
      const settings = storedSettings ? JSON.parse(storedSettings) : [];
      const faceIDSetting = settings.find(
        (setting: { title: string }) => setting.title === "Biometric"
      );
      const PIN = settings.find(
        (setting: { title: string }) => setting.title === "PIN"
      );

      if (faceIDSetting && faceIDSetting.value === true) {
        const { success } = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to access the app",
          fallbackLabel: "Use Passcode",
        });

        if (success) {
          setIsAuthenticated(true);
          return;
        }
      } else if (PIN && PIN.value === true) {
        const storedPin = await AsyncStorage.getItem("pin");
        if (storedPin) {
          setShowPinInput(true);
        } else {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Failed to check authentication", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = async () => {
    try {
      const storedPin = await AsyncStorage.getItem("pin");

      if (storedPin === pin) {
        setIsAuthenticated(true);
      } else {
        Alert.alert("Authentication failed", "Invalid PIN entered.");
      }
    } catch (error) {
      console.error("Failed to retrieve PIN from storage", error);
      Alert.alert(
        "Authentication failed",
        "An error occurred while retrieving PIN."
      );
    }
  };

  if (!loaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!loaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isAuthenticated && showPinInput) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center", marginHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: "UrbanistSemiBold",
                fontSize: 20,
                marginBottom: 50,
              }}
            >
              Authenticate to access the app
            </Text>

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
            <TouchableOpacity
              style={{
                backgroundColor: "#246BFD",
                borderRadius: 20,
                paddingVertical: 12,
                paddingHorizontal: 32,
                marginTop: 50,
              }}
              onPress={handlePinSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text
                  style={{
                    fontFamily: "UrbanistBold",
                    fontSize: 16,
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Host>
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: Platform.select({ android: "dark" }),
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="counter/Counter" />
            <Stack.Screen
              name="Userprofile/userprofile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Userprofile/createpin"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Userprofile/setfingerprint"
              options={{ headerShown: false }}
            />
          </Stack>
        </Host>
      </GestureHandlerRootView>
    </Provider>
  );
}
