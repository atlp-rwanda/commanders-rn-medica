import { View, Text } from "react-native";
import React from "react";
import { containerStyle, titleStyle } from "../styles/common";
import Button from "../components/button";
import LetsYouIn from "./LetsYouIn";
import SignUp from "./SignUp";
import SingIn from "./SingIn";

const Index = () => {
  return (
    <>
      {/* <LetsYouIn /> */}
      {/* <SignUp /> */}
      <SingIn />
    </>
  );
};

export default Index;
