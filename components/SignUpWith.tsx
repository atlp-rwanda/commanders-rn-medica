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
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserSessionType, setSession } from "@/redux/reducers/session";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";

export const SignUpWith = () => {
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri({scheme:"com.andela.commanders.medica"});
const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;



  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  await AsyncStorage.setItem("data", JSON.stringify(data.session));
  router.push("/(tabs)");
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo:redirectTo+'(tabs)',
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

type iconName = "apple" | "google" | "facebook" | undefined;

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
          // console.log(data);
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
  const sessionData = useSelector((state: RootState) => state?.session)
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>();
  const session = async () => {
    const datas = await AsyncStorage.getItem("data");
    if (datas) {
      setData(JSON.parse(datas));
    }
    dispatch(setSession({accessToken: data?.access_token,
      fullName: data?.user.user_metadata.full_name,
      email:data?.user.email,
      picture:data?.user.user_metadata.picture,
    }));
    // console.log(sessionData);
  }
  useEffect(() => {
    session();
  }, [sessionData]);

  const url = Linking.useURL();
  // console.log(url);
  if (url) createSessionFromUrl(url);
  const handleFacebookSignUp = () => {
    performOAuth();
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
      // console.log(JSON.stringify(e, null, 2));
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
