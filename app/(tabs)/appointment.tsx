import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen from "../Appointments";

const Appointment = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-slate-50"
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Screen />
    </View>
  );
};

export default Appointment;
