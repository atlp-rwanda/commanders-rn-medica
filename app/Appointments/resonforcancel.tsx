import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet,Modal,ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
const arrow = require("../../assets/icons/arrow-left.png");
interface CustomCheckBoxProps {
  selected: boolean;
  onPress: () => void;
}
const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {selected && <View style={styles.checkboxSelected} />}
    </TouchableOpacity>
  );
}
function ReschedulApointment() {
  const [fontLoaded] = useFonts({
    'UrbanistBold': require('../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistMedium': require("../../assets/fonts/Urbanist-Medium.ttf"),
    'UrbanistRegular': require("../../assets/fonts/Urbanist-Regular.ttf"),
    'Urbanist-SemiBold': require("../../assets/fonts/Urbanist-SemiBold.ttf"),
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  if (!fontLoaded) {
    return null;
  }
  const reasons = [
    "I want to change to another doctor",
    "Iwant to change package",
    "I don't want to consult",
    "I have recovered from the desease",
    "I have found a suitable medecine",
    "I just want to cancel",
    "I don't want to tell",
    "Others"
  ];
  const handleChangeText = (value:any) => {
    setText(value);
  };
  return (
    <>
         <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        >
            <View style={styles.modalOverlay}>
            <View className='bg-white absolute w-[340px] rounded-[48px] flex justify-center items-center p-5'>
                <Image source={require("../../assets/appointmentIcon/Group1.png")}/>
                <Text className='text-blue-700 text-xl pt-3 font-UrbanistBold  w-10/12 pb-5 text-center'>Cancel Appointment Success!</Text>
                <Text className='text-center font-UrbanistRegular text-[16px] w-[276px]'>We are very sad that you have cancel your appointment. we will always improve our service to satisfy you in the next appointment</Text>
                <TouchableOpacity onPress={()=>{setIsModalVisible(false)}}
                       className='w-[276px] bg-blue-600 rounded-[100px] h-[58px] justify-center mt-5'
                     >
                    <Text className='text-white text-center font-UrbanistBold'>Ok</Text>
                </TouchableOpacity>
             </View>
            </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className='flex-1 justify-between pb-10 pl-5 pr-5 bg-white'>
      <View className='flex '>
        <View className='flex flex-row gap-3 pt-10 pb-5'>
          <TouchableOpacity onPress={() => router.back()}>
            <Image className='w-[35px] h-[35px]' source={arrow} />
          </TouchableOpacity>
          <Text className='text-[24px] font-UrbanistBold'>Cancel Appointment</Text>
        </View>
        <Text className='font-UrbanistBold text-[20px] pl-1 pb-3'>Reason for Schedule Change</Text>
        <View className='w-11/12 flex gap-2'>
        {reasons.map((reason, index) => (
              <View key={index} className='flex flex-row gap-3 items-center'>
            <CustomCheckBox
              selected={selectedReason === reason}
              onPress={() => setSelectedReason(reason)}
            />
            <Text className='text-base font-UrbanistMedium pb-2 text-[18px]'>{reason}</Text>
          </View>
        ))}
        </View>
        {selectedReason === "Others" && (
          <View className='mb-5'>
            <TextInput
              multiline
              numberOfLines={6}
              value={text}
              onChangeText={handleChangeText}
              style={styles.textarea}
            />
          </View>
        )}
      </View>
      <View style={styles.butshadow} className='bg-blue-600 rounded-[100px] w-[370px] h-[58px] justify-center items-center'>
          <TouchableOpacity 
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
            <Text className=' text-white  text-lg font-UrbanistBold '>Next</Text>
         </TouchableOpacity>
          </View>
    </View>
      </ScrollView>
    </>
  );
}
export default ReschedulApointment;
const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#246BFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  butshadow:{
    shadowColor: '#246bfd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxSelected: {
    width: 14,
    height: 14,
    backgroundColor: '#246BFD',
    borderRadius: 20,
  },
  textarea: {
    backgroundColor: "#F8FAFF",
    borderRadius: 16,
    fontFamily: 'UrbanistMedium',
    fontSize: 16,
    padding: 16,
    textAlignVertical: 'top', 
    width: '100%',
    minHeight: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
