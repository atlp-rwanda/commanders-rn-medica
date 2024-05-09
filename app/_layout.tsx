import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

export default function RootLayout() {
  const [loaded] = useFonts({
    "UrbanistBold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "UrbanistMedium": require("../assets/fonts/Urbanist-Medium.ttf"),
    "UrbanistRegular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "UrbanistSemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="counter/Counter" />
        <Stack.Screen name="Userprofile/userprofile"  options={{ headerShown: false }} />
        <Stack.Screen name="Userprofile/createpin"  options={{ headerShown: false }} />
        <Stack.Screen name="Userprofile/setfingerprint" options={{headerShown:false}}/>
      </Stack>
    </Provider>
  );
}
