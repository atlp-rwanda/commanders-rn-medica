import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  Modal,
  Platform,
  Alert,
} from "react-native";
import BackIcon from "../../components/BackIcon";
import SignInButton from "../../components/SignInButton";
import SignUpText from "../../components/SignUpText";
import Button from "../../components/button";
import Or from "../../components/Or";
import Spinner from "@/components/spinner";
import { User } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../supabase";
import { areaView, containerStyle } from "@/styles/common";
import { screenbgcolor } from "@/styles/usecolor";

WebBrowser.maybeCompleteAuthSession();

const LetsYouIn = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const route = useRouteInfo();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: "com.andela.commanders.medica:" + route.pathname,
  });

  useEffect(() => {
    signInWithGoogleAsync();
  }, [response]);

  async function signInWithGoogleAsync() {
    if (response?.type === "success") {
      setLoading(true);
      const { authentication } = response;
      if (authentication?.idToken) {
        const sbRequest = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: authentication.idToken,
          access_token: authentication.accessToken,
        });
        if (sbRequest.error) {
          Alert.alert("Error", sbRequest.error.message);
        } else {
          const { data } = await supabase.auth.getUser();
          if (data) {
            setUser(data.user);
          } else {
            Alert.alert("Error", "User not found");
          }
        }
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) redirectUser(user);
  }, [user]);

  async function redirectUser(user: User) {
    const { data: userData } = await supabase
      .from("patient")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (userData) {
      router.push("/(tabs)/");
    } else {
      router.push("/Userprofile/userprofile");
    }
  }

  const appleSignin = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credentials || !credentials.identityToken) {
        Alert.alert("Error", "Failed to login with Apple, please try again.");
        return;
      }

      const { error, data } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credentials.identityToken,
      });
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      const { data: userExists, error: userNotExists } = await supabase
        .from("patient")
        .select("*")
        .eq("email", data?.user?.email)
        .single();

      if (
        !userExists ||
        (userNotExists &&
          userNotExists.details === "The result contains 0 rows")
      ) {
        router.push("/Userprofile/userprofile");
      } else {
        router.push("/(tabs)/");
      }
    } catch (error) {
      console.error("Error signing in with Apple:", error);
    }
  };

  useEffect(() => {
    const fetchAndSetLanguage = async () => {
      let language;
      try {
        const { data } = await supabase
          .from("selected_language")
          .select("language")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .single();
        if (data && data.language) {
          language =
            data.language.toLowerCase() === "french" ? "fr" : data.language;
          setSelectedLanguage(language);
        }
      } catch (error) {
        console.error("Error fetching selected language from Supabase:", error);
      }

      if (!language) {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        language = storedLanguage || "en";
        setSelectedLanguage(language);
      }

      i18n.changeLanguage(language);
    };

    fetchAndSetLanguage();
  }, [i18n]);

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </View>
      </Modal>
      <SafeAreaView style={areaView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[containerStyle, screenbgcolor, styles.container]}>
            <BackIcon
              imageSource={require("../../assets/Frame.png")}
              onPress={() => {
                BackHandler.exitApp();
              }}
            />
            <Text style={styles.title}>{t("letsYouIn.title")}</Text>
            <View style={{ width: "100%", gap: 16 }}>
              <SignInButton
                title={t("letsYouIn.continueWithFacebook")}
                logo={require("../../assets/facebook-logo.png")}
              />
              <SignInButton
                title={t("letsYouIn.continueWithGoogle")}
                logo={require("../../assets/google-logo.png")}
                onPress={() => promptAsync()}
              />
              {Platform.OS === "ios" && (
                <SignInButton
                  title={t("letsYouIn.signInWithApple")}
                  logo={require("../../assets/apple-logo.png")}
                  onPress={appleSignin}
                />
              )}
            </View>
            <Or text={t("letsYouIn.or")} />
            <View style={{ width: "100%" }}>
              <Button
                rounded
                title={t("letsYouIn.signInWithPassword")}
                onPress={() => {
                  router.push("/signupSignin/SignIn");
                }}
              />
            </View>
            <SignUpText
              text1={t("letsYouIn.dontHaveAccount")}
              text2={t("letsYouIn.signUp")}
              onPress={() => {
                router.push("/signupSignin/SignUp");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    textAlign: "center",
  },
});

export default LetsYouIn;
