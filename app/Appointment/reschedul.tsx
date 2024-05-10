import React from 'react';
import { View, Text, TouchableOpacity,Image } from "react-native";
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")
import CustomCheckBox from './doctorcard/checkbox';



function ReschedulApointment(){

    return (
        <View className='flex-1 justify-between pb-12 pt-12 pl-2 pr-2'>
            <View className='flex gap-6'>
                <View className='flex flex-row gap-3'>
                <TouchableOpacity onPress={()=>router.back()}>
                    <Image source={arrow}/>
                </TouchableOpacity>
                <Text className='text-2xl font-bold'>Reschedul Appointment</Text>
                </View>
                <View className='flex gap-5  pl-0'>
                <Text className='font-semibold text-xl'>Reason for Schedule change</Text>
                <Text className='text-base'><CustomCheckBox/> I'm having a schedule clash</Text>
                <Text className='text-base'><CustomCheckBox/>  I'm not available on schedule</Text>
                <Text className='text-base'><CustomCheckBox/>  I have activity that can not be left behind</Text>
                <Text className='text-base'><CustomCheckBox/>  I don't want to tell</Text>
                <Text className='text-base'><CustomCheckBox/>  Others</Text> 
                </View>
                 <Text className='bg-slate-100 w-100 p-3 rounded-xl'>Add the necessary TypeScript declarations for your environment variables. 
                    If you're using NativeWind with TypeScript, you might need to declare any global 
                    variables or types related to your environment setup.</Text>
            </View>
             <TouchableOpacity onPress={()=>router.push("/Appointment/selectdate")}>
                <Text className='bg-blue-600 text-white text-center text-lg p-3 rounded-3xl'>Next</Text>
             </TouchableOpacity>
        </View>
    )

}
export default  ReschedulApointment