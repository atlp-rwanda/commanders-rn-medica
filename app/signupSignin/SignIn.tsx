import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { screenbgcolor } from "@/styles/usecolor";
import { router } from "expo-router";
import BackIcon from "../../components/BackIcon";
import EmailPasswordInput from "../../components/EmailPasswordInput";
import Or from "../../components/Or";
import RememberMe from "../../components/RememberMe";
import SignUpText from "../../components/SignUpText";
import SignUpWith from "../../components/SignUpWith";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { supabase } from "../supabase";

const SignIn = () => {
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState<boolean>(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleEmailActiveChange = (isActive: boolean) => {
    setIsEmailActive(isActive);
  };

  const handlePasswordActiveChange = (isActive: boolean) => {
    setIsPasswordActive(isActive);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailFilled(!!text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordFilled(!!text);
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      router.push("/(tabs)/");
    }
  }

  return (
    <SafeAreaView style={areaView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[containerStyle, screenbgcolor, styles.container]}>
          <BackIcon
            imageSource={require("../../assets/Account.png")}
            onPress={router.back}
          />
          <Text style={{ fontFamily: "UrbanistBold", fontSize: 32 }}>
            Login to Your Account
          </Text>
          <View style={{ rowGap: 20, width: "100%" }}>
            <EmailPasswordInput
              icon="email"
              placeholder="Email"
              onActiveChange={handleEmailActiveChange}
              value={email}
              onChangeText={handleEmailChange}
            />
            <EmailPasswordInput
              icon="lock"
              placeholder="Password"
              secureTextEntry
              onActiveChange={handlePasswordActiveChange}
              value={password}
              onChangeText={handlePasswordChange}
              isFilled={isPasswordFilled}
            />
            <RememberMe />
            <Button
              title="Sign in"
              rounded
              disabled={
                loading
              }
              onPress={signInWithEmail}
            />
            <Pressable
              style={{ alignItems: "center" }}
              onPress={()=>
                router.push("/reset-password/")
              }
            >
              <Text
                style={{
                  color: "#246BFD",
                  fontFamily: "UrbanistSemiBold",
                  fontSize: 16,
                }}
              >
                Forgot the password?
              </Text>
            </Pressable>
          </View>
          <Or text="or continue with" />
          <SignUpWith />
          <SignUpText
            text1="Don’t have an account?"
            text2="Sign up"
            onPress={() => {
              router.push("/signupSignin/SignUp");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    gap: 24,
    padding: 24,
  },
  errorText: {
    color: "red",
    fontFamily: "UrbanistSemiBold",
    fontSize: 16,
  },
});

export default SignIn;
