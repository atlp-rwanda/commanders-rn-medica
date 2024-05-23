import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";

import { areaView, containerStyle, titleStyle } from "../../styles/common";
import Button from "../../components/button";
import SignUpText from "../../components/SignUpText";
import BackIcon from "../../components/BackIcon";
import EmailPasswordInput from "../../components/EmailPasswordInput";
import RememberMe from "../../components/RememberMe";
import SignUpWith from "../../components/SignUpWith";
import Or from "../../components/Or";
import { router } from "expo-router";
import { screenbgcolor } from "@/styles/usecolor";

const SignIn = () => {
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState<boolean>(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>(false);

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
              disabled={
                isEmailActive ||
                isEmailFilled ||
                isPasswordActive ||
                isPasswordFilled
              }
              onPress={() => {
                router.push("/(tabs)/");
              }}
            />
            <Pressable
              style={{ alignItems: "center" }}
              onPress={() => {
                router.push("/reset-password/");
              }}
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
  title: {
    fontSize: 48,
    fontFamily: "UrbanistBold",
  },
});

export default SignIn;
