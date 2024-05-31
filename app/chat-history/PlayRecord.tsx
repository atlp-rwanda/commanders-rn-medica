import { useState, useEffect, useRef } from "react";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Pressable,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayPause from "@/components/PlayPause";
import { useNavigation } from "expo-router";

const PlayRecord = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const videoRef = useRef<Video>(null);
  const timeBarWidth = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const timeBarContainerRef = useRef<View>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          setTotalDuration((status.durationMillis ?? 0) / 1000);
          await AsyncStorage.setItem(
            "videoDuration",
            ((status.durationMillis ?? 0) / 1000).toString()
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  useEffect(() => {
    if (isPlaying) {
      Animated.timing(timeBarWidth, {
        toValue: (currentTime / totalDuration) * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(timeBarWidth, {
        toValue: (currentTime / totalDuration) * 100,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlaying, currentTime, totalDuration]);

  const onLayout = (event: any) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
      videoRef.current.setPositionAsync(0);
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = async (position: number) => {
    const newPosition = (position / containerWidth) * totalDuration;
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(newPosition * 1000);
      setCurrentTime(newPosition);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#EEEEEE",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={require("@/assets/doctors/NDiTiNYA.mp4")}
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded) {
              setTotalDuration((status.durationMillis ?? 0) / 1000);
              setCurrentTime(status.positionMillis / 1000);
            }
          }}
          style={styles.videoPlayer}
        />
        <LinearGradient
          colors={["rgba(24, 26, 32, 0)", "rgba(24, 26, 32, 1)"]}
          style={styles.gradient}
        />
        <View style={styles.overlay}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </Pressable>
          <View style={styles.timeBarContainer}>
            <Pressable
              style={styles.timeBarBackground}
              onPress={(event) => {
                const newPosition = event.nativeEvent.locationX;
                handleSeek(newPosition);
              }}
              onLayout={onLayout}
              ref={timeBarContainerRef}
            >
              <Animated.View
                style={[
                  styles.timeBarForeground,
                  {
                    width: timeBarWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </Pressable>
            <View style={styles.timestampContainer}>
              <Text style={styles.timestampLeft}>
                {formatTime(currentTime)}
              </Text>
              <Text style={styles.timestampRight}>
                {formatTime(totalDuration)}
              </Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <PlayPause title="Stop" onPress={handleStop} isStopButton />
            <PlayPause
              title={isPlaying ? "Pause" : "Play"}
              onPress={handlePlayPause}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#EEEEEE",
  },
  videoPlayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 428,
    zIndex: 2,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 24,
    paddingBottom: 48,
    zIndex: 3,
  },
  backButton: {
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 4,
  },
  timeBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  timeBarBackground: {
    height: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    flex: 1,
  },
  timeBarForeground: {
    height: 8,
    backgroundColor: "#246BFD",
    borderRadius: 4,
  },
  timestampContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 15,
  },
  timestampLeft: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "UrbanistMedium",
  },
  timestampRight: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "UrbanistMedium",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 24,
    paddingBottom: 24,
  },
});

export default PlayRecord;