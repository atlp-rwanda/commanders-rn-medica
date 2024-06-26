
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { useFonts } from 'expo-font';

const CalendarScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [fontLoaded]=useFonts({
    'UrbanistBold':require('../../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistMedium':require("../../../assets/fonts/Urbanist-Medium.ttf"),
    'Urbanist-SemiBold':require("../../../assets/fonts/Urbanist-SemiBold.ttf")
   })

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleDayPress = (day: Date) => {
    setSelectedDate(prevSelectedDate =>
      isSameDay(prevSelectedDate || new Date(), day) ? null : day
    );
  };
  

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{format(currentDate, 'MMMM yyyy')}</Text>
         <View className='flex flex-row gap-1'>
         <TouchableOpacity onPress={handlePrevMonth}>
         <Image  source={require("../../../assets/appointmentIcon/Arcl1.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextMonth}>
        <Image source={require("../../../assets/appointmentIcon/Arcal.png")}/>
        </TouchableOpacity>
         </View>
      </View>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <Text key={day} className='font-UrbanistBold' style={styles.dayOfWeekText}>{day}</Text>
        ))}
      </View>
    );
  };

  const renderDays = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = eachDayOfInterval({ start, end });

    return (
      <View style={styles.days}>
        {days.map(day => (
          <TouchableOpacity
            key={day.toString()}
            onPress={() => handleDayPress(day)}
            style={[
              styles.dayButton,
              isSameDay(selectedDate || new Date(), day) && styles.selectedDayButton,
            ]}
          >
            <Text style={[styles.dayText, isSameDay(selectedDate || new Date(), day) && styles.selectedDayText]}>
              {format(day, 'd')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if(!fontLoaded){
    return null
    }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'#d3dae7',
    borderRadius:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:5,
    width:315
  },
  navButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontFamily:'UrbanistBold'
  },
  daysOfWeek: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10,
    gap:16,
    marginBottom:10
  },
  dayOfWeekText: {
    width: 32,
    textAlign: 'center',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:16,
    paddingLeft:5
  },
  dayButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  selectedDayButton: {
    backgroundColor: '#246bfd',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  dayText: {
    width: 60,
    textAlign: 'center',
    fontFamily:'UrbanistMedium',
    color:'#424242'
  },
  selectedDayText: {
    color: 'white',
  },
});

export default CalendarScreen;


