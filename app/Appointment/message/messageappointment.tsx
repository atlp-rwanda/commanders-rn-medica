import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import CalendarScreen from '../doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../../assets/Arrow.png")
import DoctorCard from "../../../components/cards/doctorCard"
import Mycpmponent from "../doctorcard/method"




function Messaging(){
    return(
       <View className='flex-1 justify-around p-5'>
           <View className='flex flex-row justify-between items-center pt-14'>
              <TouchableOpacity onPress={()=>router.back()} className='flex flex-row items-center gap-4'>
                 <Image source={arrow}/>
                 <Text className='text-2xl font-bold'>My Appointment</Text>
              </TouchableOpacity>
              <Image source={require("../../../assets/More.png")}/>
           </View>
           <DoctorCard
             name="Twizerimana"
            role="Dr"
             stars="hgjyg"
             hospital="hgjhgyj"
             reviews="tfhtfyj"
             images={require("../../../assets/Kakabo.jpeg")}
             image={arrow}
             onPress={()=>router.back()}
           />
           <View className='flex gap-5'>
               <Text className='text-xl font-semibold'>Scheduled Appointment</Text>
               <Text>Today, Dicember 22,2022</Text>
               <Text>16:00-16:30 PM(30 minuts)</Text>
               <Text className='text-xl font-semibold'>Patient Information</Text>
               <Text className='text-lg'>Full Name     <Text>: Andre onana</Text></Text>
               <Text className='text-lg'>Gender          <Text>: Male</Text></Text>
               <Text className='text-lg'>Age                <Text>: 27</Text></Text>
               <View className='flex flex-row gap-4 '>
                 <Text className='text-lg'>Problem</Text>
                 <Text className='w-72'>: If you're not comfortable with the command line, GitHub's web interface provides a way to 
                    <Text className='text-blue-700'>View more</Text></Text>
               </View>
           </View>
           <Mycpmponent
            name='Messaging'
            define="Chat message with doctor"
            image={require("../../../assets/message.png")}
            time='Message(start at 16:00 PM)'
            icon={require("../../../assets/Exclude.png")}
           />
       </View>
    )

}
export default Messaging