import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ScrollView } from "react-native";
import CalendarScreen from './doctorcard/calendal';
import { router, useGlobalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { Formik } from "formik";
import { parseISO } from 'date-fns';
import { createClient } from '@supabase/supabase-js';

const arrow = require("../../assets/icons/arrow-left.png");

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

function SelectDate() {
  const [fontLoaded] = useFonts({
    'UrbanistBold': require('../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistRegular': require("../../assets/fonts/Urbanist-Regular.ttf"),
    'UrbanistSemiBold': require("../../assets/fonts/Urbanist-SemiBold.ttf"),
    'UrbanistMedium': require("../../assets/fonts/Urbanist-Medium.ttf")
  });

  if (!fontLoaded) {
    return null;
  }

  const { selectedreason, date, time, appointmentId } = useGlobalSearchParams();
  const [selectedTime, setSelectedTime] = useState(time || null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const hour = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "15:00 PM", "15:30 PM", "16:00 PM", "16:30 PM", "17:00 PM", "17:30 PM"];

  const handleTimeSelect = (selected:any) => {
    setSelectedTime(selectedTime === selected ? null : selected);
  };

  const updateAppointment = async (values:any) => {
    try {
      const { error } = await supabase
        .from('appointment')
        .update({ date: values.date, time: values.time })
        .eq('id', values.appointmentId);

      if (error) {
        console.error('Error updating appointment:', error);
      } else {
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Network request failed:', error);
    }
  };


  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require("../../assets/appointmentIcon/Group.png")} />
            <Text style={styles.modalTitle}>Rescheduling Success!</Text>
            <Text style={styles.modalText}>Appointment successfully changed. You will receive notification and the doctor you selected will contact you</Text>
            <TouchableOpacity style={styles.modalButton} onPress={()=>
               router.push("/Appointments")
            }>
              <Text style={styles.modalButtonText}>View Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <View style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image style={styles.arrow} source={arrow} />
            </TouchableOpacity>
            <Text style={styles.title}>Reschedule Appointment</Text>
          </View>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Formik
            initialValues={{ selectedreason, date, time: selectedTime, appointmentId }}
            onSubmit={(values) => {
              console.log(values);
              updateAppointment(values);
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <CalendarScreen
                  selectedDate={typeof date === "string" ? parseISO(date) : undefined}
                  onDateChange={(newDate) => setFieldValue('date', newDate.toISOString())}
                />
                <Text style={styles.sectionTitle}>Select Hour</Text>
                <View style={styles.timeContainer}>
                  {hour.map((selecthour) => (
                    <TouchableOpacity
                      key={selecthour}
                      style={[
                        styles.timeButton,
                        selectedTime === selecthour && styles.selectedTimeButton,
                      ]}
                      onPress={() => {
                        handleTimeSelect(selecthour);
                        setFieldValue('time', selecthour);
                      }}
                    >
                      <Text style={[
                        styles.timeText,
                        selectedTime === selecthour && styles.selectedTimeText,
                      ]}>{selecthour}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
}

export default SelectDate;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 340,
    borderRadius: 48,
    padding: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#246bfd',
    fontSize: 20,
    fontFamily: 'UrbanistBold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalButton: {
    backgroundColor: '#246bfd',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  arrow: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 24,
    fontFamily: 'UrbanistBold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'UrbanistBold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#246bfd',
    marginBottom: 10,
  },
  selectedTimeButton: {
    backgroundColor: '#246bfd',
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#246bfd',
  },
  selectedTimeText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#246bfd',
    borderRadius: 100,
    width: 370,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'UrbanistBold',
  },
});
