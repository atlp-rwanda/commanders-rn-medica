
import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Image, StyleSheet } from "react-native";
import { router } from 'expo-router';

function Appoin() {
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
        router.push("/Appointment/cancelscreen")
    }
    const handlcomplet = () => {
        setCancels(false)
        setUpcoming(false)
        setComlpet(true)
        router.push("/Appointment/screen")
    }

    return (
        <View style={styles.container}>
            <View>
            <View style={styles.heading}>
                <View style={styles.subheading}>
                    <Image source={require("../../assets/logo.png")} />
                    <Text style={styles.headingtext}>My Appointment</Text>
                </View>
                 <View>
                   <View style={styles.subheading}>
                    <Image source={require("../../assets/Search.png")} />
                    <TouchableOpacity onPress={Moress}>
                    <Image source={require("../../assets/More.png")} />
                    </TouchableOpacity>
                    
                  </View>
                  {mores &&(
                     <View style={styles.otherscre}>
                     <Text style={styles.texscre}>Appointment</Text>
                   </View>
                  )}
                   
                 </View>
            </View>

            <View style={styles.heading}>
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
               <View style={styles.centerbar}>
               <Image source={require("../../assets/Frame.png")}/>
               <Text style={styles.centerbartitle}>You don't have an appointment yet</Text>
               <Text style={styles.centerbartpragra}>You don't have a doctor's appointment scheduled at the moment.</Text>
           </View>
            <View style={styles.botton}>
               <Image source={require("../../assets/home.png")}/>
               <Image source={require("../../assets/Appoint.png")}/>
               <Image source={require("../../assets/history.png")}/>
               <Image source={require("../../assets/Article.png")}/>
               <Image source={require("../../assets/profile.png")}/>
            </View>

        </View>
    )
}
export default Appoin

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center",
        backgroundColor: '#eee',
        justifyContent:'space-between',
        height: "100%",
        paddingTop:25,
        paddingBottom:25
    },
    scrollViewContent: {
        flexGrow: 1,
      },
    heading: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: 400,
        paddingTop: 20,
        paddingBottom: 20
    },
    subheading: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 25
    },
    headingtext: {
        fontSize: 20,
        fontWeight: '700'
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
    centerbar:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:20,
    },
    centerbartitle:{
        fontSize:22,
        fontWeight:'700'
    },
    centerbartpragra:{
        fontSize:18,
        textAlign:'center',
        paddingRight:15,
        paddingLeft:15
    },
    content:{
        display:'flex',
        gap:20
    },
    canelstyle:{
        backgroundColor:"red",
        borderRadius:10,
        color:'#fff'
    },
    completstyle:{
        backgroundColor:"green",
        color:'#fff',
        borderCurve:'continuous',
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
