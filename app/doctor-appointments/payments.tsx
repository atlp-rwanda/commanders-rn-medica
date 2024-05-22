import { appleIcon } from "@/assets/icons/apple";
import { googleIcon } from "@/assets/icons/google";
import { mastercardColorIcon } from "@/assets/icons/mastercard";
import { paypalIcon } from "@/assets/icons/paypal";
import { scanIcon } from "@/assets/icons/scan";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Radio } from "@/components/radio";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function PaymentsScreen() {
  const [selected, setSelected] = useState(0);
  const paymentMethods = [
    {
      name: "PayPal",
      icon: paypalIcon,
    },
    {
      name: "Google Pay",
      icon: googleIcon,
    },
    {
      name: "Apple Pay",
      icon: appleIcon,
    },
    {
      name: "4679",
      icon: mastercardColorIcon,
      custom: true,
    },
  ];

  const { added } = useLocalSearchParams<{ added: string }>();

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Payments">
        <TouchableOpacity>
          <SvgXml xml={scanIcon} className="text-gray-600" />
        </TouchableOpacity>
      </NavigationHeader>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mt-6 font-UrbanistSemiBold text-gray-600">
          Select the payment method you want to use.
        </Text>
        <View className="flex my-5">
          {paymentMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center px-5 py-6 my-2 rounded-2xl bg-white`}
              onPress={() => setSelected(index)}
            >
              <SvgXml
                xml={method.icon}
                width={32}
                height={32}
                className="text-gray-700 mr-6"
              />
              {method.custom && (
                <Text className="font-UrbanistBold text-4xl bottom-2">
                  ... ... ... ...{" "}
                </Text>
              )}
              <Text className="text-left flex-1 text-lg font-UrbanistBold">
                {method.name}
              </Text>
              <Radio selected={selected === index} />
            </TouchableOpacity>
          ))}
        </View>
        <View className="py-3">
          <TouchableOpacity
            className="bg-primary-100  p-4 rounded-full items-center"
            onPress={() => {
              router.push("/doctor-appointments/add-card");
            }}
          >
            <Text className="text-primary-500 font-UrbanistBold">
              Add New Card
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push("/doctor-appointments/review-summary");
          }}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
