import React, { useState } from 'react';
import { View, Text, Image,TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';

function Methodcpmponent(props:any){

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
      <View className='flex gap-3'>
          <Text className='text-xl font-semibold'>You Package</Text>
          <TouchableOpacity onPress={props.handle}>
          <View className='flex flex-row justify-between items-center bg-white p-3 rounded-2xl mb-2'>
              <View className='flex flex-row items-center gap-3'>
                 <Image source={props.image}/>
                 <View>
                   <Text className='font-UrbanistBold pb-2'>{props.name}</Text>
                   <Text className='font-UrbanistMedium'>{props.define}</Text>
                </View>
              </View>
              <View>
                 <Text className='text-blue-700 font-UrbanistMedium'>$20</Text>
                 <Text className='font-UrbanistMedium'>(paid)</Text>
              </View>
           </View>
          </TouchableOpacity>
          
           <TouchableOpacity className='flex bg-blue-600 flex-row justify-center items-center gap-2 pt-2 pb-3 ml-1 rounded-full'>
              <Image source={props.icon}/>
              <Text className='text-xl font-UrbanistBold text-white'>{props.time}</Text>
           </TouchableOpacity>
      </View>
    )
}
export default Methodcpmponent