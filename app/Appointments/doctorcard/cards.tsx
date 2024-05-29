
import React, { useState } from 'react';
import { View, Text, Image,StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


function Cardcomponent(props:any){

    const [fontLoaded]=useFonts({
        'UrbanistBold':require('../../../assets/fonts/Urbanist-Bold.ttf'),
        'UrbanistRegular':require("../../../assets/fonts/Urbanist-Regular.ttf"),
        'Urbanist-SemiBold':require("../../../assets/fonts/Urbanist-SemiBold.ttf"),
        'UrbanistMedium':require("../../../assets/fonts/Urbanist-Medium.ttf")
       })
        if(!fontLoaded){
       return null
       }

    return (
        <View className='bg-white rounded-xl flex flex-row pb-3 pl-3 pr-3 items-center gap-4 shadow-md mb-7' style={styles.shadow}>
            <Image source={props.imager} className='w-3/12 h-28 rounded-xl'/>
            <View>
                <Text className='text-xl font-UrbanistBold pb-2'>{props.name}</Text>
                <View className='flex items-center justify-center flex-row'>
                    <Text className='pb-3 pt-3 font-UrbanistRegular'>{props.typecall}  -   </Text>
                    <Text style={props.stile}>{props.action}</Text>
                  </View>
                <Text className='font-UrbanistRegular pt-3'>{props.date}   |   <Text>{props.time}</Text></Text>
            </View>
            <Image source={props.imagerr}/>
        </View>
    )

}
export default Cardcomponent
const styles=StyleSheet.create({
   shadow:{
    elevation: 10,
   }
})
