import { KeyboardAvoidingView, SafeAreaView, View, Pressable,Modal, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, Image, Animated,Easing } from "react-native";
import { useNavigation, router} from "expo-router";
import { SvgXml } from "react-native-svg"
import { back, fingerprint } from "@/assets/icons/userprofile/icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function SetFingerPrint() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const spinValue = new Animated.Value(0);

  Animated.timing(spinValue, {
    toValue: 1,
    easing: Easing.linear,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setIsModalVisible(false);
        router.push("/(tabs)/");
      }, 3000);
    }
  }, [isModalVisible]);

  const handleAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage:
        "Please put your finger on the fingerprint scanner to get started.",
    });
    if (result.success) {
      alert("success");
    } else {
      alert(result.error);
    }
  };

    return (
            <SafeAreaView>
                <View className="my-4 flex-row gap-x-2 mt-10 ml-2">
                    <SvgXml xml={back} onPress={() => navigation.goBack()} />
                    <Text className="text-xl text-black font-UrbanistSemiBold">Set Your Fingerprint </Text>
                </View>
                <View>
                    <Text className="text-lg text-center mt-10 px-2 font-UrbanistRegular">
                    Add a fingerprint to make your account more secure.
                    </Text>
                </View>
                <View className="justify-center flex-row mt-10">
                    <SvgXml xml={fingerprint} width={220} height={220} onPress={handleAuth}/>
                </View>
                   <View>
                   <Text className="text-lg text-center my-10 px-2 font-UrbanistRegular">
                   Please put your finger on the fingerprint scanner to get started.
                    </Text>
                   </View>
                <View className="flex-row justify-center gap-x-3">
                    <TouchableOpacity className="bg-reducedblue w-2/5 rounded-3xl py-3 mt-2"  onPress={() => router.push("/(tabs)/")}>
                        <Text className="text-lightblue text-base text-center font-UrbanistBold">Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-lightblue w-2/5 rounded-3xl py-3 mt-2" onPress={()=>setIsModalVisible(true)}>
                        <Text className="text-def text-base text-center font-UrbanistBold">Continue</Text>
                    </TouchableOpacity>
                </View>
                <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "#09101D70" }}
        >
          <View className="justify-center items-center p-4 gap-y-6 bg-white w-5/6 rounded-2xl">
            <Image
              source={require("@/assets/icons/userprofile/confirmprofile.png")}
              style={{ width: 180, height: 150 }}
              resizeMode="contain"
            />
            <Text className="font-UrbanistSemiBold text-xl text-darkblue">
              Congratulations
            </Text>
            <Text className="font-UrbanistRegular text-center">
              Your account is ready to use. You will be redirected to the Home
              page in a few seconds.
            </Text>

            <Animated.Image
              style={{ transform: [{ rotate: spin }], width: 50, height: 50 }}
              source={require("@/assets/images/forgot-password/loading-frame.png")}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
