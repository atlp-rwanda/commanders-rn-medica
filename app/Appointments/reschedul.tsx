import React,{useState} from 'react';
import { View, Text, TouchableOpacity,Image,TextInput,StyleSheet } from "react-native";
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")
import CustomCheckBox from './doctorcard/checkbox';
import { useFonts } from 'expo-font';



function ReschedulApointment(){
    const [fontLoaded]=useFonts({
        'UrbanistBold':require('../../assets/fonts/Urbanist-Bold.ttf'),
        'UrbanistMedium':require("../../assets/fonts/Urbanist-Medium.ttf"),
        'UrbanistRegular':require("../../assets/fonts/Urbanist-Regular.ttf"),
        'Urbanist-SemiBold':require("../../assets/fonts/Urbanist-SemiBold.ttf"),
       
       })
        if(!fontLoaded){
       return null
       }
        const [text, setText] = useState('');
      
        const handleChangeText = (value:any) => {
          setText(value);
        };
    
      return (
        <View className='flex-1 justify-between pb-12 pt-12 pl-2 pr-2'>
            <View className='flex gap-6'>
                <View className='flex flex-row gap-3 pt-10'>
                <TouchableOpacity onPress={()=>router.back()}>
                    <Image source={arrow}/>
                </TouchableOpacity>
                <Text className='text-2xl font-UrbanistBold'>Reschedul Appointment</Text>
                </View>
                <View className='flex gap-5  pl-0'>
                <Text className='font-Urbanist-SemiBold text-xl'>Reason for Schedule change</Text>
                <Text className='text-base font-UrbanistMedium'><CustomCheckBox/> I'm having a schedule clash</Text>
                <Text className='text-base font-UrbanistMedium'><CustomCheckBox/>  I'm not available on schedule</Text>
                <Text className='text-base font-UrbanistMedium'><CustomCheckBox/>  I have activity that can not be left behind</Text>
                <Text className='text-base font-UrbanistMedium'><CustomCheckBox/>  I don't want to tell</Text>
                <Text className='text-base font-UrbanistMedium'><CustomCheckBox/>  Others</Text> 
                </View>
                 <View>
                 <TextInput
                    multiline
                    numberOfLines={4} // You can adjust the number of lines as needed
                    value={text}
                    onChangeText={handleChangeText}
                    placeholder="Type your message here..."
                    style={styles.textarea}
                 />
                 </View>
            </View>
             <TouchableOpacity onPress={()=>router.push("/Appointments/selectdate")}>
                <Text className='bg-blue-600 text-white text-center text-lg p-3 rounded-3xl'>Next</Text>
             </TouchableOpacity>
        </View>
    )
}
export default  ReschedulApointment

const styles = StyleSheet.create({
    textarea: {
        borderWidth: 1,
        borderColor: '9e9e9e',
        borderRadius: 5,
        backgroundColor:"9e9e9e",
        padding:4,
        fontSize: 20,
        minHeight: 100, 
        width:360,
        marginLeft:15,
        fontFamily:'UrbanistMedium'
      },
})