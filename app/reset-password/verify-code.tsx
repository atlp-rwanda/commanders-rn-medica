import { NavigationHeader } from "@/components/NavigationHeader";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type input = TextInput | null;

export default function VerifyCodeScreen() {
  const inputs: input[] = [];
  const [code, setCode] = useState([]);

  const textChanged = (index: number, text: string) => {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = (text || "") as never;

      return newCode;
    });
  };

  const jumpToInput = (event: TextInputKeyPressEventData, index: number) => {
    if (event.key === "Backspace") {
      if (index > 0) inputs[index - 1]?.focus();
    } else {
      if (index < inputs.length - 1) inputs[index + 1]?.focus();
    }
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
              Code has been sent to +1 111 ******99
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 32,
            }}
          >
            <OTPCodeInput
              value={code[0]}
              controller={(ref) => (inputs[0] = ref)}
              onChangeText={textChanged.bind(null, 0)}
              onKeyPress={(e) => jumpToInput(e, 0)}
            />
            <OTPCodeInput
              value={code[1]}
              controller={(ref) => (inputs[1] = ref)}
              onChangeText={textChanged.bind(null, 1)}
              onKeyPress={(e) => jumpToInput(e, 1)}
            />
            <OTPCodeInput
              value={code[2]}
              controller={(ref) => (inputs[2] = ref)}
              onChangeText={textChanged.bind(null, 2)}
              onKeyPress={(e) => jumpToInput(e, 2)}
            />
            <OTPCodeInput
              value={code[3]}
              controller={(ref) => (inputs[3] = ref)}
              onChangeText={textChanged.bind(null, 3)}
              onKeyPress={(e) => jumpToInput(e, 3)}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>
              Resend code in <Text style={styles.primaryText}>55</Text> s
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            className="bg-lightblue p-4 my-5 rounded-full shadow-sm shadow-lightblue"
            onPress={() => {
              router.push("/reset-password/new-password");
            }}
          >
            <Text className="text-white text-center font-bold">Continue</Text>
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
}: {
  value: string;
  controller: (input: input) => void;
  onChangeText: (text: string) => void;
  onKeyPress: (event: TextInputKeyPressEventData) => void;
}) => {
  return (
    <TextInput
      maxLength={1}
      value={value}
      ref={(input) => {
        controller(input);
      }}
      blurOnSubmit={false}
      style={styles.input}
      keyboardType="number-pad"
      onChangeText={onChangeText}
      onKeyPress={(e) => onKeyPress(e.nativeEvent)}
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
    backgroundColor: "#F4F4F4",
  },
});
