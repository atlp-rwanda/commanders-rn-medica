
import React, { useState } from 'react';
import { View, Text, Image } from "react-native";


function Card(props:any){

    return (
        <View className='bg-white rounded-xl flex flex-row p-4 w-400 items-center gap-7'>
            <Image source={props.imager} className='w-3/12 h-24 rounded-xl'/>
            <View>
                <Text className='text-xl font-bold pb-2'>{props.name}</Text>
                <View className='flex items-center justify-center flex-row'>
                    <Text className='pb-3 pt-3'>{props.typecall} - </Text>
                    <Text style={props.stile}>{props.action}</Text>
                  </View>
                <Text>{props.date} | <Text>{props.time}</Text></Text>
            </View>
            <Image source={props.imagerr}/>
        </View>
    )

}
export default Card
