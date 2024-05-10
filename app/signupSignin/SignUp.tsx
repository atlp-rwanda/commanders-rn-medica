import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { containerStyle, titleStyle } from "../../styles/common";
import Button from "../../components/button";
import SignUpText from "../../components/SignUpText";
import BackIcon from "../../components/BackIcon";
import EmailPasswordInput from "../../components/EmailPasswordInput";
import RememberMe from "../../components/RememberMe";
import SignUpWith from "../../components/SignUpWith";
import Or from "../../components/Or";

const SingUp = () => {
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);

  const handleEmailActiveChange = (isActive: boolean) => {
    setIsEmailActive(isActive);
  };

  const handlePasswordActiveChange = (isActive: boolean) => {
    setIsPasswordActive(isActive);
  };

  return (
    <View style={{ ...containerStyle, rowGap: 24 }}>
      <BackIcon imageSource={require("../assets/Account.png")} />
      <Text style={titleStyle}>Create New Account</Text>
      <View style={{ rowGap: 20 }}>
        <EmailPasswordInput
          icon="email"
          placeholder="Email"
          onActiveChange={handleEmailActiveChange}
        />
        <EmailPasswordInput
          icon="lock"
          placeholder="Password"
          secureTextEntry
          onActiveChange={handlePasswordActiveChange}
        />
      </View>
      <RememberMe />
      <Button
        title="Sign up"
        backgroundColor={
          isEmailActive || isPasswordActive ? "#1E90FF" : "#3062C8"
        }
      />
      <Or text="or continue with" />
      <SignUpWith />
      <SignUpText text1="Already have an account?" text2="Sign in" />
    </View>
  );
};

export default SingUp;
