
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";


function Cards(props:any){

    return (
        <View className='bg-white rounded-xl p-3 w-400'>
            <View className='flex flex-row gap-6 justify-center items-center'>
            <Image source={props.imager} className='w-3/12 h-24 rounded-xl'/>
            <View>
                <Text className='text-xl font-bold pb-2'>{props.name}</Text>
                  <View className='flex items-center justify-center flex-row'>
                    <Text className='pb-3 pt-3'>{props.typecall} - </Text>
                    <Text style={props.stile} >{props.action}</Text>
                  </View>
                <Text>{props.date} | <Text>{props.time}</Text></Text>
            </View>
            <Image source={props.imagerr}/>
         </View>
         <View style={styles.botfles}>
            <Text className='text-blue-500 rounded-xl pl-5 pr-5 pb-1 pt-1 border border-blue-500'>{props.chance}</Text>
            <TouchableOpacity onPress={props.fact}>
               <Text className='bg-blue-500 rounded-xl pl-5 pr-5 pb-1 pt-1 text-white'>{props.cantchance}</Text>
            </TouchableOpacity>
         </View>
        </View>
    )

}
export default Cards

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
       paddingRight:30
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