import { router } from "expo-router";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	BackHandler,
	Platform,
	Alert,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import BackIcon from "../../components/BackIcon";
import Or from "../../components/Or";
import SignInButton from "../../components/SignInButton";
import SignUpText from "../../components/SignUpText";
import Button from "../../components/button";
import { areaView, containerStyle } from "../../styles/common";
import { screenbgcolor } from "../../styles/usecolor";
import { supabase } from "../supabase";

const LetsYouIn = () => {
	const appleSignin = async () => {
		try {
			const crendentials = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (!crendentials || !crendentials.identityToken) {
				Alert.alert(
					"Error",
					"Failed to Login with apple please try again."
				);
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
