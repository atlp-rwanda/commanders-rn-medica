
import ArticleCard from '@/components/cards/ArticleCard';
import { bookmarks } from '@/constants/articles';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function BookMarkedArticle() {
  const navigation=useNavigation()
  return (
    <SafeAreaView style={{ paddingTop: 50,backgroundColor:"white" }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 15, padding: 15 }}>
          <TouchableOpacity onPress={()=>navigation.navigate("SeeAllArticles"as never)}><Image style={{ marginTop: 10 }} source={require("../assets/articlesImages/vuuu.png")} /></TouchableOpacity>
          <Text style={{ fontSize: 24, color: "#212121", fontFamily:"UrbanistBold" }}>My Bookmark</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 15, padding: 15 }}>
          <TouchableOpacity><Image source={require("../assets/articlesImages/Search.png")} /></TouchableOpacity>
          <TouchableOpacity><Image source={require("../assets/articlesImages/Group.png")} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {bookmarks.map((article, index) => <ArticleCard key={index} article={article}/>)}
      </ScrollView>
    </SafeAreaView>
  
  );
}
