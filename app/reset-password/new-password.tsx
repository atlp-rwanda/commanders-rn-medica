import { PasswordInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NewPasswordScreen() {
  const [isChecked, setIsChecked] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmPasswordRef, setConfirmPasswordRef] =
    useState<TextInput | null>(null);

  const rotateValue = new Animated.Value(0);
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    if (isModalVisible) {
      spin();
      setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require("@/assets/images/forgot-password/success-frame.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Congratulation</Text>
            <Text style={styles.modalText}>
              Your account is ready to use. You will be redirected to the Home
              page in a few seconds.
            </Text>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Image
                source={require("@/assets/images/forgot-password/loading-frame.png")}
                style={styles.modalLoading}
              />
            </Animated.View>
          </View>
        </View>
      </Modal>
      <View style={[styles.container, { zIndex: 1, backgroundColor: "#fff" }]}>
        <NavigationHeader title="Create New Password" />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { flex: 1, paddingBottom: 48 },
          ]}
        >
          <Image
            source={require("@/assets/images/forgot-password/frame-2.png")}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>Create Your New Password</Text>
          </View>
          <PasswordInput
            placeholder="Password"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              console.log("Next");
              confirmPasswordRef?.focus();
            }}
          />
          <PasswordInput
            placeholder="Confirm Password"
            returnKeyType="done"
            blurOnSubmit={true}
            setRef={setConfirmPasswordRef}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              style={styles.checkbox}
              onValueChange={setIsChecked}
              color={isChecked ? "#246BFD" : "#BDBDBD"}
            />
            <Text style={styles.checkboxText}>Remember Me</Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            className="bg-lightblue p-4 my-5 rounded-full shadow-sm shadow-lightblue"
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <Text className="text-white text-center font-bold">Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
  },
  modalImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
    objectFit: "contain",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#246BFD",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  modalLoading: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "contain",
    marginVertical: 28,
  },
  title: {
    fontSize: 18,
    marginVertical: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    gap: 8,
  },
  checkbox: {
    borderRadius: 6,
  },
  checkboxText: {
    fontSize: 16,
  },
  button: {
    borderRadius: 36,
    paddingVertical: 18,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },
});
