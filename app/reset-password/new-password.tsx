import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
	Animated,
	BackHandler,
	Easing,
	Image,
	KeyboardAvoidingView,
	Modal,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	ActivityIndicator,
	useWindowDimensions,
} from "react-native";
import { Text } from "@/components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PasswordInput } from "@/components/Input";
import { NavigationHeader } from "@/components/Header";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { infoCircle } from "@/assets/icons/infoCircle";

export default function NewPasswordScreen() {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const [isChecked, setIsChecked] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [confirmPasswordRef, setConfirmPasswordRef] =
		useState<TextInput | null>(null);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState<{
		type: string;
		text: string;
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const rotateValue = new Animated.Value(0);
	const rotate = rotateValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const spin = () => {
		rotateValue.setValue(0);
		Animated.timing(rotateValue, {
			toValue: 1,
			duration: 2500,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => spin());
	};
	useEffect(() => {
		if (isModalVisible) {
			spin();
			setTimeout(() => {
				setIsModalVisible(false);
				router.push("/(tabs)");
			}, 4000);
		}
	}, [isModalVisible]);
	const validatePassword = (newpassword: string) => {
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(newpassword);
		const hasLowerCase = /[a-z]/.test(newpassword);
		const hasDigit = /\d/.test(newpassword);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newpassword);

		if (newpassword.length < minLength) {
			return "Password must be at least 8 characters long";
		}
		if (!hasUpperCase) {
			return "Password must contain at least one uppercase letter";
		}
		if (!hasLowerCase) {
			return "Password must contain at least one lowercase letter";
		}
		if (!hasDigit) {
			return "Password must contain at least one digit";
		}
		if (!hasSpecialChar) {
			return "Password must contain at least one special character";
		}
		return null;
	};

	const handlePasswordReset = async () => {
		setLoading(true);
		if (!newPassword || !confirmPassword) {
			setMessage({ type: "error", text: "fill in all fields" });
			setLoading(false);
		}
		const passwordValidationError = validatePassword(newPassword);
		if (passwordValidationError) {
			setMessage({ type: "error", text: passwordValidationError });
			setLoading(false);
			return;
		}
		if (newPassword !== confirmPassword) {
			setMessage({ type: "error", text: "Passwords do not match" });
			setLoading(false);
			return;
		}

		const { error: updateError } = await supabase.auth.updateUser({
			password: newPassword,
		});
		if (updateError) {
			console.log(updateError);
			setLoading(false);
		} else {
			setMessage({
				type: "success",
				text: "Password was changed successfully ✅",
			});
			setTimeout(() => {
				setLoading(false);
				setIsModalVisible(true);
				setMessage(null);
			}, 3000);
		}
	};

	useEffect(() => {
		const backAction = () => {
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => {
					setIsModalVisible(false);
				}}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Image
							source={require("@/assets/images/forgot-password/success-frame.png")}
							style={styles.modalImage}
						/>
						<Text style={styles.modalTitle}>Congratulation</Text>
						<Text style={styles.modalText}>
							Your account is ready to use. You will be redirected
							to the Home page in a few seconds.
						</Text>
						<Animated.View style={{ transform: [{ rotate }] }}>
							<Image
								source={require("@/assets/images/forgot-password/loading-frame.png")}
								style={styles.modalLoading}
							/>
						</Animated.View>
					</View>
				</View>
			</Modal>
			<View
				style={[
					styles.container,
					{ zIndex: 1, backgroundColor: "#fff" },
				]}
			>
				<NavigationHeader title="Create New Password" />
			</View>

			<KeyboardAvoidingView
				behavior="position"
				style={{ flex: 1 }}
				contentContainerStyle={{ flex: 1 }}
			>
				<ScrollView
					contentContainerStyle={[
						styles.container,
						{ flex: 1, paddingBottom: 48 },
					]}
				>
					<Image
						source={require("@/assets/images/forgot-password/frame-2.png")}
						style={styles.image}
					/>
					<View>
						<Text style={styles.title}>
							Create Your New Password
						</Text>
					</View>
					<PasswordInput
						placeholder="Password"
						returnKeyType="next"
						blurOnSubmit={false}
						onSubmitEditing={() => confirmPasswordRef?.focus()}
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<PasswordInput
						placeholder="Confirm Password"
						returnKeyType="done"
						blurOnSubmit={true}
						setRef={setConfirmPasswordRef}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<View>
						{message?.type === "error" && (
							<Text className="text-[#913831] text-center font-[UrbanistRegular] text-[18px]">
								{message.text}
							</Text>
						)}
					</View>
					<View style={styles.checkboxContainer}>
						<Checkbox
							value={isChecked}
							style={styles.checkbox}
							onValueChange={setIsChecked}
							color={isChecked ? "#246BFD" : "#BDBDBD"}
						/>
						<Text style={styles.checkboxText}>Remember Me</Text>
					</View>
					<View style={{ flex: 1 }} />
					<TouchableOpacity
						className="bg-lightblue p-4 my-5 rounded-full shadow-sm shadow-lightblue"
						onPress={handlePasswordReset}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<Text className="text-white text-center font-bold">
								Continue
							</Text>
						)}
					</TouchableOpacity>
				</ScrollView>
				{message?.type === "success" && (
					<View className="absolute bottom-5 bg-[#4ADE8033] left-6 right-6 px-2.5 pb-2.5 items-center rounded-xl flex-row gap-2.5">
						<SvgXml xml={infoCircle} />
						<Text className="text-[#4BB543] font-[UrbanistRegular] text-[18px]">
							{message.text}
						</Text>
					</View>
				)}
			</KeyboardAvoidingView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 32,
		paddingTop: 12,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 24,
		justifyContent: "center",
		alignItems: "center",
		maxWidth: "80%",
	},
	modalImage: {
		width: 180,
		height: 180,
		marginBottom: 24,
		objectFit: "contain",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 12,
		textAlign: "center",
		color: "#246BFD",
	},
	modalText: {
		fontSize: 16,
		marginBottom: 24,
		textAlign: "center",
	},
	modalLoading: {
		width: 50,
		height: 50,
		objectFit: "contain",
	},
	image: {
		width: "100%",
		height: 200,
		objectFit: "contain",
		marginVertical: 28,
	},
	title: {
		fontSize: 18,
		marginVertical: 24,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 24,
		gap: 8,
	},
	checkbox: {
		borderRadius: 6,
	},
	checkboxText: {
		fontSize: 16,
	},
	button: {
		borderRadius: 36,
		paddingVertical: 18,
		marginTop: 24,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
		color: "#fff",
	},
});
