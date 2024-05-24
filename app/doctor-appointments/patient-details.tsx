import { TextInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Select } from "@/components/select";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function PatientDetailsScreen() {
  const dimensions = useWindowDimensions();
  const [names, setNames] = useState("Andrew Ainsley");
  const [gender, setGender] = useState("1");
  const [age, setAge] = useState("25");
  const [problem, setProblem] = useState("Hello Dr. Jenny, I have a problem with my immune system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.");

  const genders = [
    { key: 1, value: "Male" },
    { key: 2, value: "Female" },
  ];

  const ageArray = Array.from({ length: 100 }, (_, i) => {
    return { key: i, value: i + 1 + " years" }
  });

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Patient Details" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior="padding"
          className="flex-1"
          style={{ maxHeight: dimensions.height, }}
        >
          <View className="mt-4 mb-3">
            <Text className="text-lg font-UrbanistBold mb-2">Full Name</Text>
            <TextInput placeholder="Enter full name"
              value={names}
              onChangeText={setNames}
            />
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">Gender</Text>
            <Select data={genders} setSelected={setGender} defaultOption={genders[0]} />
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">Your Age</Text>
            <Select data={ageArray} setSelected={setAge} defaultOption={ageArray[24]} maxHeight={150} />
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">
              Write Your Problem
            </Text>
            <TextInput
              placeholder="Enter problem"
              value={problem}
              onChangeText={setProblem}
              multiline={true}
              numberOfLines={5}
              className="h-52"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push("/doctor-appointments/payments")
          }}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
