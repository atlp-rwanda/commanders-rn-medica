import { Text } from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { useState , useEffect} from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../supabase"; 
import Cardcomponent from "./doctorcard/cards";
import Cardscomponent from "./doctorcard/cardss";

function Screen() {
  const [upcoming, setUpcoming] = useState(true);
  const [cancels, setCancels] = useState(false);
  const [complete, setComlpete] = useState(false);
  const [notupcome, setNotupcome] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[appointmentData, setAppointmentData]=useState<any[]>([]);
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  const handleUpcoming = () => {
    setCancels(false);
    setUpcoming(true);
    setComlpete(false);
    setNotupcome(false);
  };
  const shownotupcame = () => {
    setCancels(false);
    setUpcoming(false);
    setComlpete(false);
    setNotupcome(true);
  };
  const handlecancel = () => {
    setCancels(true);
    setUpcoming(false);
    setComlpete(false);
    setNotupcome(false);
  };
  const handlcomplet = () => {
    setCancels(false);
    setUpcoming(false);
    setComlpete(true);
    setNotupcome(false);
  };
  const yescancel = () => {
    if (isModalVisible === true) {
      setIsModalVisible(false);
      router.push("/Appointments/resonforcancel");
    }
  };

  const fetchAppointment=async()=>{
    try{
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const userId = userData?.user?.id;
const{data, error}=await supabase
.from("appointment")
.select(`
  *,
  doctor(
    id,
    name,
    role,
    image,
    hospital
  )
`)
.eq("patient_id", userId);

if(error){
  console.log("Error occured while fetching appointments", error)
}else{
  setAppointmentData(data);
  console.log("fetched data:");
}}  
catch(error){
console.log(error);
} 
}
useEffect(()=>{
fetchAppointment();
},[])
const getPackageIcon = (typecall:any) => {
  switch (typecall) {
    case 'Voice Call':
      return require("../../assets/appointmentIcon/voice.png");
    case 'Video Call':
      return require("../../assets/appointmentIcon/video.png");
    case 'Messaging':
      return require("../../assets/appointmentIcon/message.png");
    default:
      return null;
  }
}
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
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
              <TouchableOpacity onPress={yescancel}>
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
      <View className="pb-6">
        <View className="px-4 pt-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center justify-center gap-4">
              <Image
                className="w-[25px] h-[25px]"
                source={require("../../assets/Account.png")}
              />
              <Text className="text-[25px] font-UrbanistBold">
                My Appointment
              </Text>
            </View>
            <View>
              <View className="flex flex-row items-center justify-center gap-4">
                <Image
                  className="w-[25px] h-[25px]"
                  source={require("../../assets/doctors/searchIcon.png")}
                />
                <TouchableOpacity onPress={shownotupcame}>
                  <Image
                    className="w-[25px] h-[25px]"
                    source={require("../../assets/doctors/menu.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex flex-row items-center justify-center mt-8">
            <TouchableOpacity
              className={`border-b-2 flex-1 ${
                upcoming || notupcome ? "border-primary-500" : "border-gray-200"
              }`}
              onPress={handleUpcoming}
            >
              <Text
                className={`px-2.5 pb-3 text-lg  font-UrbanistSemiBold text-center ${
                  upcoming || notupcome ? "text-primary-500" : "text-gray-400"
                }`}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border-b-2 flex-1 ${
                complete ? "border-primary-500" : "border-gray-200"
              }`}
              onPress={handlcomplet}
            >
              <Text
                className={`px-2.5 pb-3 text-lg font-UrbanistSemiBold text-center ${
                  complete ? "text-primary-500" : "text-gray-400"
                }`}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border-b-2 flex-1 ${
                cancels ? "border-primary-500" : "border-gray-200"
              }`}
              onPress={handlecancel}
            >
              <Text
                className={`px-2.5 pb-3 text-lg text-gray-400 font-UrbanistSemiBold text-center ${
                  cancels ? "text-primary-500" : "text-gray-400"
                }`}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          className="px-4"
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* {cancels && (
            <View style={styles.content}>
              <Cardcomponent
                name="Dr.Mutoni Dach"
                imager={require("../../assets/doctors/doc1.png")}
                typecall="Voice call"
                action="Cancelled"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/voice.png")}
                styles={styles.cancelStyles}
              />
              <Cardcomponent
                name="Dr.Keegan Dach"
                imager={require("../../assets/doctors/doc2.png")}
                typecall="Messaging"
                action="Cancelled"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/message.png")}
                styles={styles.cancelStyles}
              />
              <Cardcomponent
                name="Dr.Drake Beison"
                imager={require("../../assets/doctors/doc4.png")}
                typecall="Video call"
                action="Cancelled"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/video.png")}
                styles={styles.cancelStyles}
              />
              <Cardcomponent
                name="Dr.Tomas Slatter"
                imager={require("../../assets/doctors/doc5.png")}
                typecall="Voice call"
                action="Cancelled"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/voice.png")}
                styles={styles.cancelStyles}
              />
              <Cardcomponent
                name="Dr.Quinn Muhawe"
                imager={require("../../assets/doctors/doc3.png")}
                typecall="Voice call"
                action="Cancelled"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/voice.png")}
                styles={styles.cancelStyles}
              />
            </View>
          )} */}
          {upcoming && (
            <View style={styles.content}>
              {appointmentData.map((appointment:any, index:any) => (
                <Cardscomponent
                  key={index}
                  name={appointment.doctor.name}
                  imager={appointment.doctor.image}
                  typecall={appointment.package}
                  action="Upcoming"
                  date={appointment.appointment_date}
                  imagerr={getPackageIcon(appointment.package)}
                  time={appointment.appointment_time.slice(0,5)}
                  styles={styles.upcomingStyles}
                  backcad="bg-white rounded-xl flex-row p-4 w-400 items-center gap-7"
                  chance="Cancel Appointment"
                  cantchance="Reschedule"
                  fact={() =>
                    router.push({
                      pathname: "/Appointments/reschedul",
                      params: {
                        date: appointment.appointment_date,
                        time: appointment.appointment_time.slice(0,5),
                        appointmentId: appointment?.id,
                      },
                    })
                  }
                  cancle={() => setIsModalVisible(true)}
                />
              ))}
            </View>
          )}
              
          {/* {complete && (
            <View style={styles.content}>
              <Cardscomponent
                name="Dr.Raul Kamanzi"
                imager={require("../../assets/doctors/doc1.png")}
                typecall="Voice call"
                action="Complete"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/voice.png")}
                styles={styles.completeStyles}
                chance="Book Again"
                cantchance="Leave a Review"
                backcad="bg-white rounded-xl flex-row p-4 w-400 items-center gap-7"
                fact={() => router.push("/Appointments/voice-call/writeReview")}
              />
              <Cardscomponent
                name="Dr.Mutoni Dach"
                imager={require("../../assets/doctors/doc2.png")}
                typecall="Messaging"
                action="Complete"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/message.png")}
                styles={styles.completeStyles}
                chance="Book Again"
                cantchance="Leave a Review"
                backcad="bg-white rounded-xl flex-row p-4 w-400 items-center gap-7"
                fact={() => router.push("/Appointments/voice-call/writeReview")}

              />
              <Cardscomponent
                name="Dr.Drake Beison"
                imager={require("../../assets/doctors/doc5.png")}
                typecall="Video call"
                action="Complete"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/video.png")}
                styles={styles.completeStyles}
                chance="Book Again"
                cantchance="Leave a Review"
                backcad="bg-white rounded-xl flex-row p-4 w-400 items-center gap-7"
                fact={() => router.push("/Appointments/voice-call/writeReview")}
              />
              <Cardscomponent
                name="Dr.Quinn Slatter"
                imager={require("../../assets/doctors/doc3.png")}
                typecall="Voice call"
                action="Complete"
                date="Dec 12,2022"
                time="16:00 PM"
                imagerr={require("../../assets/appointmentIcon/voice.png")}
                styles={styles.completeStyles}
                chance="Book Again"
                cantchance="Leave a Review"
                backcad="bg-white rounded-xl flex-row p-4 w-400 items-center gap-7"
                fact={() => router.push("/Appointments/voice-call/writeReview")}
              />
            </View>
          )} */}
        </ScrollView>

        {notupcome && (
          <View style={styles.centerbar}>
            <Image source={require("../../assets/appointmentIcon/first.png")} />
            <Text style={styles.centerbartitle}>
              You don't have an appointment yet
            </Text>
            <Text style={styles.centerbartpragra}>
              You don't have a doctor's appointment scheduled at the moment.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
export default Screen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 20,
  },
  centerbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "76%",
    gap: 20,
  },
  centerbartitle: {
    fontSize: 20,
    fontFamily: "UrbanistBold",
  },
  centerbartpragra: {
    fontSize: 15,
    textAlign: "center",
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: "UrbanistMedium",
  },
  activeNav: {
    color: "#246BFD",
    borderBottomWidth: 4,
    borderBottomColor: "#246BFD",
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    paddingLeft: 20,
    paddingRight: 20,
  },
  noneactive: {
    paddingBottom: 15,
    fontSize: 16,
    color: "#9e9e9e",
    fontFamily: "Urbanist-SemiBold",
    borderBottomWidth: 2,
    borderBottomColor: "#eeee",
    paddingLeft: 20,
    paddingRight: 20,
  },
  botton: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingTop: 20,
  },
  content: {
    display: "flex",
    gap: 2,
    overflow: "visible",
  },
  cancelStyles: {
    color: "red",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    fontSize: 12,
    fontFamily: "UrbanistMedium",
  },
  upcomingStyles: {
    color: "#246BFD",
    borderColor: "#246BFD",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    fontSize: 12,
    fontFamily: "UrbanistMedium",
  },
  completeStyles: {
    color: "green",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    fontSize: 12,
    fontFamily: "UrbanistMedium",
  },
  otherscre: {
    backgroundColor: "#fff",
    height: 80,
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  texscre: {
    color: "#246BFD",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mode: {
    color: "#f75555",
  },
});
