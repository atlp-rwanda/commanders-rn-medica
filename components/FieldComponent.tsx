
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';

const fields = {
  Newest: "Newest",
  Health: "Health",
  Covid: "Covid-19",
  Lifestyle: "Lifestyle",
  News: "News"
}; 

interface FieldComponentProps {
  articles: { category: string; }[];
  onCategoryChange: (category: string) => void;
}

export default function FieldComponent({ articles, onCategoryChange }: FieldComponentProps) {
  const categories = [...new Set(articles.map(article => article.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  const handleCategoryPress = (category: string) => {
      
    setSelectedCategory(category);
    onCategoryChange(category);
  };


  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity 
          style={[
            styles.button,
            selectedCategory === "all" ? styles.activeButton : null,
          ]}
          onPress={() => handleCategoryPress("all")}
        >
          <Text style={[
            styles.buttonText, 
            selectedCategory === "all"? styles.activeText : null
          ]}>
            Newest
          </Text>
        </TouchableOpacity>
     {categories.map((category, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.button,
            selectedCategory === category ? styles.activeButton : null,
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text style={[
            styles.buttonText, 
            selectedCategory === category ? styles.activeText : null
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  date: {
    color: "#246BFD",
    fontSize: 10,
    backgroundColor: "#D9F1FF",
    borderRadius: 6,
    height: 20,
    width: 50,
    textAlign: "center",
    padding: 4,
    margin: 10,
  },
  scrollView: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: '#246BFD',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: '#246BFD',
  },
  buttonText: {
    fontSize: 16,
    fontFamily:"UrbanistSemiBold",
    textAlign: "center",
    color: '#246BFD',
  },
  activeText: {
    color: "#FFFFFF", 
  },
});
