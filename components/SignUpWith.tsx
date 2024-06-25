import {
	Alert,
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/app/supabase";
import { router } from "expo-router";

type iconName = "apple" | "google" | "facebook" | undefined;

const SignUpWith = () => {
	const handleFacebookSignUp = () => {
		// Handle Facebook sign-up
	};

	const handleGoogleSignUp = () => {
		// Handle Google sign-up
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
