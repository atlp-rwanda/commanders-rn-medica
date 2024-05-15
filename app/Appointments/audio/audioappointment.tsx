
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from "react-native";
import CalendarScreen from '../doctorcard/calendal';
import { router } from 'expo-router';
const arrow = require("../../../assets/Arrow.png")
import DoctorCard from "../../../components/cards/doctorCard"
import Methodcpmponent from "../doctorcard/method"
import { useFonts } from 'expo-font';
import MethodCards from '../doctorcard/methodcard';




function Messaging(){
   const [fontLoaded]=useFonts({
      'UrbanistBold':require('../../../assets/fonts/Urbanist-Bold.ttf'),
      'UrbanistRegular':require("../../../assets/fonts/Urbanist-Regular.ttf"),
      'Urbanist-SemiBold':require("../../../assets/fonts/Urbanist-SemiBold.ttf"),
      'UrbanistMedium':require("../../../assets/fonts/Urbanist-Medium.ttf")
     })
      if(!fontLoaded){
     return null
     }
    return(
       <View className='flex-1 justify-around p-5 '>
           <View className='flex flex-row justify-between items-center pt-14 pb-5'>
              <TouchableOpacity onPress={()=>router.back()} className='flex flex-row items-center gap-4'>
                 <Image source={arrow}/>
                 <Text className='text-2xl font-UrbanistBold'>My Appointment</Text>
              </TouchableOpacity>
              <Image source={require("../../../assets/More.png")}/>
           </View>
           <MethodCards
              name='Twizerimana'
              doctor={require("../../../assets/Muhawe.jpeg")}
              define='Immunologist'
              decription='The valler hospital in calfonia US'
           />
           <View className='flex gap-5'>
               <Text className='text-xl font-Urbanist-SemiBold'>Scheduled Appointment</Text>
               <Text className='font-UrbanistRegular'>Today, Dicember 22,2022</Text>
               <Text className='font-UrbanistRegular'>16:00-16:30 PM(30 minuts)</Text>
               <Text className='text-xl font-Urbanist-SemiBold'>Patient Information</Text>
               <Text className='text-lg font-UrbanistMedium'>Full Name     <Text>: Andre onana</Text></Text>
               <Text className='text-lg font-UrbanistMedium'>Gender          <Text>: Male</Text></Text>
               <Text className='text-lg font-UrbanistMedium'>Age                <Text>: 27</Text></Text>
               <View style={styles.division}>
                 <Text className='text-lg font-UrbanistMedium'>Problem</Text>
                 <Text className='w-72 font-UrbanistRegular'><Text>: </Text> If you're not comfortable with the command line, GitHub's web interface provides a way to 
                    <Text className='text-blue-700 font-UrbanistRegular'> View more</Text></Text>
               </View>
           </View>
           <Methodcpmponent
            name='Voice call'
            define="Voice call with doctor"
            image={require("../../../assets/voice.png")}
            time='Voice call(start at 14:00 PM)'
            icon={require("../../../assets/Call.png")}
            handle={()=>router.push("/Appointments/audio/voicecallring")}
           />
       </View>
    )

}
export default Messaging
const styles=StyleSheet.create({
    division:{
       display:'flex',
       flexDirection:'row',
       gap:30
    }
})