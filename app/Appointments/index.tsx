import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Image, StyleSheet } from "react-native";
import Cardcomponent from './doctorcard/cards';
import Cardscomponent from './doctorcard/cardss';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';




function Screen() {

  const [fontLoaded]=useFonts({
    'UrbanistBold':require('../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistMedium':require("../../assets/fonts/Urbanist-Medium.ttf"),
    'Urbanist-SemiBold':require("../../assets/fonts/Urbanist-SemiBold.ttf")
   })
    if(!fontLoaded){
   return null
   }


    const [upcoming, setUpcoming]=useState(true)
    const [canels,setCancels]=useState(false)
    const [complet,setComlpet]=useState(false)
    const [mores,setmores]=useState(false)
    const [notupcome,setNotupcome]=useState(false)
     

    const handleUpcoming = () =>{
        setCancels(false)
        setUpcoming(true)
        setComlpet(false)
        setmores(false)
        setNotupcome(false)
    }
    const shownotupcame = () =>{
      setCancels(false)
      setUpcoming(false)
      setComlpet(false)
      setNotupcome(true)
      setmores(false)
    }
    const Moress = () =>{
        setmores(true)
    }
    const handlecancel = () => {
        setCancels(true)
        setUpcoming(false)
        setComlpet(false)
        setmores(false)
        setNotupcome(false)
    }
    const handlcomplet = () => {
        setCancels(false)
        setUpcoming(false)
        setComlpet(true)
        setmores(false)
        setNotupcome(false)
    }
    return (
        <View className='bg-slate-50 size-full p-5'>
            <View>
            <View className='flex flex-row items-center justify-between w-400 pt-10'>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <Image source={require("../../assets/logo.png")} />
                    <Text className="text-[25px] font-UrbanistBold">Appointment</Text>
                </View>
                 <View>
                   <View className='flex flex-row items-center justify-center gap-4'>
                    <Image source={require("../../assets/Search.png")} />
                    <TouchableOpacity onPress={Moress}>
                    <Image source={require("../../assets/More.png")} />
                    </TouchableOpacity>
                    
                  </View>
                  {mores &&(
                     <View style={styles.otherscre}>
                     <Text style={styles.texscre} onPress={shownotupcame}>Appointment</Text>
                   </View>
                  )}
                   
                 </View>
            </View>

            <View className='flex flex-row items-center  w-400 pt-10 pb-10'>
                <TouchableOpacity onPress={handleUpcoming}>
                    <Text style={upcoming || notupcome ? styles.activeNav : styles.noneactive}>Upcoming</Text>
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
                <Cardcomponent
                   name="Dr.Mutoni Dach"
                   imager={require("../../assets/Mutoni.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                   name="Dr.Keegan Dach"
                   imager={require("../../assets/Muhawe.jpeg")}
                   typecall="Messaging"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/message.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                    name="Dr.Drake Beison"
                    imager={require("../../assets/Muhire.jpeg")}
                   typecall="Video call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/video.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                  name="Dr.Tomas Slatter"
                  imager={require("../../assets/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                   name="Dr.Quinn Slatter"
                   imager={require("../../assets/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                   name="Dr.Quinn Muhawe"
                   imager={require("../../assets/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.canelstyle}
                 />
                </View>
                </ScrollView>
             )}
           
            {upcoming && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Cardscomponent
                   name="Dr.Raul Kamanzi"
                   imager={require("../../assets/Kamanzi.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}

                   
                 />
                 <Cardscomponent
                   name="Dr.Mutoni Dach"
                   imager={require("../../assets/Mutoni.jpeg")}
                   typecall="Messaging"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/message.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   
                   
                 />
                 <Cardscomponent
                   name="Dr.Muhire Beison"
                   imager={require("../../assets/Muhire.jpeg")}
                   typecall="Video call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/video.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   
                 />
                 <Cardscomponent
                   name="Dr.Quinn Slatter"
                   imager={require("../../assets/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   
                 />
                 <Cardscomponent
                   name="Dr.Tomas Slatter"
                   imager={require("../../assets/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   
                 />
                 <Cardscomponent
                   name="Dr.Quinn Muhawe"
                   imager={require("../../assets/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.completstyle}
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   
                 />
                </View>
                </ScrollView>

            )}
            {complet && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Cardscomponent
                   name="Dr.Raul Kamanzi"
                   imager={require("../../assets/Kamanzi.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chooice={()=>router.push("/Appointments/audio/audioappointment")}
                 />
                 <Cardscomponent
                    name="Dr.Mutoni Dach"
                    imager={require("../../assets/Mutoni.jpeg")}
                   typecall="Messaging"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/message.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chooice={()=>router.push("/Appointments/message/messageappointment")}
                 />
                 <Cardscomponent
                    name="Dr.Drake Beison"
                    imager={require("../../assets/Muhire.jpeg")}
                   typecall="Video call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/video.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chooice={()=>router.push("/Appointments/video/videoappointment")}
                 />
                 <Cardscomponent
                  name="Dr.Quinn Slatter"
                  imager={require("../../assets/Anitha.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                 <Cardscomponent
                  name="Dr.Tomas Slatter"
                  imager={require("../../assets/Tomasi.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                 <Cardscomponent
                   name="Dr.Quinn Muhawe"
                   imager={require("../../assets/Muhawe.jpeg")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                </View>
                </ScrollView>
            )}
            {notupcome && (
               <View style={styles.centerbar} >
               <Image source={require("../../assets/Frame.png")}/>
               <Text style={styles.centerbartitle}>You don't have an appointment yet</Text>
               <Text style={styles.centerbartpragra}>You don't have a doctor's appointment scheduled at the moment.</Text>
              </View>
            )}
        </View>
    )
}
export default Screen

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
      },
      centerbar:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'76%',
        gap:20,
    },
    centerbartitle:{
        fontSize:22,
        fontFamily:'UrbanistBold'
    },
    centerbartpragra:{
        fontSize:18,
        textAlign:'center',
        paddingRight:15,
        paddingLeft:15,
        fontFamily:'UrbanistMedium'
    },
    activeNav: {
        color: '#246BFD',
        borderBottomWidth: 4,
        borderBottomColor: '#246BFD',
        paddingBottom: 15,
        fontSize: 17,
        fontFamily:'UrbanistMedium',
        paddingLeft:20,
        paddingRight:20

        
    },
    noneactive: {
        paddingBottom: 15,
        fontSize: 17,
        fontFamily:'UrbanistMedium',
        borderBottomWidth: 2,
        borderBottomColor: '#dddd',
        paddingLeft:20,
        paddingRight:20
    },
    botton:{
        display:'flex',
        flexDirection:"row",
        gap:20,
        paddingTop:20
    },
    content:{
        display:'flex',
        gap:2
    },
    canelstyle:{
      color:'red',
      borderColor:'red',
      borderWidth:2,
      borderRadius:5,
        height:35,
        padding:8,
        paddingLeft:15,
        paddingRight:15,
        fontFamily:'UrbanistMedium'
    },
    upgrstyle:{
      color:'#246BFD',
      borderColor:'#246BFD',
      borderWidth:2,
      borderRadius:5,
      height:35,
      padding:8,
      paddingLeft:15,
      paddingRight:15,
      fontFamily:'UrbanistMedium'
        
    },
    completstyle:{
        color:'green',
        borderColor:'green',
        borderWidth:2,
        borderRadius:5,
        height:35,
        padding:8,
        paddingLeft:15,
        paddingRight:15,
        fontFamily:'UrbanistMedium'
    },
    otherscre:{
        backgroundColor:'#fff',
        height:80,
        padding:8,
        borderRadius:10,
        marginTop:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    texscre:{
      color:'#246BFD'
    }

})
