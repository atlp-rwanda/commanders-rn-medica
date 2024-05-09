import React from 'react';
import { View, Text,StyleSheet } from 'react-native'; 


export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
       <Text>Wellcome to medica app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
