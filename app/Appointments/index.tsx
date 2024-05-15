import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Image,Modal, StyleSheet } from "react-native";
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
  


    const [upcoming, setUpcoming]=useState(true)
    const [canels,setCancels]=useState(false)
    const [complet,setComlpet]=useState(false)
    const [mores,setmores]=useState(false)
    const [notupcome,setNotupcome]=useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
     

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
    const yescancel = () =>{
      if(isModalVisible===true){
         setIsModalVisible(false)
         router.push("/Appointments/resonforcancel")
      }
    }
    if(!fontLoaded){
      return null
      }
    return (
      <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        >
          <View style={styles.modalOverlay}>
            <View className="bg-white w-full rounded-t-3xl p-5 flex justify-center items-center">
              <Text
                className="pb-3 font-UrbanistBold text-[24px]"
                style={styles.mode}
              >
                Cancel Appointment
              </Text>
              <View className="w-11/12 pt-5 pb-3 border-y-2 border-slate-200">
                <Text className="text-[18px] text-center pb-3 font-UrbanistMedium">
                  Are you sure you want to cancel your appointment
                </Text>
                <Text className="text-[18px] text-center pb-3 font-UrbanistMedium">
                  Only 50% of the funds will be returned to your account
                </Text>
              </View>
              <View className="flex flex-row w-11/12 justify-between items-center  pt-3">
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <View className=" rounded-3xl pb-3 pt-3 pl-14 pr-14  bg-slate-100 ">
                    <Text className="text-blue-700 text-center font-UrbanistBold text-[16px]">
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={yescancel}
                >
                  <View className="bg-blue-700 rounded-3xl pb-3  pt-3 pl-10 pr-10 my-3.5">
                    <Text className="text-white font-UrbanistBold text-center text-[16px]">
                      Yes,Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View className='bg-slate-50 size-full p-3'>
            <View>
            <View className='flex flex-row items-center justify-between w-400 pt-10'>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <Image className='w-[25px] h-[25px]' source={require("../../assets/Account.png")} />
                    <Text className="text-[25px] font-UrbanistBold">My Appointment</Text>
                </View>
                 <View>
                   <View className='flex flex-row items-center justify-center gap-4'>
                    <Image className='w-[25px] h-[25px]' source={require("../../assets/doctors/searchIcon.png")} />
                    <TouchableOpacity onPress={shownotupcame}>
                    <Image className='w-[25px] h-[25px]' source={require("../../assets/doctors/menu.png")} />
                    </TouchableOpacity>
                    
                  </View>
                 </View>
            </View>

            <View className='flex flex-row items-center justify-center  w-400 pt-10 pb-10 pl-2'>
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
                   imager={require("../../assets/doctors/doc1.png")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                   name="Dr.Keegan Dach"
                   imager={require("../../assets/doctors/doc2.png")}
                   typecall="Messaging"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/message.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                    name="Dr.Drake Beison"
                    imager={require("../../assets/doctors/doc4.png")}
                   typecall="Video call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/video.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                  name="Dr.Tomas Slatter"
                  imager={require("../../assets/doctors/doc5.png")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
                   stile={styles.canelstyle}
                 />
                 <Cardcomponent
                   name="Dr.Quinn Muhawe"
                   imager={require("../../assets/doctors/doc3.png")}
                   typecall="Voice call"
                   action="Cancelled"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
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
                   imager={require("../../assets/doctors/doc1.png")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
                   stile={styles.upgrstyle}
                   chance="Cancel Appointment"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   cancle={()=>setIsModalVisible(true)}

                   
                 />
                 <Cardscomponent
                   name="Dr.Mutoni Dach"
                   imager={require("../../assets/doctors/doc2.png")}
                   typecall="Messaging"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/message.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   cancle={()=>setIsModalVisible(true)}
                   
                   
                 />
                 <Cardscomponent
                   name="Dr.Muhire Beison"
                   imager={require("../../assets/doctors/doc3.png")}
                   typecall="Video call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/video.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   cancle={()=>setIsModalVisible(true)}
                   
                 />
                 <Cardscomponent
                   name="Dr.Quinn Slatter"
                   imager={require("../../assets/doctors/doc5.png")}
                   typecall="Voice call"
                   action="Upcoming"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
                   stile={styles.upgrstyle}
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                   chance="Cancel Appointment"
                   cantchance="Reschedule"
                   fact={()=> router.push("/Appointments/reschedul")}
                   cancle={()=>setIsModalVisible(true)}
                   
                 />
                </View>
                </ScrollView>

            )}
            {complet && (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                <Cardscomponent
                   name="Dr.Raul Kamanzi"
                   imager={require("../../assets/doctors/doc1.png")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                 <Cardscomponent
                    name="Dr.Mutoni Dach"
                    imager={require("../../assets/doctors/doc2.png")}
                   typecall="Messaging"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/message.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                 <Cardscomponent
                    name="Dr.Drake Beison"
                    imager={require("../../assets/doctors/doc5.png")}
                   typecall="Video call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/video.png")}
                   stile={styles.completstyle}
                   chance="Book Again"
                   cantchance="Leave a Review"
                   backcad='bg-white rounded-xl flex-row p-4 w-400 items-center gap-7'
                 />
                 <Cardscomponent
                  name="Dr.Quinn Slatter"
                  imager={require("../../assets/doctors/doc3.png")}
                   typecall="Voice call"
                   action="Complete"
                   date="Dec 12,2022"
                   time="16:00 PM"
                   imagerr={require("../../assets/appointmentIcon/voice.png")}
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
               <Image source={require("../../assets/appointmentIcon/first.png")}/>
               <Text style={styles.centerbartitle}>You don't have an appointment yet</Text>
               <Text style={styles.centerbartpragra}>You don't have a doctor's appointment scheduled at the moment.</Text>
              </View>
            )}
        </View>
      </>
       
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
        fontSize:20,
        fontFamily:'UrbanistBold'
    },
    centerbartpragra:{
        fontSize:15,
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
        fontSize: 16,
        fontFamily:'Urbanist-SemiBold',
        paddingLeft:20,
        paddingRight:20

        
    },
    noneactive: {
        paddingBottom: 15,
        fontSize: 16,
        color:'#9e9e9e',
        fontFamily:'Urbanist-SemiBold',
        borderBottomWidth: 2,
        borderBottomColor: '#eeee',
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
        gap:2,
        paddingBottom:170
    },
    canelstyle:{
      color:'red',
      borderColor:'red',
      borderWidth:2,
      borderRadius:10,
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
      borderRadius:10,
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
        borderRadius:10,
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
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    mode:{
      color:'#f75555'
    }

})
