import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

interface Article {
  category: string;
  createdAt: string;
}

interface FieldComponentProps {
  articles: Article[];
  onCategoryChange: (category: string) => void;
}

export default function FieldComponent({
  articles,
  onCategoryChange,
}: FieldComponentProps) {
  const categories = [...new Set(articles.map((article) => article.category))];
  const [selectedCategory, setSelectedCategory] = useState<string>("Newest");

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      <TouchableOpacity
        style={[
          styles.button,
          selectedCategory === "Newest" ? styles.activeButton : null,
        ]}
        onPress={() => handleCategoryPress("Newest")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedCategory === "Newest" ? styles.activeText : null,
          ]}
        >
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
          <Text
            style={[
              styles.buttonText,
              selectedCategory === category ? styles.activeText : null,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#246BFD",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: "#246BFD",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "UrbanistSemiBold",
    textAlign: "center",
    color: "#246BFD",
  },
  activeText: {
    color: "#FFFFFF",
  },
});