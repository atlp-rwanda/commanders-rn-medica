import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Calendar } from "@/components/cards/calendar";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const hours = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "15:00 PM",
  "15:30 PM",
  "16:00 PM",
  "16:30 PM",
  "17:00 PM",
  "17:30 PM",
];

const today = new Date();

export default function BookAppointmentScreen() {
  const [date, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Book Appointment" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mt-3 mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">Select Date</Text>
          <Calendar date={date} minDate={today.toDateString()} onDateChange={setDate} />
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-3">Select Hour</Text>
          <View className="justify-between w-[100%] flex-row flex-wrap">
            {hours.map((hour) => (
              <View key={hour} className="flex-grow-[1]">
                <TouchableOpacity
                  className={
                    "py-2 px-4 rounded-[40px] items-center justify-center border-2 border-primary-500 mr-3 mb-4 " +
                    (selectedHour === hour
                      ? "bg-primary-500"
                      : "bg-transparent")
                  }
                  onPress={() => setSelectedHour(hour)}
                >
                  <Text
                    className={
                      "font-UrbanistBold " +
                      (selectedHour === hour
                        ? " text-white"
                        : "text-primary-500")
                    }
                  >
                    {hour}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push("/doctor-appointments/select-package");
          }}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
