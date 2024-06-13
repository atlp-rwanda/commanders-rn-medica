import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {router} from "expo-router";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import RotatingImage from "./RotatingImage";
import { useSelector, useDispatch } from 'react-redux';
import { completeOnboarding } from "../redux/reducers/obReducer";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const dispatch = useDispatch();
  const onboardingCompleted = useSelector(state => state.onboarding.onboardingCompleted);
  const [showFirstSplash, setShowFirstSplash] = useState(!onboardingCompleted);
  const [showSecondSplash, setShowSecondSplash] = useState(false);
  const fadeAnimFirst = useRef(new Animated.Value(1)).current;
  const fadeAnimSecond = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) {
      (swiperRef.current as any).scrollBy(1);
    }
  };

  useEffect(() => {
    if (!onboardingCompleted) { 
      const firstTimer = setTimeout(() => {
        Animated.timing(fadeAnimFirst, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          setShowFirstSplash(false);
          setShowSecondSplash(true);
          Animated.timing(fadeAnimSecond, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start();
          const secondTimer = setTimeout(() => {
            Animated.timing(fadeAnimSecond, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }).start(() => {
              setShowSecondSplash(false);
            });
          }, 4000);
          return () => clearTimeout(secondTimer);
        });
      }, 3000);

      return () => clearTimeout(firstTimer);
    }
  }, [fadeAnimFirst, fadeAnimSecond, onboardingCompleted]);

  const handleCompleteOnboarding = () => {
    dispatch(completeOnboarding());
    router.push('/signupSignin/index');
  };

  const renderContent = () => (
    <View style={styles.main}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={false}
        onIndexChanged={setIndex}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        loop={false}
      >
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/onboarding/onboarding1.jpg")}
            style={styles.image}
          />
          <Text style={[styles.text]} className="font-UrbanistBold">
            Thousands of doctors & experts to help your health!
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/onboarding/onboarding2.jpg")}
            style={styles.image}
          />
          <Text style={styles.text} className="font-UrbanistBold">
            Health checks & consultations easily anywhere anytime
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/onboarding/onboarding3.jpg")}
            style={styles.image}
          />
          <Text style={[styles.text]} className="font-UrbanistBold">
            Let's start living healthy and well with us right now!
          </Text>
        </View>
      </Swiper>
      <View style={styles.footer}>
        {index < 2 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText} className="font-UrbanistSemiBold">Next</Text>
          </TouchableOpacity>
        )}
        {index >= 2 && (
          <TouchableOpacity style={[styles.button, {padding: 0, paddingVertical: 1}]} onPress={handleCompleteOnboarding}>
            <Link href="/signupSignin/" style={[styles.button]} className="font-UrbanistSemiBold">
              Get Started
            </Link>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (onboardingCompleted) {
    return null; 
  }

  return (
    <View style={styles.container}>
      {showSecondSplash && (
        <Animated.View style={[styles.splash, { opacity: fadeAnimSecond }]}>
          <Image
            style={styles.welcomeImage}
            source={require("@/assets/images/onboarding/MedicaWelcome.png")}
          />
          <View style={styles.intro}>
            <Text style={[styles.welcomeHeading]} className="font-UrbanistSemiBold">Welcome to Medica! 👋</Text>
            <Text style={styles.welcomeParagraph} className="font-UrbanistSemiBold">
              The best online doctor appointment & consultation app of the
              century for your health and medical needs!
            </Text>
          </View>
        </Animated.View>
      )}

      {showFirstSplash && (
        <Animated.View style={[styles.splash2, { opacity: fadeAnimFirst }]}>
          <Image
            style={styles.Logo}
            source={require("@/assets/MedicaLogo.png")} 
          />
          <View style={styles.loader}>
            <RotatingImage />
          </View>
        </Animated.View>
      )}

      {!showFirstSplash && !showSecondSplash && renderContent()}
      <View style={{ width: 0, height: 0, overflow: "hidden", opacity: 0 }}>
        <Text>Medica App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    bottom: 100,
    width: width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Logo: {
    height: 60,
    aspectRatio: 238 / 60
  },
  wrapper: {
    height: height * 0.8,
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: "absolute",
    bottom: 10,
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 60
  },
  splash: {
    justifyContent: "space-around",
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 60,
    height: height,
    width: width,
    paddingHorizontal: 10,
  },
  splash2: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  intro: {
    padding: 10,
  },
  welcomeImage: {
    marginVertical: 10,
    resizeMode: "cover",
    width: width,
    height: undefined,
    aspectRatio: 540 / 450,
  },
  welcomeHeading: {
    fontSize: 45,
    color: "#246BFD",
    textAlign: "center",
    margin: 0,
  },
  welcomeParagraph: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: width,
    height: height * 0.5,
    aspectRatio: 367 / 426,
    marginBottom: 40,
  },
  text: {
    fontSize: 31,
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
    color: "white",
    fontSize: 18,
    textAlign: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  dot: {
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    marginBottom: 100
  },
  activeDot: {
    backgroundColor: "#246BFD",
    width: 30,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    marginBottom: 100
  },
});
