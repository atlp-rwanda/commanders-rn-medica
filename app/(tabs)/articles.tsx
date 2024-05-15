import { View, Text,TextInput,StyleSheet } from "react-native";
import React from "react";
import Article from "@/articles/Articles";
import ArticlesDetails from "@/articles/ArticlesDetails";
import BookMarkedArticle from "@/articles/BookMarkedArticle";
import SeeAllArticles from "@/articles/SeeAllArticles";
import { createStackNavigator } from '@react-navigation/stack';
// import { Stack } from "expo-router";

const Stack = createStackNavigator();


const Articles = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Articles"options={{headerShown:false}} component={Article} />
    <Stack.Screen name="ArticlesDetails"options={{headerShown:false}}component={ArticlesDetails} />
    <Stack.Screen name="BookMarkedArticle"options={{headerShown:false}} component={BookMarkedArticle} />
    <Stack.Screen name="SeeAllArticles"options={{headerShown:false}}component={SeeAllArticles} />
  </Stack.Navigator>


 
    
    // <Article/>
    // <SeeAllArticles/>
    // <ArticlesDetails/>
    // <BookMarkedArticle/>
    
      
    
  );
};

export default Articles;

