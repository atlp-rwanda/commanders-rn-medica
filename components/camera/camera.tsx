import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Touchable from "../common/touchable";
import { SvgXml } from "react-native-svg";
import { cameraOutlined } from "@/assets/icons/camera";
import Button from "../button";

export const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View className="w-[180px] h-[180px] bg-transparent justify-end">
        <ActivityIndicator color={"#246BFD"} />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="w-[180px] h-[180px] bg-transparent justify-end">
        <Text className="text-[18px] font-UrbanistBold text-white my-2 text-center">
          Camera permissions
        </Text>
        <Button title="Grant" rounded />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View className="w-[120px] h-[180px]">
      <CameraView className="flex-1" facing={facing}>
        <Touchable
          className="absolute bottom-2.5 right-2.5"
          onPress={toggleCameraFacing}
        >
          <SvgXml xml={cameraOutlined} />
        </Touchable>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
