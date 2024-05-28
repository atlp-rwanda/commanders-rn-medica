import { callIcon } from "@/assets/icons/call";
import { moreOutlinedIcon } from "@/assets/icons/more";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { MinimalDoctorCard } from "@/components/cards/doctors/MinimalDoctorCard";
import { Package } from "@/components/cards/packages/package";
import { RootState } from "@/redux/store/store";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function VoiceCallScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(0);
  const doctor = useSelector((state: RootState) => state.doctors.doctors[0]);
  const pkg = {
    key: "2",
    title: "Voice Call",
    description: "Voice call with doctor",
    price: "$40",
    period: "30 mins",
    icon: callIcon,
  };
  return (
    <View className="flex-1 px-6">
      <NavigationHeader title="My Appointment">
        <SvgXml xml={moreOutlinedIcon} className="text-gray-700" />
      </NavigationHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 10,
        }}
      >
        <View className="mb-5">
          <MinimalDoctorCard {...doctor} />
        </View>
        <View className="mb-5">
          <Text className="text-xl font-UrbanistBold mb-4">
            Scheduled Appointment
          </Text>
          <Text className="font-UrbanistRegular mb-3">Today, May 28, 2024</Text>
          <Text className="font-UrbanistRegular mb-3">
            16:00 - 16:30 PM (30 minutes)
          </Text>
        </View>
        <View className="mb-5">
          <Text className="text-xl font-UrbanistBold mb-4">
            Patient Information
          </Text>
          <View className="flex-row">
            <View>
              <Text className="mb-3">Full Name</Text>
              <Text className="mb-3">Gender</Text>
              <Text className="mb-3">Age</Text>
              <Text className="mb-3">Problem</Text>
            </View>
            <View>
              <Text className="mx-3 mb-3">:</Text>
              <Text className="mx-3 mb-3">:</Text>
              <Text className="mx-3 mb-3">:</Text>
              <Text className="mx-3 mb-3">:</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-3">Fred Shema</Text>
              <Text className="mb-3">Male</Text>
              <Text className="mb-3">27</Text>
              <Text className="mb-3">
                I have been feeling pain in my chest for the past 2 days.{" "}
                <Text className="text-primary-500 font-UrbanistRegular">
                  View more
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="mb-5">
          <Text className="text-xl font-UrbanistBold mb-4">Your Package</Text>
          <Package
            {...pkg}
            selected={selected === 1}
            onPress={() => setSelected(1)}
          />
          <TouchableOpacity
            className="bg-primary-500 p-4 rounded-full items-center flex-row justify-center mt-4"
            onPress={() => {
              router.push("/Appointments/voice-call/call");
            }}
          >
            <SvgXml
              xml={callIcon}
              className="text-white mr-3"
              width={20}
              height={20}
            />
            <Text className="text-white font-UrbanistBold">
              Voice Call (Start at 14:00 PM)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
