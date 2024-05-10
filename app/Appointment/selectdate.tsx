import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")

function SelectDate(){

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
        <View className='flex flex-row gap-3 items-center pb-10'>
        <TouchableOpacity onPress={()=>router.back()}>        
                    <Image source={arrow}/>
                </TouchableOpacity>
            <Text className='text-2xl font-bold '>Reschedule Appointment</Text>
        </View>
        <Text className='text-xl font-bold '>Select Date</Text>
        <CalendarScreen/>
        <Text className='text-xl font-bold'>Select Hour</Text>
        <View className='flex-wrap flex-row gap-6 justify-center items-center pt-10 pb-6'>
            {time.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleTimeSelect(item)}
                    className={`p-3 w-28 flex justify-center text-blue-700 items-center text-base border rounded-xl border-blue-700  ${selectedTime === item ? 'bg-blue-500 text-white' : ''}`}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity onPress={showsuccess}>
            <Text className='bg-blue-600 text-white text-center text-lg p-3 rounded-3xl'>Submit</Text>
         </TouchableOpacity>
         {successfuly && (
            <View className='bg-white absolute w-9/12 ml-20 rounded-xl flex justify-center items-center p-5 '>
                <Image source={require("../../assets/Group.png")}/>
                <Text className='text-blue-700 text-xl pt-10 pb-10'>Reschedule Successfuly</Text>
                <Text>Appointment successfuly changed. you will recieve notification and the doctor you selected will contact you</Text>
                <TouchableOpacity>
                    <Text className='text-white bg-blue-700 rounded-xl pb-3 pt-3 pl-10 pr-10 my-3.5'>View Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setSuccessfuly(false)}}>
                    <Text className='text-blue-700 rounded-xl pb-3 pt-3 pl-20 pr-20 bg-slate-100 '>Cancel</Text>
                </TouchableOpacity>
             </View>
         )}
         
    </View>
   );
}

export default SelectDate;
