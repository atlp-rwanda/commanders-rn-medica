import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Calendar } from "@/components/cards/calendar";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../supabase";

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
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const [date, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");
  const [message, setMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointment();
  }, [date]);

  const fetchAppointment = async () => {
    const { data: appointmentExist, error } = await supabase
      .from("appointment")
      .select("appointment_date, appointment_time")
      .eq("doctor_id", doctorId)
      .eq("appointment_date", date.toISOString().split("T")[0]);

    if (error && error.code !== "PGRST116") {
      console.log(error);
      return;
    }

    if (appointmentExist) {
      const bookedTimes = appointmentExist.map((appointment) => appointment.appointment_time.slice(0, 5));
      setBookedTimes(bookedTimes);
    } else {
      setBookedTimes([]);
    }
  };

  const handleNext = async () => {
    if (!selectedHour) {
      setMessage('Please select the appointment time');
      return;
    }

    const [hour, minute] = selectedHour.split(/[: ]/);
    const formattedHour = parseInt(hour);
    const formattedTime = `${String(formattedHour).padStart(2, '0')}:${minute}`;

    try {
      const { data: appointmentExist, error } = await supabase
        .from("appointment")
        .select("*")
        .eq("doctor_id", doctorId)
        .eq("appointment_date", date.toISOString().split("T")[0])
        .eq("appointment_time", formattedTime)
        .single();

      if (error && error.code !== "PGRST116") {
        console.log(error);
        return;
      }

      if (appointmentExist) {
        alert("This date and time you selected is already booked, please select another.");
        return;
      }

      router.push({
        pathname: "/doctor-appointments/select-package",
        params: { date: date.toISOString().split('T')[0], time: formattedTime ,doctorId}
      });
    } catch (error) {
      console.error("Error checking appointment:", error);
    }
  };

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Book Appointment" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mt-3 mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">Select Date</Text>
          <Text className="text-[18px] font-UrbanistRegular text-center text-[#913831]">{message}</Text>
          <Calendar date={date} minDate={today.toDateString()} onDateChange={setDate} />
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-3">Select Hour</Text>
          <View className="justify-between w-[100%] flex-row flex-wrap">
            {hours.map((hour) => {
              const [hourString, minuteString] = hour.split(/[: ]/);
              const formattedHour = parseInt(hourString);
              const formattedTime = `${String(formattedHour).padStart(2, '0')}:${minuteString}`;
              const isBookedTime = bookedTimes.includes(formattedTime);

              return (
                <View key={hour} className="flex-grow-[1]">
                  <TouchableOpacity
                    className={`py-2 px-4 rounded-[40px] items-center justify-center border-2 mr-3 mb-4 ${isBookedTime ? "bg-gray-400 border-gray-400" : selectedHour === hour ? "bg-primary-500 border-primary-500" : "bg-transparent border-primary-500"}`}
                    onPress={() => !isBookedTime && setSelectedHour(hour)}
                    disabled={isBookedTime}
                  >
                    <Text
                      className={`font-UrbanistBold ${isBookedTime ? "text-white" : selectedHour === hour ? "text-white" : "text-primary-500"}`}
                    >
                      {hour}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={handleNext}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
