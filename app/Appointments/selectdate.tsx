import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image,Modal,StyleSheet,ScrollView } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../assets/icons/arrow-left.png")
import { useFonts } from 'expo-font';

function SelectDate(){

    const [fontLoaded]=useFonts({
        'UrbanistBold':require('../../assets/fonts/Urbanist-Bold.ttf'),
        'UrbanistRegular':require("../../assets/fonts/Urbanist-Regular.ttf"),
        'Urbanist-SemiBold':require("../../assets/fonts/Urbanist-SemiBold.ttf"),
        'UrbanistMedium':require("../../assets/fonts/Urbanist-Medium.ttf")
       })
        if(!fontLoaded){
       return null
       }

    const [selectedTime, setSelectedTime] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const time = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","15:00 PM","15:30 PM","16:00 PM","16:30 PM",
                   "17:00 PM","17:30 PM"];

    const handleTimeSelect = (selected:any) => {
        if (selectedTime === selected) {
            setSelectedTime(null); 
        } else {
            setSelectedTime(selected);
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
            <View className='bg-white absolute w-[340px] rounded-[48px] flex justify-center items-center p-10 '>
                <Image source={require("../../assets/appointmentIcon/Group.png")}/>
                <Text className='text-blue-700 text-lg font-UrbanistBold pt-5 pb-5'>Rescheduling Success!</Text>
                <Text className='font-UrbanistRegular text-[16px]'>Appointment successfuly changed. You will receive notification and the doctor you selected will contact you</Text>
                <TouchableOpacity className='bg-blue-700 rounded-3xl pb-3 w-64 pt-3 pl-10 pr-10 my-3.5'>
                    <Text className='text-white font-UrbanistBold text-center'>View Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   onPress={() => {
                    setIsModalVisible(false);
                  }}
                > 
                    <View className=' rounded-3xl pb-3 pt-3 pl-20 pr-20 w-64 bg-slate-100 '>
                    <Text className='text-blue-700 text-center font-UrbanistBold '>Cancel</Text>
                    </View>
                </TouchableOpacity>
             </View>
            </View>
        </Modal>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className='flex-1 pl-5 pr-5 pb-10 pt-5 justify-center '>
        <View className='flex flex-row gap-3 items-center pb-5'>
        <TouchableOpacity onPress={()=>router.back()}>        
                    <Image  className='w-[35px] h-[35px]' source={arrow}/>
                </TouchableOpacity>
            <Text className='text-2xl font-UrbanistBold '>Reschedule Appointment</Text>
        </View>
        <Text className='text-xl font-UrbanistBold pb-3'>Select Date</Text>
        <CalendarScreen/>
        <Text className='text-xl font-UrbanistBold pt-3'>Select Hour</Text>
        <View className="justify-between w-[100%] flex-row flex-wrap pt-5 pb-5">
            {time.map((hour) => (
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
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
            <Text className=' text-white  text-lg font-UrbanistBold '>Submit</Text>
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
    butshadow:{
        shadowColor: '#246bfd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
})
