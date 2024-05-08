import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { containerStyle, titleStyle } from "../styles/common";
import Button from "../components/button";
import SignUpText from "../components/SignUpText";
import BackIcon from "../components/BackIcon";
import EmailPasswordInput from "../components/EmailPasswordInput";
import RememberMe from "../components/RememberMe";
import SignUpWith from "../components/SignUpWith";

const LetsYouIn = () => {
  return (
    <View style={{ ...containerStyle, rowGap: 24 }}>
      <BackIcon imageSource={require("../assets/Account.png")} />
      <Text style={titleStyle}>Create New Account</Text>
      <View style={{ rowGap: 20 }}>
        <EmailPasswordInput icon="email" placeholder="Email" />
        <EmailPasswordInput
          icon="lock"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <RememberMe />
      <Button title="Sign up" backgroundColor="#3062C8" />
      <SignUpWith />
      <SignUpText text1="Already have an account?" text2="Sign in" />
    </View>
  );
};

export default LetsYouIn;
