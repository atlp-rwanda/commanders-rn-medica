
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


function Cardscomponent(props:any){

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
        <View style={props.bacColor} className={`bg-white rounded-3xl pl-12 pr-12 pt-3 pb-3 w-400 shadow-md mb-4`}>
            <View className='flex flex-row gap-6 justify-center items-center border-b-2 border-slate-100 pb-3'>
            <Image source={props.imager} className='w-3/12 h-24 rounded-xl'/>
            <View>
                <Text className='text-xl font-UrbanistBold pb-2'>{props.name}</Text>
                  <View className='flex items-center justify-center flex-row'>
                    <Text className='pb-3 pt-3 font-UrbanistRegular'>{props.typecall} - </Text>
                    <Text style={props.stile} >{props.action}</Text>
                  </View>
                <Text className='font-UrbanistRegular pt-3'>{props.date} | <Text>{props.time}</Text></Text>
            </View>
            <TouchableOpacity onPress={props.chooice}>
              <Image source={props.imagerr}/>
            </TouchableOpacity>
         </View>
         <View style={styles.botfles}>
            <Text className='text-blue-500 rounded-3xl pl-5 pr-5 pt-2 pb-2 border-2 border-blue-600 font-UrbanistBold'>{props.chance}</Text>
            <TouchableOpacity onPress={props.fact}>
               <Text className='bg-blue-500 rounded-2xl pl-5  pr-5 pt-2 pb-2 text-white font-UrbanistBold'>{props.cantchance}</Text>
            </TouchableOpacity>
         </View>
        </View>
    )

}
export default Cardscomponent

const styles = StyleSheet.create({
    buttobok:{
        color:'#246BFD',
        borderRadius:10,
        paddingLeft:30,
        paddingRight:30,
        borderWidth:2,
        borderColor:'#246BFD'
    },
    butleave:{
       backgroundColor:'#246BFD',
       color:'#fff',
       borderRadius:10,
       paddingLeft:30,
       paddingRight:30,
       paddingTop:4,
       paddingBottom:4
    },
    botfles:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:20,
        alignItems:'center',
        paddingTop:20
    }



})