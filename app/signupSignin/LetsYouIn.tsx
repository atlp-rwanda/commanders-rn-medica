import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { containerStyle, titleStyle } from "../../styles/common";
import SiginButton from "../../components/SignInButton";
import Button from "../../components/button";
import SignUpText from "../../components/SignUpText";
import BackIcon from "../../components/BackIcon";

const LetsYouIn = () => {
  return (
    <View style={{ ...containerStyle, rowGap: 24 }}>
      <BackIcon imageSource={require("../../assets/Frame.png")} />
      <Text style={[{fontWeight: "bold"}, titleStyle]}>Let’s you in</Text>
      <SiginButton
        title="Continue with Facebook"
        logo={require("../../assets/facebook-logo.png")}
      />
      <SiginButton
        title="Continue with Google"
        logo={require("../../assets/google-logo.png")}
      />
      <SiginButton
        title="Continue with Apple"
        logo={require("../../assets/apple-logo.png")}
      />
      <View>
        <Text>Or</Text>
      </View>
      <Button title="Sign in with password" />
      <SignUpText text1="Don’t have an account?" text2="Sign up" />
    </View>
  );
};

export default LetsYouIn;