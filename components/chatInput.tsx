import { Camera } from "@/components/camera/camera";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

import {
  audioIcon,
  cameraIcon,
  documentIcon,
  emoji,
  fileIcon,
  focusCamera,
  focusEmoji,
  focusFile,
  gallery,
} from "@/assets/icons/file";
import { Text } from "./ThemedText";

interface Props {
  value?: string;
  autoFocus?: boolean;
  onChangeText?: (text: string) => void;
}

export const ChatInput: React.FC<Props> = ({
  value,
  autoFocus,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [document, setDocument] = useState(null);
  const [audio, setAudio] = useState(null);
  const [modalCamera, setModalCamera] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

  }
  const openCamera = () => {
    setModalCamera(!modalCamera);
  }
  const handleAudioPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });
  };

  return (
    <View
      style={[
        {
          borderColor: isFocused ? "#007AFF" : "#F5F5F5",
          backgroundColor: isFocused ? "rgba(36, 107, 253, 0.08)" : "#F5F5F5",
        },
      ]}
      className={`bg-whiteSmoke w-full flex-row justify-between items-center px-3 py-4 rounded-2xl border`}
    >
      <TouchableOpacity activeOpacity={0.8} style={styles.icon}>
        <SvgXml xml={isFocused ? focusEmoji : emoji} />
      </TouchableOpacity>
      <TextInput
        value={value}
        autoFocus={autoFocus}
        placeholder="Type a message.... "
        placeholderTextColor="#BDBDBD"
        onChangeText={onChangeText}
        returnKeyType="search"
        style={[styles.input, { color: isFocused ? "#000" : "#212121" }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View className="flex-1 justify-end mb-[100px] px-6 py-2">
            <View
              className="bg-white rounded-3xl px-6 py-8 shadow-md"
              style={{
                elevation: 10,
                shadowColor: "rgba(4, 6, 15, 0.5)",
                shadowRadius: 10,
                shadowOpacity: 0.2,
              }}
            >
              <View className="flex-row items-center">
                <View className="flex-1 items-center">
                  <TouchableOpacity onPress={handleDocumentPicker}>
                    <SvgXml xml={documentIcon} width={65} height={65} />
                    <Text className="mt-3 text-center font-UrbanistSemiBold">
                      Document
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 items-center">
                  <TouchableOpacity onPress={handleImagePicker}>
                    <SvgXml xml={gallery} width={65} height={65} />
                    <Text className="mt-3 text-center font-UrbanistSemiBold">
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 items-center">
                  <TouchableOpacity onPress={handleAudioPicker}>
                    <SvgXml xml={audioIcon} width={65} height={65} />
                    <Text className="mt-3 text-center font-UrbanistSemiBold">
                      Audio
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.icon}
        onPress={toggleModal}
      >
        <SvgXml xml={isFocused ? focusFile : fileIcon} />
      </TouchableOpacity>
      <Modal
        visible={modalCamera}
        animationType="fade"
        transparent={true}
        onRequestClose={openCamera}>
        <TouchableWithoutFeedback onPress={() => setModalCamera(false)}>
          <View className="flex-1  justify-center items-center">
            <Camera />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={openCamera}>
        <SvgXml xml={isFocused ? focusCamera : cameraIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Urbanist-Regular",
    backgroundColor: "transparent",
    borderRadius: 28,
    paddingRight: 10,
  },
});
