import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import FieldComponent from "@/components/FieldComponent";
import ArticleCard from "@/components/cards/ArticleCard";
import { articles as allArticles } from "@/constants/articles";

export default function Article() {
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
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ paddingTop: 50, flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../assets/articlesImages/Vector (2).png")}
            />
            <Text style={styles.headerTitle}>Article</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Image
                style={styles.headerIcon}
                source={require("../assets/articlesImages/Search.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("BookMarkedArticle" as never)}
            >
              <Image
                style={styles.headerIcon}
                source={require("../assets/articlesImages/Bookmark.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SeeAllArticles" as never)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {allArticles.map((article) => (
            <View key={article.id} style={styles.articleContainer}>
              <View style={styles.articleContent}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ArticlesDetails", { id: article.id })
                  }
                >
                  <Image style={styles.articleImage} source={article.image} />
                </TouchableOpacity>
                <Text style={styles.articleTitle}>{article.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Articles</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SeeAllArticles" as never)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
           <FieldComponent articles={allArticles} onCategoryChange={handleCategoryChange} />
        </View>

        <ScrollView style={styles.articlesList}>
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: "#212121",
    fontFamily: "UrbanistBold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerIcon: {
    marginTop: 10,
    height: 28,
    width: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#212121",
    fontFamily: "UrbanistBold",
  },
  seeAll: {
    color: "#246BFD",
    fontSize: 16,
    fontFamily: "UrbanistBold",
  },
  articleContainer: {
    marginLeft: 15,
  },
  articleContent: {
    flexDirection: "column",
  },
  articleImage: {
    height: 140,
    width: 220,
    borderRadius: 20,
  },
  articleTitle: {
    fontSize: 18,
    color: "#212121",
    fontFamily: "UrbanistBold",
    width: 230,
    flexWrap: "wrap",
    paddingTop: 15,
  },
  fieldContainer: {
    padding: 5,
  },
  articlesList: {
    marginTop: 10,
    padding: 2,
    flexWrap: "wrap",
    maxWidth: "100%",
    width: "95%",
  },
});
