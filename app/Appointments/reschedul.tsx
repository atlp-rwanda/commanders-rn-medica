import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
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
  const [selectedReason, setSelectedReason] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  if (!fontLoaded) {
    return null;
  }
  const reasons = [
    "I'm having a schedule clash",
    "I'm not available on schedule",
    "I have an activity that cannot be left behind",
    "I don't want to tell",
    "Others"
  ];
  const handleChangeText = (value:any) => {
    setText(value);
  };
  return (
    <View className="flex-1 justify-between  pl-5 pr-5 pb-10 pt-10 bg-white">
      <View className="flex gap-2">
        <View className="flex flex-row pb-5 pt-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Image className='w-[35px] h-[35px]' source={arrow} />
          </TouchableOpacity>
          <Text className="text-[24px] font-UrbanistBold pl-2">
            Reschedule Appointment
          </Text>
        </View>
        <Text className="font-UrbanistBold text-[20px] pl-1">
          Reason for Schedule Change
        </Text>
        <View className="w-11/12 flex gap-1">
          {reasons.map((reason, index) => (
            <View key={index} className="flex flex-row gap-3 items-center">
              <CustomCheckBox
                selected={selectedReason === reason}
                onPress={() => setSelectedReason(reason)}
              />
              <Text className="text-base text-[16px] font-UrbanistMedium pb-2">
                {reason}
              </Text>
            </View>
          ))}
        </View>
        {selectedReason === "Others" && (
          <View>
            <TextInput
              multiline
              numberOfLines={8}
              value={text}
              onChangeText={handleChangeText}
              style={styles.textarea}
            />
          </View>
        )}
      </View>
      <View style={styles.butshadow} className="bg-blue-600  w-[380px] h-[58px] justify-center items-center rounded-[100px]">
      <TouchableOpacity
        onPress={() => router.push("/Appointments/selectdate")} 
      >
        <Text  className='text-white font-UrbanistBold text-[16px]'>
          Next
        </Text>
      </TouchableOpacity>
      </View >
     
    </View>
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
  checkboxSelected: {
    width: 14,
    height: 14,
    backgroundColor: '#246BFD',
    borderRadius: 20,
  },
  textarea: {
    borderRadius: 10,
    backgroundColor: "#F8FAFF",
    padding: 10,
    fontSize: 14,
    width: "100%",
    fontFamily: 'UrbanistSemiBold',
    color:'#454242'
  },
  butshadow:{
    shadowColor: '#246bfd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
