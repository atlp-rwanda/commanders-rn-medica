import Spinner from "@/components/spinner";
import { User } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import { useRouteInfo } from "expo-router/build/hooks";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useNavigation } from "expo-router";
import BackIcon from "../../components/BackIcon";
import Or from "../../components/Or";
import SignInButton from "../../components/SignInButton";
import SignUpText from "../../components/SignUpText";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { screenbgcolor } from "../../styles/usecolor";

import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { supabase } from "../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserSessionType, setSession } from "@/redux/reducers/session";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
const LetsYouIn = () => {
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

  const [willRedirect, setWillRedirect] = useState(false);
  WebBrowser.maybeCompleteAuthSession(); // required for web only
  const redirectTo = makeRedirectUri({ scheme: "com.andela.commanders.medica" });
  // console.log("redirectTo", redirectTo);
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
    setTimeout(() => {
      if (willRedirect) {
        router.push("/Userprofile/userprofile");
        console.log("willRedirect", willRedirect);
      }
      else {
        router.push("/(tabs)");
      }
    },)
    return data.session;
  };

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: redirectTo + 'signupSignin',
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

  const sessionData = useSelector((state: RootState) => state?.session)
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>();
  const session = async () => {
    const datas = await AsyncStorage.getItem("data");
    if (datas) {
      setData(JSON.parse(datas));
      // console.log(datas);
    }
    dispatch(setSession({
      accessToken: data?.access_token,
      fullName: data?.user.user_metadata.full_name,
      email: data?.user.email,
      picture: data?.user.user_metadata.picture,
      userId: data?.user.id,
      nickname: "",
    }));
    const { data: user, error } = await supabase.from('patient').select('id,phone,gender,nickname,profile_picture').eq('id', sessionData.userId).single();
    if (error) {
      console.log(error.message);
    }
    if (user) {
      if (!user?.phone) {
        setWillRedirect(true);
      }
      else {
        setWillRedirect(false);
      }
      console.log("user", user);
    }
  }
  const url = Linking.useURL();
  useEffect(() => {
    session();
    // console.log(url);
    if (url) createSessionFromUrl(url);
  }, []);


  return (
    <>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View className="bg-black/40 h-full justify-center items-center">
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
            <Text style={styles.title}>Let’s you in</Text>
            <View style={{ width: "100%", gap: 16 }}>
              <SignInButton
                title="Continue with Facebook"
                logo={require("../../assets/facebook-logo.png")}
                onPress={performOAuth}
              />
              <SignInButton
                title="Continue with Google"
                logo={require("../../assets/google-logo.png")}
                onPress={() => promptAsync()}
              />
              {Platform.OS === "ios" && (
                <SignInButton
                  title="Sign in with Apple"
                  logo={require("../../assets/apple-logo.png")}
                  onPress={appleSignin}
                />
              )}
            </View>
            <Or text="Or" />
            <View className="w-full">
              <Button
                rounded
                title="Sign in with password"
                onPress={() => {
                  router.push("/signupSignin/SignIn");
                }}
              />
            </View>
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
  },
});

export default LetsYouIn;
