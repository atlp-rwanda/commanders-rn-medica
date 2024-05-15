import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const Voiceringing = () => {
  return (
    <LinearGradient colors={['#9c27b0', '#00bcd4']} className='flex-1 justify-between pt-10 pb-10 pl-5 pr-5'> 

        <TouchableOpacity className='pt-10' onPress={()=>router.back()}>
            <Image source={require("../../../assets/Arrow.png")}/>
        </TouchableOpacity>
        <View className='flex justify-between items-center '>
            <Image style={styles.profileimage} source={require("../../../assets/Muhawe.jpeg")}/>
            <Text className='text-white text-2xl font-bold pb-5'>Dr. Jenny Watson</Text>
            <Text className='text-white'>Ringing...</Text>
        </View>
        <View className='flex flex-row justify-center items-center gap-10'>
            <View style={styles.image} className='bg-slate-100 p-3'>
             <Image className='w-10 h-10 ' source={require("../../../assets/Volume.png")}/>
            </View>
             <View style={styles.image} className='bg-slate-100 p-3'>
               <Image className='w-10 h-10 ' source={require("../../../assets/recoding.png")}/>
             </View>
             <View style={styles.image} className='bg-red-500 p-3'>
               <Image className='w-10 h-10 ' source={require("../../../assets/colling.png")}/>
             </View>     
        </View>

    </LinearGradient>
  );
};

export default Voiceringing;
const styles = StyleSheet.create({
    profileimage:{
        borderRadius:500,
        width:150,
        height:150
    },
    image:{
        padding:5,
        borderRadius:200
    }

})
