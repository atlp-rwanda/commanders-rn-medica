import { useEffect, useRef } from "react";
import {
	View,
	Image,
	Animated,
	StyleSheet,
	Dimensions,
	Easing,
} from "react-native";

const { width, height } = Dimensions.get("window");

const RotatingImage = () => {
	const rotateAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Start the animation loop
		Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 1,
				duration: 4000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [rotateAnim]);

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [0, 0.3],
		outputRange: ["0deg", "360deg"],
	});

	const animatedStyle = {
		transform: [{ rotate: rotateInterpolate }],
	};

	return (
		<View style={styles.container}>
			<Animated.Image
				source={require("@/assets/Spinner.png")}
				style={[styles.image, animatedStyle]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 50,
		height: 50,
		resizeMode: "contain",
	},
});

export default RotatingImage;
