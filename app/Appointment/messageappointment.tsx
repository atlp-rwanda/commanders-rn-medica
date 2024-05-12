import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")
import DoctorCard from "../../components/cards/doctorCard"


function Messaging(){
    return(
       <View className='flex-1 justify-around p-5'>
           <View className='flex flex-row justify-between items-center pt-14'>
              <TouchableOpacity onPress={()=>router.back()} className='flex flex-row items-center gap-4'>
                 <Image source={arrow}/>
                 <Text>My Appointment</Text>
              </TouchableOpacity>
              <Image source={require("../../assets/More.png")}/>
           </View>
           <DoctorCard
             name="Twizerimana"
            role="Dr"
             stars="hgjyg"
             hospital="hgjhgyj"
             reviews="tfhtfyj"
             images={require("../../assets/Muhawe.jpeg")}
             image={arrow}
             onPress={()=>router.back()}
           />
           <View className='flex gap-5'>
               <Text>Scheduled Appointment</Text>
               <Text>Today, Dicember 22,2022</Text>
               <Text>16:00-16:30 PM(30 minuts)</Text>
               <Text>Patient Information</Text>
               <Text>Full Name:<Text>Andre onana</Text></Text>
               <Text>Gender:<Text>Male</Text></Text>
               <Text>Age:<Text>27</Text></Text>
               <View className='flex flex-row gap-2'>
                 <Text>Problem:</Text>
                 <Text className='w-64'>If you're not comfortable with the command line, GitHub's web interface provides a way to 
                    <Text className='text-blue-700'>View more</Text></Text>
               </View>
           </View>
           <Text>You Package</Text>
           <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-3'>
                 <Image source={require("../../assets/message.png")}/>
                 <View>
                   <Text>Messaging</Text>
                   <Text>Chat message with doctor</Text>
                </View>
              </View>
              <View>
                 <Text className='text-blue-700'>$20</Text>
                 <Text>(paid)</Text>
              </View>
           </View>
           <TouchableOpacity className='flex bg-blue-600 flex-row justify-center gap-3 pt-3 pb-3 rounded-2xl'>
              <Image source={require("../../assets/Exclude.png")}/>
              <Text>Message(start at 16:00 PM)</Text>
           </TouchableOpacity>
       </View>
    )

}
export default Messaging