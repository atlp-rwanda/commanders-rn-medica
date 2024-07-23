import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { screenbgcolor } from "@/styles/usecolor";
import { router, useFocusEffect } from "expo-router";
import BackIcon from "../../components/BackIcon";
import EmailPasswordInput from "../../components/EmailPasswordInput";
import Or from "../../components/Or";
import RememberMe from "../../components/RememberMe";
import SignUpText from "../../components/SignUpText";
import { SignUpWith } from "../../components/SignUpWith";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { supabase } from "../supabase";
import { useTranslation } from "react-i18next";

const { width: screenWidth } = Dimensions.get("window");

interface Setting {
  id: number;
  title: string;
  value: boolean;
  auth?: boolean;
}

const SignIn = () => {
  const { t } = useTranslation();
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState<boolean>(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

 useFocusEffect(
   useCallback(() => {
     const loadSettings = async () => {
       await loadCredentials();
       await loadRememberMeSetting();
     };

     loadSettings();
   }, [])
 );

  const loadCredentials = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
    } catch (error) {
      console.error("Failed to load credentials", error);
    }
  };

  const loadRememberMeSetting = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem("securitySettings");
      if (storedSettings) {
        const settings: Setting[] = JSON.parse(storedSettings);
        const rememberMeSetting = settings.find(
          (setting) => setting.title === "Remember me"
        );
        if (rememberMeSetting) setRememberMe(rememberMeSetting.value);
      }
    } catch (error) {
      console.error("Failed to load remember me setting", error);
    }
  };

  const saveRememberMeSetting = async (value: boolean) => {
    try {
      const storedSettings = await AsyncStorage.getItem("securitySettings");
      let settings: Setting[] = storedSettings
        ? JSON.parse(storedSettings)
        : [];
      settings = settings.map((setting) =>
        setting.title === "Remember me" ? { ...setting, value } : setting
      );
      await AsyncStorage.setItem("securitySettings", JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save remember me setting", error);
    }
  };

  const saveCredentials = async () => {
    if (rememberMe) {
      try {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      } catch (error) {
        console.error("Failed to save credentials", error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      } catch (error) {
        console.error("Failed to remove credentials", error);
      }
    }
  };

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

  const handleRememberMeChange = (value: boolean) => {
    setRememberMe(value);
    saveRememberMeSetting(value);
  };

  async function signInWithEmail() {
    setLoading(true);
    setError("");

    if (!password && !email) {
      setError(t("signUp.allFieldIsRequired"));
      setLoading(false);
    } 

      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    
    if (!password && !email) {
      setError(t("signUp.allFieldIsRequired"));
      setLoading(false);
    } else if (error) {
      setError(t("signIn.invalidLoginCredentials"));
      setLoading(false);
    } else {
      await saveCredentials();
      router.push("/(tabs)/");
      setLoading(false);
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
          <Text
            style={{
              fontFamily: "UrbanistBold",
              fontSize: 32,
              textAlign: "center",
            }}
          >
            {t("signIn.title")}
          </Text>
          <View style={{ gap: 20, width: "100%" }}>
            <EmailPasswordInput
              icon="email"
              placeholder={t("signIn.emailPlaceholder")}
              value={email}
              onChangeText={handleEmailChange}
            />
            <EmailPasswordInput
              icon="lock"
              placeholder={t("signIn.passwordPlaceholder")}
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
            />
            <RememberMe text={t("signIn.rememberMe")} onValueChange={handleRememberMeChange} />
            <View style={styles.inputContainer}>
              <Button
                title={
                  loading
                    ? t("signIn.signInButtonLoading")
                    : t("signIn.signInButton")
                }
                rounded
                onPress={signInWithEmail}
                disabled={loading}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <Pressable
              style={{ alignItems: "center" }}
              onPress={() => router.push("/reset-password")}
            >
              <Text
                style={{
                  color: "#246BFD",
                  fontFamily: "UrbanistSemiBold",
                  fontSize: 16,
                }}
              >
                {t("signIn.forgotPassword")}
              </Text>
            </Pressable>
          </View>
          <Or text={t("signIn.orContinueWith")} />
          <SignUpWith />
          <SignUpText
            text1={t("signIn.dontHaveAccount")}
            text2={t("signIn.signUpLink")}
            onPress={() => router.push("/signupSignin/SignUp")}
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
  inputContainer: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    transform: [{ translateY: -20 }],
    color: "red",
    fontFamily: "UrbanistSemiBold",
    fontSize: 14,
    textAlign: "center",
    width: "auto",
  },
});

export default SignIn;
