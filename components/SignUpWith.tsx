import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type iconName = "apple" | "google" | "facebook" | undefined

const SignUpWith = () => {
  const handleFacebookSignUp = () => {
    // Handle Facebook sign-up
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up
  };

  const handleAppleSignUp = () => {
    // Handle Apple sign-up
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFacebookSignUp} className="border border-gray-100 rounded-xl px-7 py-4">
        <Image source={require("../assets/facebook-logo.png")} className="w-6 h-6 object-contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoogleSignUp} className="border border-gray-100 rounded-xl px-7 py-4">
        <Image source={require("../assets/google-logo.png")} className="w-6 h-6 object-contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAppleSignUp} className="border border-gray-100 rounded-xl px-7 py-4">
        <Image source={require("../assets/apple-logo.png")} className="w-6 h-6 object-contain" />
      </TouchableOpacity>
    </View>
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

export default SignUpWith;
