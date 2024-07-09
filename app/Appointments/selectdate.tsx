import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ScrollView } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router, useGlobalSearchParams } from 'expo-router';
const arrow = require("../../assets/icons/arrow-left.png");
import { useFonts } from 'expo-font';
import { supabase } from "../supabase";

function SelectDate() {
  const [fontLoaded] = useFonts({
    'UrbanistBold': require('../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistRegular': require("../../assets/fonts/Urbanist-Regular.ttf"),
    'Urbanist-SemiBold': require("../../assets/fonts/Urbanist-SemiBold.ttf"),
    'UrbanistMedium': require("../../assets/fonts/Urbanist-Medium.ttf")
  });

  if (!fontLoaded) {
    return null;
  }

  const { reason, appointmentId, appointmentTime, appointmentDate } = useGlobalSearchParams<{ reason: string, appointmentId: string, appointmentTime: string, appointmentDate: string }>();

  const parsedDate = appointmentDate ? new Date(appointmentDate) : new Date();
  const parsedTime = appointmentTime || null;
  const [selectedTime, setSelectedTime] = useState<string | null>(parsedTime);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(parsedDate);

  const hours = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];


  const handleTimeSelect = (selected: string) => {
    setSelectedTime(selected === formattedTime ? null : selected);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(new Date(date));
  };

    const [hour, minute] = (selectedTime || "").split(/[: ]/);
     const formattedHour = parseInt(hour);
    const formattedTime = `${String(formattedHour).padStart(2, '0')}:${minute}`;

  const handleSubmit = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log("Error:", userError);
      return;
    }
    
    const userId = userData?.user?.id;

    try {
      const { data: appointmentUpdated, error: appointmentNotUpdated } = await supabase
        .from("appointment")
        .update({ appointment_date: selectedDate.toISOString(), appointment_time: formattedTime,Reason_couse_toUpdated:reason })
        .eq("id", appointmentId)
        .eq("patient_id", userId);

      if (appointmentNotUpdated) {
        console.log("Error:", appointmentNotUpdated);
      } else {
        console.log("Appointment successfully updated", appointmentUpdated);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalOverlay}>
          <View className='bg-white absolute w-[340px] rounded-[48px] flex justify-center items-center p-10'>
            <Image source={require("../../assets/appointmentIcon/Group.png")} />
            <Text className='text-blue-700 text-lg font-UrbanistBold pt-5 pb-5'>Rescheduling Success!</Text>
            <Text className='font-UrbanistRegular text-[16px]'>
              Appointment successfully changed. You will receive notification and the doctor you selected will contact you.
            </Text>
            <TouchableOpacity className='bg-blue-700 rounded-3xl pb-3 w-64 pt-3 pl-10 pr-10 my-3.5' onPress={()=>router.push("/(tabs)/appointment")}>
              <Text className='text-white font-UrbanistBold text-center'>View Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <View className='rounded-3xl pb-3 pt-3 pl-20 pr-20 w-64 bg-slate-100'>
                <Text className='text-blue-700 text-center font-UrbanistBold'>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className='flex-1 pl-5 pr-5 pb-10 pt-5 justify-center '>
          <View className='flex flex-row gap-3 items-center pb-5'>
            <TouchableOpacity onPress={() => router.back()}>
              <Image className='w-[35px] h-[35px]' source={arrow} />
            </TouchableOpacity>
            <Text className='text-2xl font-UrbanistBold '>Reschedule Appointment</Text>
          </View>
          <Text className='text-xl font-UrbanistBold pb-3'>Select Date</Text>
          <CalendarScreen
            onDateChange={handleDateChange}
          />
          <Text className='text-xl font-UrbanistBold pt-3'>Select Hour</Text>
          <View className="justify-between w-[100%] flex-row flex-wrap pt-5 pb-5">
            {hours.map((hour) => (
              <View key={hour} className="flex-grow-[1]">
                <TouchableOpacity
                  className={
                    "py-2 px-4 rounded-[40px] items-center justify-center border-2 border-primary-500 mr-3 mb-4 " +
                    (selectedTime === hour
                      ? "bg-primary-500"
                      : "bg-transparent")
                  }
                  onPress={() => handleTimeSelect(hour)}
                >
                  <Text
                    className={
                      "font-UrbanistBold " +
                      (selectedTime === hour
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

          <View style={styles.butshadow} className='bg-blue-600 rounded-[100px] w-[370px] h-[58px] mt-5 justify-center items-center'>
            <TouchableOpacity
              onPress={handleSubmit}
            >
              <Text className='text-white text-lg font-UrbanistBold'>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default SelectDate;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  butshadow: {
    shadowColor: '#246bfd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});