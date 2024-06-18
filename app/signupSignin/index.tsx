import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, BackHandler } from "react-native";
import BackIcon from "../../components/BackIcon";
import Or from "../../components/Or";
import SignInButton from "../../components/SignInButton";
import SignUpText from "../../components/SignUpText";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { screenbgcolor } from "../../styles/usecolor";

const LetsYouIn = () => {
  return (
    <SafeAreaView style={areaView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[containerStyle, screenbgcolor, styles.container]}>
          <BackIcon
            imageSource={require("../../assets/Frame.png")}
            onPress={() => {
              BackHandler.exitApp();
            }}
          />
          <Text style={styles.title}>Let’s get you in</Text>
          <View style={{ width: "100%", gap: 16 }}>
            <SignInButton
              title="Continue with Facebook"
              logo={require("../../assets/facebook-logo.png")}
            />
            <SignInButton
              title="Continue with Google"
              logo={require("../../assets/google-logo.png")}
            />
            <SignInButton
              title="Continue with Apple"
              logo={require("../../assets/apple-logo.png")}
            />
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
