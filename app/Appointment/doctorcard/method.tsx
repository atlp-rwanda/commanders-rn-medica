import React, { useState } from 'react';
import { View, Text, Image,TouchableOpacity } from "react-native";

function Mycpmponent(props:any){
    return(
      <View className='flex gap-3'>
          <Text className='text-xl font-semibold'>You Package</Text>
          <TouchableOpacity onPress={props.handle}>
          <View className='flex flex-row justify-between items-center bg-white p-3 rounded-2xl mb-2'>
              <View className='flex flex-row items-center gap-3'>
                 <Image source={props.image}/>
                 <View>
                   <Text className='font-medium pb-2'>{props.name}</Text>
                   <Text>{props.define}</Text>
                </View>
              </View>
              <View>
                 <Text className='text-blue-700'>$20</Text>
                 <Text>(paid)</Text>
              </View>
           </View>
          </TouchableOpacity>
          
           <TouchableOpacity className='flex bg-blue-600 flex-row justify-center items-center gap-2 pt-3 pb-3 ml-1 rounded-2xl'>
              <Image source={props.icon}/>
              <Text className='text-xl text-white'>{props.time}</Text>
           </TouchableOpacity>
      </View>
    )
}
export default Mycpmponent