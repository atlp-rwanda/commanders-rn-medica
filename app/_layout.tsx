import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    UrbanistBold: require("../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistMedium: require("../assets/fonts/Urbanist-Medium.ttf"),
    UrbanistRegular: require("../assets/fonts/Urbanist-Regular.ttf"),
    UrbanistSemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Host>
            <Stack screenOptions={{ headerShown: false }}>
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
    </I18nextProvider>
  );
}
