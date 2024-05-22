import { NavigationHeader } from "@/components/NavigationHeader";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { router, useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function PinScreen() {
    const dimensions = useWindowDimensions();
    const { redirect } = useLocalSearchParams<{ redirect: string }>();
    return (
        <KeyboardAvoidingView className="flex-1 px-8" contentContainerStyle={{ flex: 1 }} behavior="padding" style={{ maxHeight: dimensions.height }}>
            <NavigationHeader title="Enter Your PIN" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-lg mt-20 text-center font-UrbanistRegular">
                    Ente your PIN to confirm appointment
                </Text>
                <View className="flex-row justify-center items-center mx-auto">
                    <OTPInputView
                        style={{ height: 200 }}
                        pinCount={4}
                        autoFocusOnLoad={false}
                        secureTextEntry={true}
                        codeInputFieldStyle={{
                            width: 60,
                            height: 50,
                            borderWidth: 1,
                            color: 'black',
                            fontSize: 40,
                            borderRadius: 10,
                            marginHorizontal: "auto",
                            borderColor: '#00000020',
                            fontFamily: 'UrbanistBold',
                            textAlign: 'center',
                            backgroundColor: "#FAFAFA",
                        }}
                        codeInputHighlightStyle={{
                            borderColor: '#246BFD',
                            borderWidth: 1,
                            backgroundColor: "#246BFD14",

                        }}
                    />
                </View>
            </ScrollView>
            <View className="py-3">
                <TouchableOpacity className="bg-primary-500 rounded-3xl py-3 mt-2"
                    onPress={() => {
                        if (redirect) {
                            router.replace(redirect)
                        }
                    }
                    }>
                    <Text className="text-def text-base text-center font-UrbanistBold">Continue</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )

}