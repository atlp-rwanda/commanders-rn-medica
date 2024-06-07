import ArticleCard from "@/components/cards/ArticleCard";
import { supabase } from "../supabase";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface Article {
  id: number;
  title: string;
  image: string;
  category: string;
  createdAt: string;
  content: string[];
  author: string;
  views: number;
}

export default function BookMarkedArticle() {
  const navigation = useNavigation();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBookmarkedArticles();
    }
  }, [userId]);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    } else {
      console.error("User not logged in");
      setLoading(false);
    }
  };

  const fetchBookmarkedArticles = async () => {
    setLoading(true);

    const { data: bookmarks, error } = await supabase
      .from("bookmarks")
      .select("article_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching bookmarks:", error);
      setBookmarkedArticles([]);
      setLoading(false);
      return;
    }

    const articleIds = bookmarks.map((bookmark) => bookmark.article_id);

    const { data: articles, error: articleError } = await supabase
      .from("articles")
      .select("*")
      .in("id", articleIds);

    if (articleError) {
      console.error("Error fetching bookmarked articles:", articleError);
      setBookmarkedArticles([]);
    } else {
      setBookmarkedArticles(articles);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ paddingTop: 50, backgroundColor: "white" }}>
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
            My Bookmark
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
            <Image source={require("../../assets/articlesImages/Search.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../assets/articlesImages/Group.png")} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          bookmarkedArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}