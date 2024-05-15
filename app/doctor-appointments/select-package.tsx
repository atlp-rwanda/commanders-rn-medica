import { callIcon } from "@/assets/icons/call";
import { chatIcon } from "@/assets/icons/chat";
import { timeCircleIcon } from "@/assets/icons/time";
import { videoIcon } from "@/assets/icons/video";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Package } from "@/components/cards/packages/package";
import { Select } from "@/components/select";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function SelectPackageScreen() {
  const [selectedPackage, setSelectedPackage] = useState("1");
  const [selectedDuration, setSelectedDuration] = useState("1");

  const packages = [
    {
      key: "1",
      title: "Messaging",
      description: "Chat messages with doctor",
      price: "$20",
      period: "30 mins",
      icon: chatIcon,
    },
    {
      key: "2",
      title: "Voice Call",
      description: "Voice call with doctor",
      price: "$40",
      period: "30 mins",
      icon: callIcon,
    },
    {
      key: "3",
      title: "Video Call",
      description: "Video call with doctor",
      price: "$60",
      period: "30 mins",
      icon: videoIcon,
    },
  ];

  const durations = [
    { key: "1", value: "30 minutes" },
    { key: "2", value: "1 hour" },
    { key: "3", value: "2 hours" },
    { key: "4", value: "3 hours" },
  ];

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Select Package" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} bounces={false}>
        <View className="mt-5 mb-8">
          <Text className="text-xl font-UrbanistBold mb-3">
            Select Duration
          </Text>
          <Select
            data={durations}
            placeholder=""
            defaultOption={durations[0]}
            setSelected={(val: string) => setSelectedDuration(val)}
            icon={
              <SvgXml
                xml={timeCircleIcon}
                className="text-gray-800"
                width={22}
                height={22}
              />
            }
          />
        </View>
        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-3">Select Package</Text>

          <View>
            {packages.map((pkg) => (
              <Package
                {...pkg}
                selected={selectedPackage == pkg.key}
                onPress={() => setSelectedPackage(pkg.key)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push("/doctor-appointments/patient-details");
          }}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
