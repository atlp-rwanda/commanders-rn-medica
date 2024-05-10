import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
	ScrollView,
	Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
	const scrollViewRef = useRef(null);
	const [step, setStep] = useState(1);
	const [showSplash, setShowSplash] = useState(true); // State to manage splash screen visibility
	const fadeAnim = useRef(new Animated.Value(1)).current; // Animated value for fading animation

	useEffect(() => {
		// Fading out the splash screen after 3 seconds
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 1000, // 1 second duration for fading out
				useNativeDriver: true,
			}).start(() => setShowSplash(false));
		}, 3000);

		// Clearing the timer when component unmounts or when the splash screen fades out
		return () => clearTimeout(timer);
	}, [fadeAnim]);

	const handleScroll = (event: {
		nativeEvent: { contentOffset: { x: any } };
	}) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const newStep = Math.ceil(contentOffsetX / width) + 1;
		if (newStep !== step) {
			setStep(newStep);
		}
	};

	const onNext = () => {
		scrollViewRef.current.scrollTo({ x: width * step, animated: true });
		setStep(step + 1);
	};

	const onGetStarted = () => {
		// Handle action when "Get Started" button is pressed
		console.log("Get Started button pressed!");
	};

	const renderContent = () => {
		return (
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				scrollEnabled={true}
				onScroll={handleScroll}
				scrollEventThrottle={16} // Adjust the throttle as needed
			>
				<View style={[styles.page, { width }]}>
					<Image
						source={require("./assets/onboarding1.jpg")}
						style={styles.image}
					/>
					<Text style={styles.text}>
						Thousands of doctors & experts to help your health!
					</Text>
					<TouchableOpacity style={styles.button} onPress={onNext}>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.page, { width }]}>
					<Image
						source={require("./assets/onboarding2.jpg")}
						style={styles.image}
					/>
					<Text style={styles.text}>
						Health checks & consultations easily anywhere anytime
					</Text>
					<TouchableOpacity style={styles.button} onPress={onNext}>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.page, { width }]}>
					<Image
						source={require("./assets/onboarding3.jpg")}
						style={styles.image}
					/>
					<Text style={styles.text}>
						Let's start living healthy and well with us right now!
					</Text>
					<TouchableOpacity
						style={[styles.button, styles.getStartedButton]}
						onPress={onGetStarted}>
						<Text style={[styles.buttonText, styles.getStartedButtonText]}>
							Get Started
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	};

	return (
		<View style={styles.container}>
			{/* Splash screen */}
			{showSplash && (
				<Animated.View style={[styles.splash, { opacity: fadeAnim }]}>
					<Image
						style={styles.welcomeImage}
						source={require("./assets/welcome.png")}
					/>
					<Text style={styles.welcomeHeading}>Welcome to Medica! 👋</Text>
					<Text style={styles.paragraph}>
						The best online doctor appointment & consultation app of the century
						for your health and medical needs!
					</Text>
				</Animated.View>
			)}

			{/* Onboarding content */}
			{!showSplash && renderContent()}
		</View>
	);
};

const styles = StyleSheet.create({
	welcomeImage: {
		marginVertical: 100,
		resizeMode: "cover",
		width: width,
	},
	welcomeHeading: {
		fontSize: 55,
		color: "#246BFD",
		fontWeight: "bold",
		padding: 30,
		textAlign: "center",
	},
	paragraph: {
		fontSize: 30,
		textAlign: "center",
		padding: 30,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#ffffff'
	},
	page: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		padding: 20,
		paddingBottom: 40,
	},
	image: {
		width: width,
		// height: height * 0.5,
		aspectRatio: 367 / 426,
		// resizeMode: "cover",
		marginBottom: 100,
	},
	text: {
		fontSize: 55,
		fontWeight: "bold",
		color: "#246BFD",
		marginBottom: 100,
		textAlign: "center",
	},
	button: {
		backgroundColor: "#246BFD",
		paddingVertical: 20,
		width: width - 40,
		display: "flex",
		alignItems: "center",
		borderRadius: 50,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
	getStartedButton: {
		marginTop: 20,
	},
	getStartedButtonText: {
		fontSize: 20,
	},
	splash: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-start",
		backgroundColor: "white",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 60,
		height: height,
	},
});

export default OnBoarding;
