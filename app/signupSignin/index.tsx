import React from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { areaView, containerStyle, titleStyle } from "../../styles/common";
import { screenbgcolor } from "../../styles/usecolor";
import SignInButton from "../../components/SignInButton";
import Button from "../../components/button";
import SignUpText from "../../components/SignUpText";
import BackIcon from "../../components/BackIcon";
import { router } from "expo-router";
import Or from "../../components/Or";

const LetsYouIn = () => {
  return (
    <SafeAreaView style={areaView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[containerStyle, screenbgcolor, styles.container]}>
          <BackIcon
            imageSource={require("../../assets/Frame.png")}
            onPress={router.back}
          />
          <Text style={styles.title}>Let’s you in</Text>
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
          <Button
            title="Sign in with password"
            onPress={() => {
              router.push("/signupSignin/SignIn");
            }}
          />
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
