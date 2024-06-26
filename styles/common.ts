import {
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";


export const containerStyle: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

export const titleStyle: TextStyle = {
  fontSize: 24,
};

export const textStyle: TextStyle = {
  fontSize: 18,
};

export const btnStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  backgroundColor: "#246BFD",
  width: "100%",
  height: 60,
  rowGap: 20,
};

export const areaView: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};
