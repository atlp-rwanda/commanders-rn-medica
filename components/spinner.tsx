import { useEffect } from "react";
import { Animated, Easing, Image } from "react-native";

export default function Spinner() {
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
        spin();
    }, []);

    return (<Animated.View style={{ transform: [{ rotate }] }}>
        <Image
            source={require("@/assets/images/forgot-password/loading-frame.png")}
            className="w-12 h-12"
        />
    </Animated.View>)
}