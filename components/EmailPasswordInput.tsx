import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconName = "email" | "lock";

interface EmailPasswordInputProps {
  secureTextEntry?: boolean;
  icon: IconName;
  placeholder: string;
  onActiveChange?: (isActive: boolean) => void;
  value: string;
  onChangeText: (text: string) => void;
  isFilled?: boolean;
}

const EmailPasswordInput = ({
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  onActiveChange,
  isFilled,
}: EmailPasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const emailIcon = isActive
    ? require("../assets/Email-active.png")
    : require("../assets/Email.png");
  const lockIcon = isActive
    ? require("../assets/Lock-active.png")
    : isFilled
    ? require("../assets/Lock-filled.png")
    : require("../assets/Lock.png");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsActive(true);
    if (onActiveChange) {
      onActiveChange(true);
    }
  };

  const handleBlur = () => {
    setIsActive(false);
    if (onActiveChange) {
      onActiveChange(false);
    }
  };

  return (
    <View style={[styles.inputContainer, isActive && styles.activeContainer]}>
      <Image
        source={icon === "email" ? emailIcon : lockIcon}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          {
            fontSize: 14,
            color: isActive ? "#212121" : isFilled ? "#212121" : "#9E9E9E",
            fontFamily: value ? "UrbanistSemiBold" : "UrbanistRegular",
          },
        ]}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9E9E9E"
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={20}
            color={isActive ? "#246BFD" : isFilled ? "#212121" : "#9E9E9E"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#FAFAFA",
  },
  activeContainer: {
    borderColor: "#246BFD",
    backgroundColor: "#EEF4FF",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default EmailPasswordInput;