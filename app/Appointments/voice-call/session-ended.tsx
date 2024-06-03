import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function VoiceCallSessionEnded() {
  return (
    <View className="flex-1 px-6">
      <NavigationHeader title="" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View className="items-center justify-center">
          <Image
            source={require("@/assets/images/time-bg.png")}
            className="h-48 my-4"
            resizeMode="contain"
          />
        </View>
        <Text className="text-lg font-UrbanistBold text-center">
          The consultation session has ended
        </Text>
        <Text className="text-center">
          Recordings have been saved in activity.
        </Text>
        <View className="items-center my-6">
          <Image
            source={require("@/assets/doctors/doc1.png")}
            className="rounded-full object-cover w-36 h-36 my-4"
          />
          <Text className="text-3xl font-UrbanistSemiBold mb-3">
            Dr. Eloi Mwokolo
          </Text>
          <Text className="mb-2">Opthamologist</Text>
          <Text className="">Muhima</Text>
        </View>
        <View className="border-b border-gray-100 mb-4">
        </View>
        <View className="py-3 flex-row gap-x-3">
          <TouchableOpacity
            className="flex-1 bg-primary-100 p-4 rounded-full items-center"
            onPress={() => {
              router.dismissAll();
              router.dismiss();
              router.push("/(tabs)/")
            }}
          >
            <Text className="text-primary-500 font-UrbanistBold">
              Back to Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-primary-500 p-4 rounded-full items-center"
            onPress={() => router.push("/Appointments/voice-call/writeReview")}
          >
            <Text className="text-white font-UrbanistBold">Leave a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
