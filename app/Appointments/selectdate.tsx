import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")
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
    const [successfuly, setSuccessfuly] = useState(false);

    const time = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","15:00 PM","15:30 PM","16:00 PM","16:30",
                   "17:00 PM","17:30 PM"];

    const handleTimeSelect = (selected:any) => {
        if (selectedTime === selected) {
            setSelectedTime(null); 
        } else {
            setSelectedTime(selected);
        }
    };

    const showsuccess = () =>{
        setSuccessfuly(true);
    };

   return (
    <View className={`flex-1 pl-5 pr-5 pb-10 pt-10 justify-center ${successfuly ? 'bg-gray-600' : 'bg-white'}`}>
        <View className='flex flex-row gap-3 items-center pb-10 pt-10'>
        <TouchableOpacity onPress={()=>router.back()}>        
                    <Image source={arrow}/>
                </TouchableOpacity>
            <Text className='text-2xl font-UrbanistBold '>Reschedule Appointment</Text>
        </View>
        <Text className='text-xl font-UrbanistBold '>Select Date</Text>
        <CalendarScreen/>
        <Text className='text-xl font-UrbanistBold'>Select Hour</Text>
        <View className='flex-wrap flex-row gap-6 justify-center items-center pt-10 pb-6'>
            {time.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleTimeSelect(item)}
                    className={`p-2 w-24 flex justify-center text-blue-700  items-center  border-2 rounded-3xl border-blue-600  ${selectedTime === item ? 'bg-blue-500 text-white' : ''}`}
                >
                    <Text className={`font-UrbanistBold text-base text-blue-600 ${selectedTime === item ? 'text-white' : ''}`}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity onPress={showsuccess}>
            <Text className='bg-blue-600 text-white text-center text-xl p-3 font-UrbanistBold rounded-3xl'>Submit</Text>
         </TouchableOpacity>
         {successfuly && (
            <View className='bg-white absolute w-9/12 ml-20 rounded-3xl flex justify-center items-center p-5 '>
                <Image source={require("../../assets/Group.png")}/>
                <Text className='text-blue-700 text-xl font-UrbanistBold pt-10 pb-10'>Reschedule Successfuly</Text>
                <Text className='font-UrbanistMedium'>Appointment successfuly changed. you will recieve notification and the doctor you selected will contact you</Text>
                <TouchableOpacity>
                    <Text className='text-white bg-blue-700 rounded-3xl pb-3 pt-3 font-UrbanistBold pl-10 pr-10 my-3.5'>View Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setSuccessfuly(false)}}>
                    <Text className='text-blue-700 rounded-3xl pb-3 pt-3 pl-20 pr-20 font-UrbanistBold bg-slate-100 '>Cancel</Text>
                </TouchableOpacity>
             </View>
         )}
         
    </View>
   );
}

export default SelectDate;
