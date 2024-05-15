import React, { useState } from 'react';
import { View, Text, Image,StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


function MethodCards(props:any){

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
       <View className='bg-white rounded-3xl flex flex-row p-3 gap-3'>
         <Image style={styles.image} source={props.doctor}/>
         <View>
            <Text className='font-UrbanistBold text-xl pb-3 border-b-2 border-indigo-100'>{props.name}</Text>
            <Text className='font-UrbanistMedium pt-3 pb-3'>{props.define}</Text>
            <Text className='font-UrbanistMedium'>{props.decription}</Text>
         </View>
       </View>
    )

}
export default MethodCards

const styles = StyleSheet.create({
      image:{
        width:120,
        height:120,
        borderRadius:10
      }
})