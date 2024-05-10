
import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Image, StyleSheet } from "react-native";
import Card from './Medica/component/cards';
import Cards from './Medica/component/cardss';
import { router } from 'expo-router';

function Appointiment() {
    const [upcoming, setUpcoming]=useState(true)
    const [canels,setCancels]=useState(false)
    const [complet,setComlpet]=useState(false)
    const [mores,setmores]=useState(false)
     

    const handleUpcoming = () =>{
        setCancels(false)
        setUpcoming(true)
        setComlpet(false)
    }
    const Moress = () =>{
        setmores(true)
    }
    const handlecancel = () => {
        setCancels(true)
        setUpcoming(false)
        setComlpet(false)
    }
    const handlcomplet = () => {
        setCancels(false)
        setUpcoming(false)
        setComlpet(true)
    }
    return (
        <View className='bg-gray-500 flex-1 size-full '>
            <View className='p-5'>
            <View className='flex flex-row items-center justify-between w-400 pt-10'>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <Image source={require("./Medica/logo.png")} />
                    <Text className='font-bold text-xl'>My Appointment</Text>
                </View>
                 <View>
                   <View className='flex flex-row items-center justify-center gap-4'>
                    <Image source={require("./Medica/Search.png")} />
                    <TouchableOpacity onPress={Moress}>
                    <Image source={require("./Medica/More.png")} />
                    </TouchableOpacity>
                    
                  </View>
                  {mores &&(
                     <View style={styles.otherscre}>
                     <Text style={styles.texscre} onPress={()=>router.push("/Appointment/appintment")}>Appointment</Text>
                   </View>
                  )}
                   
                 </View>
            </View>
            <View>
            <View className='flex flex-row items-center justify-between w-400 pt-10 pb-10'>
                <TouchableOpacity onPress={handleUpcoming}>
                    <Text style={upcoming === true ? styles.activeNav : styles.noneactive}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlcomplet}>
                    <Text style={complet === true ? styles.activeNav : styles.noneactive}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlecancel}>
                    <Text style={canels === true ? styles.activeNav : styles.noneactive}>Cancelled</Text>
                </TouchableOpacity>
            </View>
            </View>
            {canels && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Card
                   name="Dr.Mutoni Dach"
                   imager={require("./Medica/Mutoni.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.canelstyle}
                   backcad='bg-gray-700'
                 />
                 <Card
                   name="Dr.Keegan Dach"
                   imager={require("./Medica/Mutoni.jpeg")}
                   typecall="Messaging"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/message.png")}
                   stile={styles.canelstyle}
                   backcad='bg-gray-700'
                 />
                 <Card
                    name="Dr.Drake Beison"
                    imager={require("./Medica/Muhire.jpeg")}
                   typecall="Video call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/video.png")}
                   stile={styles.canelstyle}
                 />
                 <Card
                  name="Dr.Tomas Slatter"
                  imager={require("./Medica/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Card
                   name="Dr.Quinn Slatter"
                   imager={require("./Medica/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Card
                   name="Dr.Quinn Muhawe"
                   imager={require("./Medica/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.canelstyle}
                 />
                </View>
                </ScrollView>
             )}
              {upcoming && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Cards
                   name="Dr.Raul Kamanzi"
                   imager={require("./Medica/Kamanzi.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                 <Cards
                   name="Dr.Mutoni Dach"
                   imager={require("./Medica/Mutoni.jpeg")}
                   typecall="Messaging"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/message.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                 <Cards
                   name="Dr.Muhire Beison"
                   imager={require("./Medica/Muhire.jpeg")}
                   typecall="Video call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/video.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                 <Cards
                   name="Dr.Quinn Slatter"
                   imager={require("./Medica/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                 <Cards
                   name="Dr.Tomas Slatter"
                   imager={require("./Medica/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                 <Cards
                   name="Dr.Quinn Muhawe"
                   imager={require("./Medica/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.completstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointment/reschedul")}
                 />
                </View>
                </ScrollView>

            )}
            {complet && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Cards
                   name="Dr.Raul Kamanzi"
                   imager={require("./Medica/Kamanzi.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                 <Cards
                    name="Dr.Mutoni Dach"
                    imager={require("./Medica/Mutoni.jpeg")}
                   typecall="Messaging"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/message.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                 <Cards
                    name="Dr.Drake Beison"
                    imager={require("./Medica/Muhire.jpeg")}
                   typecall="Video call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/video.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                 <Cards
                  name="Dr.Quinn Slatter"
                  imager={require("./Medica/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                 <Cards
                  name="Dr.Tomas Slatter"
                  imager={require("./Medica/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                 <Cards
                   name="Dr.Quinn Muhawe"
                   imager={require("./Medica/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("./Medica/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                 />
                </View>
                </ScrollView>
            )}
            </View>
          
            <View className='bg-white rounded-tr-3xl rounded-tl-3xl absolute bottom-0 left-0 w-full p-5 flex justify-center items-center'>
                  <Text className='text-red-900 text-xl pb-5 font-bold pt-3'>Cancel Appointment</Text>
                  <View  className='border-slate-200 border-y-2'>
                    <Text className='p-5 text-center text-lg'>Are you sure you want to cancel your appointment ?</Text>
                    <Text className='pb-5 text-lg text-center'>Only 50% of the founds will be returned to your account</Text>
                  </View>
                  <View className='flex flex-row gap-10 pt-10 pb-10'>
                    <TouchableOpacity onPress={()=>router.back()}>
                        <Text className='rounded-2xl pb-3 pt-3 pl-14 pr-14 text-blue-600 bg-slate-100'>Back</Text>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={()=>router.push("/Appointment/resonforcancel")}>
                       <Text className='rounded-2xl pb-3 pt-3 pl-14 pr-14 bg-blue-600 text-white '>Yes,cancle</Text>
                     </TouchableOpacity>
                  </View>
            </View>
        </View>
    )
}
export default Appointiment

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
      },
    activeNav: {
        color: '#246BFD',
        borderBottomWidth: 4,
        borderBottomColor: '#246BFD',
        paddingBottom: 15,
        fontSize: 17
    },
    noneactive: {
        paddingBottom: 15,
        fontSize: 17
    },
    botton:{
        display:'flex',
        flexDirection:"row",
        gap:20,
        paddingTop:20
    },
    content:{
        display:'flex',
        gap:20
    },
    canelstyle:{
      color:'red',
      borderColor:'red',
      borderWidth:1,
      borderRadius:10,
      height:25,
      padding:3
    },
    upgrstyle:{
      color:'#246BFD',
      borderColor:'#246BFD',
      borderWidth:1,
      borderRadius:10,
      height:25,
      padding:3
        
    },
    completstyle:{
        color:'green',
        borderColor:'green',
        borderWidth:1,
        borderRadius:10,
        height:25,
        padding:3
    },
    otherscre:{
        backgroundColor:'#246BFD',
        height:80,
        padding:8,
        borderRadius:10,
        marginTop:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    texscre:{
      color:'#fff'
    }

})
