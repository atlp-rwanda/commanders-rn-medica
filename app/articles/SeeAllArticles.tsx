import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import FieldComponent from "@/components/FieldComponent";
import ArticleCard from "@/components/cards/ArticleCard";
import { supabase } from "../supabase";

interface Article {
  id: number;
  title: string;
  image: string;
  category: string;
  createdAt: string;
  content: string[];
  author: string;
  bookmarked: boolean;
  views: number;
}

export default function SeeAllArticles() {
  const navigation = useNavigation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data: articles, error } = await supabase
      .from("articles")
      .select("*");

    if (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setFilteredArticles([]);
    } else if (articles) {
      setArticles(articles);
      setFilteredArticles(articles);
    } else {
      setArticles([]);
      setFilteredArticles([]);
    }
    setLoading(false);
  };

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.category === category
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <View style={{ paddingTop: 50, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              padding: 15,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={{ marginTop: 10 }}
                source={require("../../assets/articlesImages/vuuu.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                color: "#212121",
                fontFamily: "UrbanistBold",
              }}
            >
              Articles
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              padding: 15,
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ position: "relative", marginTop: 10 }}
                source={require("../../assets/articlesImages/Search.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ position: "relative", marginTop: 12 }}
                source={require("../../assets/articlesImages/Group.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 5 }}>
          <FieldComponent
            articles={articles}
            onCategoryChange={handleCategoryChange}
          />
        </View>
        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
