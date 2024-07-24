import DoctorCard from "@/components/cards/doctorCard";
import CallsCard, { CallsType } from "@/components/chats/voiceCard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, ImageSourcePropType } from "react-native";
import { FlatList } from "react-native";
import { supabase } from "../supabase";


export default function VoiceCalls() {
    const[appointment, setAppointment]=useState<any[]>([]);
    
    useEffect(()=>{
        const fetchAppointments=async()=>{
        const {data, error}=await supabase.auth.getUser();
        if(error) throw error;
        const userId=data?.user?.id;
        const {data:AppointmentData, error:Error}=await supabase.from("appointment").select("*, doctor(name,image)").eq("patient_id", userId).eq("package","Voice Call")
        if(Error) throw Error
        if(AppointmentData){
        setAppointment(AppointmentData);
        }
        }
        fetchAppointments();
          },[])
    const renderItems = (appointment: any, index:any) => {
        return (
            <>
                <CallsCard
                    key={index}
                    name={appointment.doctor.name}
                    type={appointment.package}
                    date={appointment.appointment_date}
                    time={appointment.appointment_time.slice(0,5)}
                    image={appointment.doctor.image}
                    onPress={()=>router.push({pathname:'chat-history/singleCall', params:{appointmentId:appointment.id}})}
                />
            </>
        )
    }

    return (
        <>
                    {appointment.map((appointmentItem,index) => renderItems(appointmentItem,index))} 
        </>
    )
}