import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DoctorAppointments() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        }}
      >
        <Stack.Screen name="payments" options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ffffff99",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        }} />
        <Stack.Screen name="review-summary" options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ffffff99",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
