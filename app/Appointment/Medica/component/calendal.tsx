import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View >
      <Calendar
        current={'2022-05-24'}
        markedDates={{
          '2022-05-01': { selected: true, marked: true },
          '2022-05-02': { marked: true },
          '2022-05-03': { marked: true, dotColor: '#EEF4FF' },
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        theme={{
          backgroundColor: 'black', 
          calendarBackground: '#black', 
          textSectionTitleColor: '#718096', 
          selectedDayBackgroundColor: '#4299E1', 
          selectedDayTextColor: '#FFFFFF', 
          todayTextColor: '#2D3748', 
          dayTextColor: '#2D3748', 
          textDisabledColor: '#CBD5E0',
          dotColor: '#FF0000', 
          selectedDotColor: '#FFFFFF', 
          arrowColor: '#4299E1', 
          monthTextColor: '#4299E1', 
          indicatorColor: '#4299E1', 
        }}
      />
    </View>
  );
};
export default CalendarScreen;
