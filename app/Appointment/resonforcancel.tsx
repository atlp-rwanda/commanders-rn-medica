
import React,{useState} from 'react';
import { View, Text, TouchableOpacity,Image } from "react-native";
import { router } from 'expo-router';
const arrow = require("../../assets/Arrow.png")
import CustomCheckBox from './doctorcard/checkbox';


function Reasonscreen(){
    const [successfuly, setSuccessfuly] = useState(true);
    const showsuccess = () =>{
        setSuccessfuly(true);
    };
    return (
        <View className={`flex-1 pl-5 pr-5 pb-10 pt-10 justify-center bg-white ${successfuly ? 'bg-gray-600' : 'bg-white'}`}>
             <View className='flex flex-row gap-4 items-center pb-10'>
             <TouchableOpacity onPress={()=>router.back()}>
                    <Image source={arrow}/>
                </TouchableOpacity>
                    <Text className='font-bold text-2xl'>Cancel Appointment</Text>
               </View>
               <View className='flex gap-5 pt-5 pb-5'>
                 <Text className='font-bold text-xl pb-2'>Reason for schedule change</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I want to change to another doctor</Text>
                 <Text className='text-lg'><CustomCheckBox/>  Iwant to change package</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I don't want to consult</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I have recovered from the desease</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I have found a suitable medecine</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I just want to cancel</Text>
                 <Text className='text-lg'><CustomCheckBox/>  I don't want to tell</Text>
                 <Text className='text-lg'><CustomCheckBox/>  Others</Text>
               </View>
               <Text className={`text-base rounded-xl p-2 mt-7 mb-7  ${successfuly ? 'bg-gray-600' : 'bg-slate-100'}`}>
                After you've saved and closed the rebase file, Git will automatically start the rebase process and 
                squash the specified commits into the previous ones. If there are any conflicts during the rebase, Git will 
                pause and allow you to resolve them. Once all conflicts are resolved, Git will complete the rebase and apply 
                the squashed commits.
                </Text>
                <TouchableOpacity onPress={showsuccess}>
                 <Text className='bg-blue-600 text-white text-center text-lg p-3 rounded-3xl '>Submit</Text>
                </TouchableOpacity>

                {successfuly && (
             <View className='bg-white absolute w-9/12 ml-20 rounded-xl flex justify-center items-center p-5 '>
                <Image source={require("../../assets/Group1.png")}/>
                <Text className='text-blue-700 text-xl pt-10 font-bold pb-10 text-center'>Cancel Appointment Successfuly</Text>
                <Text className='text-center'>We are very sad that you have cancel your appointment. we will always improve our service to satisfy you in the next appointment</Text>
                <TouchableOpacity>
                    <Text className='text-white bg-blue-700 rounded-xl pb-3 pt-3 pl-10 pr-10 my-3.5'>Ok</Text>
                </TouchableOpacity>
             </View>
         )}
        </View>
    )

}
export default Reasonscreen