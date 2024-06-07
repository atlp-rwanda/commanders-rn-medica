import { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

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

const { width: screenWidth } = Dimensions.get("window");

const SignUp = () => {
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
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasDigit) {
      return "Password must contain at least one digit";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  async function signUpWithEmail() {
    setLoading(true);
    setError("");

    if (!email && !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
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
        setError("Too many attempts. try again later.");
      } else {
        setError(error.message);
      }
      setLoading(false);
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
          <Text style={{ fontFamily: "UrbanistBold", fontSize: 32 }}>
            Create New Account
          </Text>
          <View style={{ rowGap: 20, width: "100%" }}>
            <View style={styles.inputContainer}>
              <EmailPasswordInput
                icon="email"
                placeholder="Email"
                onActiveChange={handleEmailActiveChange}
                value={email}
                onChangeText={handleEmailChange}
              />
              {error === "Email is required" && (
                <Text style={styles.errorText}>{error}</Text>
              )}
              {error === "Invalid email format" && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <EmailPasswordInput
                icon="lock"
                placeholder="Password"
                secureTextEntry
                onActiveChange={handlePasswordActiveChange}
                value={password}
                onChangeText={handlePasswordChange}
                isFilled={isPasswordFilled}
              />
              {(error === "Password is required" ||
                error.startsWith("Password must")) && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
            <RememberMe />
            <View style={styles.inputContainer}>
              <Button
                title={loading == true ? "Loading" : "Sign up"}
                rounded
                onPress={(signUpWithEmail)}
              />
              {error &&
                error !== "Email is required" &&
                error !== "Password is required" &&
                !error.startsWith("Password must") &&
                error !== "Invalid email format" && (
                  <Text style={styles.errorTextIn}>{error}</Text>
                )}
            </View>
          </View>
          <Or text="or continue with" />
          <SignUpWith />
          <SignUpText
            text1="Already have an account?"
            text2="Sign in"
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
  left: "20%",
    transform: [{ translateY: -20 }],
    color: "red",
    fontFamily: "UrbanistSemiBold",
    fontSize: 14,
    width: "auto",
  },
});

export default SignUp;