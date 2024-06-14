import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  OnBoarding from './onboarding';
import LetsYouIn  from "./signupSignin";

export function App() { 
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    checkOnBoarding();
  }, []);
 

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value!== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.error('Error @checkOnboarding: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
   <OnBoarding/>
  );
}
