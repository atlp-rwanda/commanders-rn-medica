import { useState } from "react";
import {
  Dimensions,
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
import { SignUpWith } from "../../components/SignUpWith";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { supabase } from "../supabase";
import { useTranslation } from "react-i18next";


const SignUp = () => {
  const { t } = useTranslation();
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState<boolean>(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

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

  const validateEmail = (email: string) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return t("signUp.passwordMinLength");
    }
    if (!hasUpperCase) {
      return t("signUp.passwordUppercase");
    }
    if (!hasLowerCase) {
      return t("signUp.passwordLowercase");
    }
    if (!hasDigit) {
      return t("signUp.passwordDigit");
    }
    if (!hasSpecialChar) {
      return t("signUp.passwordSpecialChar");
    }
    return null;
  };

  async function signUpWithEmail() {
    setLoading(true);
    setError("");

     if (!email && !password) {
       setError(t("signUp.allFieldIsRequired"));
       setLoading(false);
       return
     }

     if (!email) {
       setError(t("signUp.emailIsRequired"));
       setLoading(false);
       return;
     }

     if (!validateEmail(email)) {
       setError(t("signUp.invalidEmailFormat"));
       setLoading(false);
       return;
     }

     if (!password) {
       setError(t("signUp.passwordIsRequired"));
       setLoading(false);
       return;
     }

     const passwordError = validatePassword(password);
     if (passwordError) {
       setError(passwordError);
       setLoading(false);
       return;
     }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error.message.includes("Email rate limit exceeded")) {
        setError(t("signUp.tooManyAttempts"));
        setLoading(false);
      } else if (error.message === "User already registered") {
        setError(t("signIn.emailAlreadyExists"));
        setLoading(false);
      } else {
        setError(error.message);
        setLoading(false);
      }
    } else {
      router.push("/Userprofile/userprofile");
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
            {t("signUp.createNewAccount")}
          </Text>
          <View style={{ rowGap: 20, width: "100%" }}>
            <View style={styles.inputContainer}>
              <EmailPasswordInput
                icon="email"
                placeholder={t("signUp.email")}
                value={email}
                onChangeText={handleEmailChange}
              />
              {error &&
                (error === t("signUp.emailIsRequired") ||
                  error === t("signUp.invalidEmailFormat") ||
                  error === t("signUp.tooManyAttempts")) && (
                  <Text style={styles.errorText}>{error}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
              <EmailPasswordInput
                icon="lock"
                placeholder={t("signUp.password")}
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
              />
              {(error === t("signUp.passwordIsRequired") ||
                error === t("signUp.passwordMinLength") ||
                error === t("signUp.passwordUppercase") ||
                error === t("signUp.passwordLowercase") ||
                error === t("signUp.passwordDigit") ||
                error === t("signUp.passwordSpecialChar")) && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
            <RememberMe text={t("signUp.rememberMe")} />
            <View style={{ rowGap: 20, width: "100%" }}>
              <Button
                title={loading ? t("signUp.loading") : t("signUp.signUp")}
                rounded
                onPress={signUpWithEmail}
                disabled={loading}
              />
              {error &&
                (error === t("signUp.allFieldIsRequired") ||
                  error === t("signIn.emailAlreadyExists")) && (
                  <Text style={styles.errorTextIn}>{error}</Text>
                )}
            </View>
          </View>
          <Or text={t("signUp.orContinueWith")} />
          <SignUpWith />
          <SignUpText
            text1={t("signUp.alreadyHaveAnAccount")}
            text2={t("signUp.signIn")}
            onPress={() => {
              router.push("/signupSignin/SignIn");
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
  inputContainer: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    right: "5%",
    top: "100%",
    transform: [{ translateY: 0 }],
    color: "red",
    fontFamily: "UrbanistSemiBold",
    fontSize: 14,
    width: "auto",
  },
  errorTextIn: {
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

export default SignUp;
