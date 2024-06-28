import { supabase } from "@/app/supabase";
import { User } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "./spinner";

type iconName = "apple" | "google" | "facebook" | undefined;

export const SignUpWith = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const route = useRouteInfo();

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
          console.log(data);
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

  const handleFacebookSignUp = () => {
    // Handle Facebook sign-up
  };

  const handleGoogleSignUp = () => {
    promptAsync();
  };

  const handleAppleSignIn = async () => {
    try {
      const crendentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!crendentials || !crendentials.identityToken) {
        Alert.alert("Error", "Failed to Login with apple please try again.");
        return;
      }

      const {
        error,
        data: { user },
      } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: crendentials.identityToken,
      });
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      const { data: userExists, error: userNotExists } = await supabase
        .from("patient")
        .select("*")
        .eq("email", user?.email)
        .single();

      if (
        !userExists ||
        (userNotExists &&
          userNotExists.details === "The result contains 0 rows")
      ) {
        router.push("/Userprofile/userprofile");
        return;
      }
      router.push("/(tabs)/");
      return;
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      return;
    }
  };

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View className="bg-black/40 h-full justify-center items-center">
          <Spinner />
        </View>
      </Modal>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleFacebookSignUp}
          className="border border-gray-100 rounded-xl px-7 py-4"
        >
          <Image
            source={require("../assets/facebook-logo.png")}
            className="w-6 h-6 object-contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoogleSignUp}
          className="border border-gray-100 rounded-xl px-7 py-4"
        >
          <Image
            source={require("../assets/google-logo.png")}
            className="w-6 h-6 object-contain"
          />
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity
            onPress={handleAppleSignIn}
            className="border border-gray-100 rounded-xl px-7 py-4"
          >
            <Image
              source={require("../assets/apple-logo.png")}
              className="w-6 h-6 object-contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
