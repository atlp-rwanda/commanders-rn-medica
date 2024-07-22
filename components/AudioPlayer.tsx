import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { SvgXml } from "react-native-svg";
import { play } from "@/assets/icons/playBtn";
import { pauseIcon, stopIcon } from "@/assets/icons/file";

interface AudioPlayerProps {
  source: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ source }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadAudio();
    return () => {
      unloadAudio();
    };
  }, []);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: source },
        { shouldPlay: false }
      );
      setSound(sound);
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? 0);
          setPosition(status.positionMillis ?? 0);
          setIsPlaying(status.isPlaying);
        }
      });
    } catch (error) {
      console.error("Error loading audio", error);
    }
  };

  const unloadAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const playPauseAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setPosition(0);
    }
  };

  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={seekAudio}
      />
      <Text>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
      <SvgXml xml={!isPlaying ? play : pauseIcon} onPress={playPauseAudio} />
      <SvgXml xml={stopIcon} onPress={stopAudio} />

      {/* <Button title={isPlaying ? "Pause" : "Play"} onPress={playPauseAudio} />
      <Button title="Stop" onPress={stopAudio} /> */}
    </View>
  );
};

const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 20,
  },
  slider: {
    width: "50%",
    height: 40,
  },
});

export default AudioPlayer;
