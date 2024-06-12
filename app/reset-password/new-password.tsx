import { useEffect, useState } from "react";
import { supabase } from '../supabase';
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Text } from "@/components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PasswordInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
export default function NewPasswordScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmPasswordRef, setConfirmPasswordRef] = useState<TextInput | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
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
        router.push("/(tabs)"); 
      }, 4000);
    }
  }, [isModalVisible]);
  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
    
      setMessage({ type: "error", text: updateError.message });
    } else {
      setMessage({ type: "success", text: "Password was reset successfully ✅" });
      setTimeout(() => {
        setIsModalVisible(true);
      }, 4000);
    }
  };



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
            onSubmitEditing={() => confirmPasswordRef?.focus()}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <PasswordInput
            placeholder="Confirm Password"
            returnKeyType="done"
            blurOnSubmit={true}
            setRef={setConfirmPasswordRef}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View>
          {message?.type === "error" && (
              <Text className="text-[#913831] text-center font-[UrbanistRegular] text-[18px]">
                {message.text}
              </Text>
            )}
            {message?.type === "success" && (
              <Text className="text-[#4BB543] text-center font-[UrbanistRegular] text-[18px]">
                {message.text}
              </Text>
            )}
          </View>
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
            onPress={ handlePasswordReset }
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
