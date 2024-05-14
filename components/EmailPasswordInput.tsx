import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconName = "email" | "lock" | undefined;

interface EmailPasswordInputProps {
  secureTextEntry?: boolean;
  icon: IconName;
  placeholder: string;
  onActiveChange?: (isActive: boolean) => void;
}

const EmailPasswordInput = ({
  icon,
  placeholder,
  secureTextEntry,
  onActiveChange,
}: EmailPasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
      <MaterialIcons
        name={icon}
        size={24}
        color={isActive ? "#246BFD" : "gray"}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color={isActive ? "#246BFD" : "gray"}
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
    width: "80%",
    height: 60,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  activeContainer: {
    borderColor: "#246BFD",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default EmailPasswordInput;
