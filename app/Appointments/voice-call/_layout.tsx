import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VoiceCallsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        }}
      >
        <Stack.Screen
          name="call"
          options={{
            contentStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="session-ended"
          options={{
            contentStyle: {
              backgroundColor: "#fff",
              paddingTop: insets.top,
              paddingLeft: insets.left,
              paddingRight: insets.right,
              paddingBottom: insets.bottom,
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
