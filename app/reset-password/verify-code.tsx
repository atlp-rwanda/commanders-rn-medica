import { NavigationHeader } from "@/components/Header";
import { router, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
type input = TextInput | null;

export default function VerifyCodeScreen() {
  const inputs: input[] = [];
  const [code, setCode] = useState([]);
  const { email } = useGlobalSearchParams();
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [countdown, setCountdown] = useState<number>(3600);
  const [canResend, setCanResend] = useState<boolean>(false);
  const[loading, setLoading]=useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);
  const textChanged = (index: number, text: string) => {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = (text || "") as never;

      return newCode;
    });
  };

  useEffect(() => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const jumpToInput = (event: TextInputKeyPressEventData, index: number) => {
    if (event.key === "Backspace") {
      if (index > 0) inputs[index - 1]?.focus();
    } else {
      if (index < inputs.length - 1) inputs[index + 1]?.focus();
    }
  };
  const verifyCode = async () => {
    setLoading(true)
    const otpCode = code.join("");
  
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otpCode, type: "recovery" });

    if (error) {
      setMessage({ type: "error", text: "Invalid otp" });
    } else {
      setMessage({ type: "success", text: "✅ Valid otp provided!" });
      setTimeout(() => {
        router.push("reset-password/new-password");
      }, 3000);
    }
    setLoading(false)
  };
  const resendCode = () => {
    if (canResend) {
      setCountdown(3600);
      setCanResend(false);
    } 
  };
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return ` ${minutes}m ${remainingSeconds}s`;
  };
  return (
    <View style={styles.container}>
     <NavigationHeader title="OTP Code Verification" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingBottom: 32,
          }}
        >
          <View style={{ flex: 1 }} />
          <View>
            <Text style={styles.subtitle}>
              Code has been sent to {email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 32,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <OTPCodeInput
                key={index}
                value={code[index] || ""}
                controller={(ref) => (inputs[index] = ref)}
                onChangeText={textChanged.bind(null, index)}
                onKeyPress={(e) => jumpToInput(e, index)}
                onFocus={() => setFocusedInputIndex(index)}
                onBlur={() => setFocusedInputIndex(null)}
                isFocused={focusedInputIndex === index}
              />
            ))}
          </View>
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

            <Text style={styles.subtitle} onPress={resendCode}
              disabled={!canResend}>
               code will expire in <Text style={styles.primaryText}>{formatTime(countdown)}</Text> 
            </Text>

          
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            className="bg-lightblue p-4 my-5 rounded-full shadow-sm shadow-lightblue"
            onPress={verifyCode}
            disabled={loading}
          >
             {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-bold">Continue</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const OTPCodeInput = ({
  value,
  controller,
  onChangeText,
  onKeyPress,
  onFocus,
  onBlur,
  isFocused,
}: {
  value: string;
  controller: (input: input) => void;
  onChangeText: (text: string) => void;
  onKeyPress: (event: TextInputKeyPressEventData) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
}) => {
  return (
    <TextInput
      maxLength={1}
      value={value}
      ref={(input) => {
        controller(input);
      }}
      blurOnSubmit={false}
      style={[styles.input, isFocused && styles.focusedInput]}
      keyboardType="number-pad"
      onChangeText={onChangeText}
      onKeyPress={(e) => onKeyPress(e.nativeEvent)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 12,
  },
  primaryText: {
    color: "#246BFD",
  },
  input: {
    width: 48,
    height: 48,
    margin: 4,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    backgroundColor: "#F4F4F4",
  },
  focusedInput: {
    borderColor: "#246BFD",
    backgroundColor: "rgba(36, 107, 253, 0.08)"
  },
});