import { mastercardColorIcon } from "@/assets/icons/mastercard";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { MinimalDoctorCard } from "@/components/cards/doctors/MinimalDoctorCard";
import { RootState } from "@/redux/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { supabase } from "../supabase";
export default function ReviewSummaryScreen() {
    const doctor = createSelector(
        (doctors: RootState["doctors"]["doctors"]) => doctors,
        (doctors) => doctors.find((doc) => doc.id == 1)
    )(useSelector((state: RootState) => state.doctors.doctors));
   
    const { date, time, packageTitle, packageDuration, packagePrice, packageIntervals, success, failed } = useLocalSearchParams<{ date: any, time: any, packageDuration: any, packageTitle: any, packagePrice: any, packageIntervals: any, success: string, failed: string }>();
    const [successModal, setSuccessModal] = useState(success == "1")
    const [failedModal, setFailedModal] = useState(failed == "1")
    const [loading, setLoading] = useState(false);
    const[appointmentStatus, setStatus]=useState("Booked");
    const numericPrice = parseFloat(packagePrice.replace("$", ""));
    const total = packageIntervals * numericPrice;
    const fullAmount = `$${total}`
    const bookAppointment = async () => {
        setLoading(true)
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;
            const userId = userData?.user?.id;
            const {data, error } = await supabase
                .from("appointment")
                .insert([
                    {
                        patient_id: userId,
                        appointment_date: date,
                        appointment_time: time,
                        package: packageTitle,
                        duration: packageDuration,
                        amount: fullAmount,
                        status:appointmentStatus,
                    },
                ]);
                if (error) {
                    setLoading(false);
                    console.log(error);
                }
                    
            setLoading(false)
            setSuccessModal(true);
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    }
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={successModal}
                onRequestClose={() => {
                    setSuccessModal(false);
                }}
            >
                <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className="flex-1 justify-center items-center">
                    <View className="bg-white px-8 py-8 rounded-[40px] justify-center items-center max-w-[80%]">
                        <Image
                            source={require("@/assets/images/modals/success-bg.png")}
                            className="w-40 h-40 mb-6 object-contain"
                        />
                        <Text className="text-xl font-UrbanistBold mb-3 text-center text-primary-500">Congratulations!</Text>
                        <Text className="text-lg mb-6 text-center">
                            Appointment successfully booked. You will receive a notification and the doctor you selected will contact you.
                        </Text>

                        <TouchableOpacity className="bg-primary-500 self-stretch mb-3 p-4 rounded-full items-center" onPress={()=>router.push("/Appointments")}>
                            <Text className="text-white font-UrbanistBold">View Appointment</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity className="bg-primary-100 self-stretch p-4 rounded-full items-center" onPress={() => {
                            setSuccessModal(false);
                        }}>
                            <Text className="text-primary-500 font-UrbanistBold">Cancel</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={failedModal}
                onRequestClose={() => {
                    setFailedModal(false);
                }}
            >
                <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className="flex-1 justify-center items-center">
                    <View className="bg-white px-8 py-8 rounded-[40px] justify-center items-center max-w-[80%]">
                        <Image
                            source={require("@/assets/images/modals/failed-bg.png")}
                            className="w-40 h-40 mb-6 object-contain"
                        />
                        <Text className="text-xl font-UrbanistBold mb-3 text-center text-red-500">Oops, Failed!</Text>
                        <Text className="text-lg mb-6 text-center">
                            Appointment failed. Please check your internet connection then try again.
                        </Text>

                        <TouchableOpacity className="bg-primary-500 self-stretch mb-3 p-4 rounded-full items-center">
                            <Text className="text-white font-UrbanistBold">Try Again</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-primary-100 self-stretch p-4 rounded-full items-center" onPress={() => {
                            setFailedModal(false);
                        }}>
                            <Text className="text-primary-500 font-UrbanistBold">Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <View className="px-8 flex-1">
                <NavigationHeader title="Review Summary" />
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {doctor && <MinimalDoctorCard {...doctor} />}
                    <View className="mt-8 mb-5 bg-white rounded-xl px-5 py-2">
                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Date & Hour</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{date}| {time}</Text>
                        </View>

                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Package</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{packageTitle}</Text>
                        </View>

                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Duration</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{packageDuration}</Text>
                        </View>
                    </View>

                    <View className="mb-5 bg-white rounded-xl px-5 py-2">
                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Amount</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{packagePrice}</Text>
                        </View>

                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Duration ({packageDuration})</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{packageIntervals} X {packagePrice}</Text>
                        </View>

                        <View className="flex-row justify-between py-3">
                            <Text className="text-gray-700">Total</Text>
                            <Text className="text-base font-UrbanistSemiBold text-gray-800">{fullAmount}</Text>
                        </View>
                    </View>
                    <View className="mb-5 bg-white rounded-xl px-5">
                        <View className="flex-row justify-between items-center py-3">
                            <View className="flex-1 flex-row items-center">
                                <SvgXml xml={mastercardColorIcon} height={32} />
                                <View className="flex-1 flex-row items-center justify-start text-center">
                                    <Text className="text-4xl font-UrbanistBold px-3 mb-4">.... .... ....</Text>
                                    <Text className="text-xl font-UrbanistBold mb-1">4679</Text>
                                </View>
                            </View>
                            <Text className="text-base font-UrbanistSemiBold text-primary-500">Change</Text>
                        </View>
                    </View>
                </ScrollView>
                <View className="py-3">
                    <TouchableOpacity
                        className="bg-primary-500 p-4 rounded-full items-center"
                        // onPress={() => {
                        //     router.push({
                        //         pathname: "/pin/",
                        //         params: {
                        //             redirect: `/doctor-appointments/review-summary?${success ? "failed=1" : "success=1"}`
                        //         }
                        //     })
                        // }}
                        onPress={bookAppointment}
                        disabled={loading}>
                        {loading ? (<ActivityIndicator color="#FFFFFF" />) : (
                            <Text className="text-white font-UrbanistBold">Next</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View ></>
    )
}