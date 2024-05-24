
import React,{useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import { Link,useNavigation } from 'expo-router';
import FieldComponent from '@/components/FieldComponent';
import ArticleCard from '@/components/cards/ArticleCard';
import { articles as allArticles  } from '@/constants/articles';


export default function SeeAllArticles() {
  const navigation = useNavigation();
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredArticles(allArticles);
      return;
    } else {
      const filtered = allArticles.filter(article => article.category === category);
    setFilteredArticles(filtered);
    }
    
  };
  return (
    <View style={{ paddingTop: 50,backgroundColor:"white"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <FieldComponent/> */}
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ display: "flex", flexDirection: "row", gap: 15, padding: 15 }}>
            <TouchableOpacity onPress={()=>navigation.navigate("Articles" as never)}><Image style={{ marginTop: 10 }} source={require("../assets/articlesImages/vuuu.png")} /></TouchableOpacity>
            <Text style={{ fontSize: 24, color: "#212121", fontFamily:"UrbanistBold" }}>Articles</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 15, padding: 15 }}>
            <TouchableOpacity><Image style={{ position: "relative", marginTop: 10 }} source={require("../assets/articlesImages/Search.png")} /></TouchableOpacity>
            <TouchableOpacity><Image style={{ position: "relative", marginTop: 12 }} source={require("../assets/articlesImages/Group.png")} /></TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 5 }}>
        
        {/* <FieldComponent articles={articles}/> */}
        <FieldComponent articles={allArticles} onCategoryChange={handleCategoryChange} />


        </View>
        
        
        <ScrollView style={{marginTop:10}}showsVerticalScrollIndicator={false}>
          {filteredArticles.map((article, index) => <ArticleCard key={index} article={article}/>)}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
