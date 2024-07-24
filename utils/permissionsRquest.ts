import { Platform, PermissionsAndroid, Permission } from "react-native";

export const PermissionRequest = async () => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      // PERMISSIONS.ANDROID.CAMERA,
      // PERMISSIONS.ANDROID.,
      // PERMISSIONS.ANDROID.,
      // PERMISSIONS.ANDROID.,
    ]);
  }
};
