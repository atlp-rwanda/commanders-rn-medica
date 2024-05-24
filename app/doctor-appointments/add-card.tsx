import { amazonIcon } from "@/assets/icons/amazon";
import { mastercardWhiteIcon } from "@/assets/icons/mastercard";
import { scanIcon } from "@/assets/icons/scan";
import { DateInput, TextInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";

export default function AddCardScreen() {
  const [name, setName] = useState("Andrew Ainsley");
  const [cardNumber, setCardNumber] = useState("2672473878377285");
  const [expiryDate, setExpiryDate] = useState(
    new Date(2023, 11).toDateString()
  );
  const [cvv, setCvv] = useState("699");

  const formatCardNumber = (value: string) => {
    return value
      .split(" ")
      .map((value, index) => {
        return value
          .split("")
          .map((char, index) => {
            if (index % 4 === 0 && index !== 0) return ` ${char}`;
            return char;
          })
          .join("");
      })
      .join(" ");
  };

  const formatExpirationDate = (value: string) => {
    const date = new Date(value) || new Date();
    return date.toLocaleDateString("en-RW", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };
  return (
    <View className="px-8 flex-1">
      <NavigationHeader title="Add New Card">
        <TouchableOpacity>
          <SvgXml xml={scanIcon} className="text-gray-600" />
        </TouchableOpacity>
      </NavigationHeader>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ImageBackground
          className="rounded-[35px] overflow-hidden px-6 py-6 mb-8"
          source={require("@/assets/images/card/background.png")}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-UrbanistSemiBold text-lg">
              Mocard
            </Text>
            <SvgXml xml={amazonIcon} width={60} />
          </View>
          <Text className="mt-6 mb-8 text-white text-5xl font-UrbanistBold">
            .... .... .... ....
          </Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-white text-xs font-UrbanistSemiBold">
                Card Holder name
              </Text>
              <Text className="text-white text-xl">... ....</Text>
            </View>
            <View>
              <Text className="text-white text-xs font-UrbanistSemiBold">
                Expiry Date
              </Text>
              <Text className="text-white text-xl">.../....</Text>
            </View>
            <View>
              <SvgXml xml={mastercardWhiteIcon} height={32} />
            </View>
          </View>
        </ImageBackground>
        <View className="mb-8">
          <Text className="text-xl font-UrbanistBold mb-3">Card Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="font-UrbanistSemiBold"
          />
        </View>
        <View className="mb-8">
          <Text className="text-xl font-UrbanistBold mb-3">Card Number</Text>
          <TextInput
            value={formatCardNumber(cardNumber)}
            onChangeText={setCardNumber}
            className="font-UrbanistSemiBold"
          />
        </View>
        <View className="flex-row mb-8">
          <View className="flex-1 mr-3">
            <Text className="text-xl font-UrbanistBold mb-3">Expiry Date</Text>
            <DateInput
              value={formatExpirationDate(expiryDate)}
              onChangeText={setExpiryDate}
              className="font-UrbanistSemiBold text-gray-800"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-xl font-UrbanistBold mb-3">CVV</Text>
            <TextInput
              value={cvv}
              onChangeText={setCvv}
              className="font-UrbanistSemiBold"
            />
          </View>
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.back();
            router.setParams({ added: "1" });
          }}
        >
          <Text className="text-white font-UrbanistBold">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
