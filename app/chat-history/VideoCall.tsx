import React, {useState, useEffect} from "react";
import { View, ScrollView } from "react-native";
import DoctorVideo from "@/components/cards/DoctorVideo";
import { useRouter } from "expo-router";
import { DoctorCard } from "./types"; 
import { supabase } from "../supabase";
const VideoCall = () => {
  const router = useRouter();
  const [appointment, setAppointment]=useState<any[]>([]);

  useEffect(()=>{
    const fetchAppointments=async()=>{
    const {data, error}=await supabase.auth.getUser();
    if(error) throw error;
    const userId=data?.user?.id;
    const {data:AppointmentData, error:Error}=await supabase.from("appointment").select("*, doctor(name,image)").eq("patient_id", userId).eq("package","Video Call").eq("status", "Completed")
    if(Error) throw Error
    if(AppointmentData){
    setAppointment(AppointmentData);
    }
    }
    fetchAppointments();
      },[])
 
  const handlePress = (appointmentId:any) => {
    router.push({
      pathname: "/chat-history/VideoRecord",
      params: {appointmentId},
    });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "#FAFAFA", paddingBottom: 6 }}>
        {appointment.map((appointments, index) => (
          <DoctorVideo
            key={index}
            onPress={() => handlePress(appointments.id)}
            doctorName={appointments.doctor.name}
            doctorImage={appointments.doctor.image}
            callType={appointments.package}
            callDay={appointments.appointment_date}
            callTime={appointments.appointment_time.slice(0,5)}
            isVideoCallScreen={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoCall;