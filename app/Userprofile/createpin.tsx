import { back } from "@/assets/icons/userprofile/icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "expo-router";
import { KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
export default function CreatePin() {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView>
            <SafeAreaView>
                <View className="my-4 flex-row gap-x-2 mt-10 ml-2">
                    <SvgXml xml={back} onPress={() => navigation.goBack()} />
                    <Text className="text-xl text-black font-UrbanistSemiBold">Create New Pin </Text>
                </View>
                <View>
                    <Text className="text-lg text-center mt-20 px-5 font-UrbanistRegular">
                        Add a PIN number to make your account more secure
                    </Text>
                </View>
                <View className="flex-row justify-center">
                    <OTPInputView
                        style={{ width: '70%', height: 200 }}
                        pinCount={4}
                        autoFocusOnLoad={false}
                        secureTextEntry={true}

                        codeInputFieldStyle={{
                            width: 60,
                            height: 50,
                            marginHorizontal: 5,
                            borderWidth: 1,
                            color: 'black',
                            fontSize: 40,
                            borderRadius: 10,
                            borderColor: '#00000020',
                            fontFamily: 'UrbanistBold',
                            textAlign: 'center',
                            backgroundColor: "#FAFAFA",
                        }}
                        codeInputHighlightStyle={
                            {
                                borderColor: '#246BFD',
                                borderWidth: 1,
                                backgroundColor: "#246BFD14",

                            }
                        }
                        onCodeFilled={(code => alert(code))}
                    />
                </View>
                <View>
                    <TouchableOpacity className="bg-lightblue w-7/8 rounded-3xl py-3 mt-2 mx-5" onPress={() => navigation.navigate("Userprofile/setfingerprint" as never)}>
                        <Text className="text-def text-base text-center font-UrbanistBold">Continue</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )

}