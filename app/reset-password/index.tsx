import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useRouter } from "expo-router";
import {
	Image,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	Alert,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { Text } from "@/components/ThemedText";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Icon, IconName } from "@/components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

type ContactMethod = "sms" | "email";

export default function ForgotPasswordScreen() {
	const [selected, setSelected] = useState<ContactMethod>("sms");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handlePasswordReset = async () => {
		if (selected === "email") {
			const { error } = await supabase.auth.resetPasswordForEmail(email);
			if (error) {
				setError("Oops! You forgot to provide a registered email.");
			} else {
				Alert.alert(
					"Success",
					"Reset OTP has been sent to your email."
				);
				router.push({
					pathname: "reset-password/verify-code",
					params: { email, method: selected },
				});
			}
		}
		if (selected === "sms") {
			const { error: noUserError, data: userData } = await supabase
				.from("patient")
				.select("*")
				.eq("phone", phone)
				.single();

			if (noUserError) {
				setError("Oops! No user registered with this phone number");
				return;
			}

			let { data, error } = await supabase.auth.signInWithOtp({
				phone: `+${phone}`,
			});
			console.log(JSON.stringify(data, null, 2));
			if (error) {
				setError(
					"Oops! You forgot to provide a registered phone number"
				);
			} else {
				Alert.alert(
					"Success",
					"Reset OTP has been sent to yuor phone number."
				);
				router.push({
					params: { phone, method: selected },
					pathname: "reset-password/verify-code",
				});
			}
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={styles.container}>
					<NavigationHeader title="Forgot Password" />
					<ScrollView contentContainerStyle={{ flex: 1 }}>
						<Image
							source={require("@/assets/images/forgot-password/frame.png")}
							style={styles.image}
						/>
						<Text style={styles.subtitle}>
							Select which contact details should we use to reset
							your password
						</Text>
						<View>
							<SelectContactMethod
								icon="chat"
								title="via SMS"
								subtitle={phone}
								selected={selected === "sms"}
								onPress={() => setSelected("sms")}
								setContact={setPhone}
							/>
							<SelectContactMethod
								icon="message"
								title="via Email"
								subtitle={email}
								selected={selected === "email"}
								onPress={() => setSelected("email")}
								setContact={setEmail}
							/>
						</View>
						{error && (
							<Text
								style={{
									color: "#913831",
									textAlign: "center",
									fontSize: 14,
								}}
							>
								{error}
							</Text>
						)}
						<TouchableOpacity
							style={styles.button}
							onPress={handlePasswordReset}
						>
							<Text style={styles.buttonText}>Continue</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}

const SelectContactMethod = ({
	icon,
	title,
	subtitle,
	selected,
	onPress,
	setContact,
}: {
	icon: IconName;
	title: string;
	subtitle: string;
	selected: boolean;
	onPress?: () => void;
	setContact?: (contact: string) => void;
}) => {
	return (
		<Pressable
			style={[styles.card, selected && styles.selectedCard]}
			onPress={onPress}
		>
			<View style={styles.cardIcon}>
				<Icon name={icon} />
			</View>
			<View>
				<Text style={styles.cardTitle}>{title}</Text>
				{selected ? (
					<TextInput
						style={styles.cardSubtitle}
						placeholder="Type here"
						value={subtitle}
						onChangeText={setContact}
					/>
				) : (
					<Text style={styles.cardSubtitle}>{subtitle}</Text>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		paddingTop: 12,
	},
	image: {
		width: "100%",
		height: 250,
		resizeMode: "contain",
		marginVertical: 28,
	},
	subtitle: {
		fontSize: 16,
		marginVertical: 24,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderRadius: 24,
		borderWidth: 3,
		borderColor: "#EEEEEE",
		marginBottom: 8,
	},
	selectedCard: {
		borderColor: "#5089FF",
	},
	cardIcon: {
		backgroundColor: "rgba(36, 107, 253, 0.08)",
		padding: 18,
		borderRadius: 36,
	},
	cardTitle: {
		opacity: 0.5,
		marginBottom: 6,
	},
	cardSubtitle: {
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#5089FF",
		padding: 16,
		marginTop: 20,
		borderRadius: 24,
		shadowColor: "#5089FF",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 2 },
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});
