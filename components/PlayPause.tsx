import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface PlayPauseProps {
  title: string;
  onPress: () => void;
  isStopButton?: boolean;
}

const PlayPause: React.FC<PlayPauseProps> = ({
  title,
  onPress,
  isStopButton,
}) => {
    return (
    <Pressable
      style={[
        styles.button,
        isStopButton ? styles.stopButton : styles.pauseButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          isStopButton ? styles.buttonTextStop : styles.buttonTextPause,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 56,
    borderRadius: 28,
  },
  stopButton: {
    backgroundColor: "#ffffff",
  },
  pauseButton: {
    backgroundColor: "#246BFD",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "UrbanistBold",
  },
  buttonTextStop: {
    color: "#246BFD",
  },
  buttonTextPause: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "UrbanistBold",
  },
});

export default PlayPause;
