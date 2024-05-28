import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppointmentsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            backgroundColor: "#fff",
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        }}
      ></Stack>
    </GestureHandlerRootView>
  );
}
