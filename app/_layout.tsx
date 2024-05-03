import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import Counter from "./counter/Counter";
import { Stack } from "expo-router";
import { HeaderShownContext } from "@react-navigation/elements";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="counter/Counter" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
