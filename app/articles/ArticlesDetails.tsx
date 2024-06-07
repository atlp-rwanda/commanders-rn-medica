import { useNavigation, useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { supabase } from "../supabase";

interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  createdAt: string;
  content: string[];
  author: string;
  views: number;
}

export default function ArticlesDetails() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (article && userId) {
      incrementViews(article, userId);
    }
  }, [article, userId]);

  useEffect(() => {
    if (id && userId) {
      fetchArticle();
    } else if (!id) {
      setLoading(false);
      setError("No article ID provided");
    }
  }, [id, userId]);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  };

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);

    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching article:", error);
      setError("Failed to load article.");
      setArticle(null);
    } else if (article) {
      setArticle({
        ...article,
        content: [
          article.content__001,
          article.content__002,
          article.content__003,
        ].filter(Boolean),
      });
      checkIfBookmarked(article.id);
    } else {
      setArticle(null);
    }
    setLoading(false);
  };

  const checkIfBookmarked = async (articleId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .eq("article_id", articleId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        setBookmarked(false);
      } else {
        console.log("Error checking bookmark:", error);
      }
    } else if (data) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };

  const toggleBookmark = async () => {
    if (article) {
      const isBookmarked = !bookmarked;
      console.log(
        `Toggling bookmark for article ID: ${article.id}, new status: ${isBookmarked}`.toUpperCase()
      );

      if (isBookmarked) {
        const { data, error } = await supabase
          .from("bookmarks")
          .insert([{ user_id: userId, article_id: article.id }]);

        if (error) {
          console.error("Error adding bookmark:", error);
        } else {
          console.log("Bookmark added successfully", data);
        }
      } else {
        const { data, error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("article_id", article.id);

        if (error) {
          console.error("Error removing bookmark:", error);
        } else {
          console.log("Bookmark removed successfully", data);
        }
      }

      setBookmarked(isBookmarked);
    }
  };

  const incrementViews = async (
    article: Article,
    userId: string
  ): Promise<void> => {
    if (!article?.id || !userId) {
      throw new Error("User ID or Article ID is undefined");
    }

    try {
      // Check if the user has already viewed the article
      const { data: existingView, error: viewError } = await supabase
        .from("views")
        .select("*")
        .eq("user_id", userId)
        .eq("article_id", article.id)
        .single();

      if (viewError && viewError.code !== "PGRST116") {
        // PGRST116: No rows returned
        throw viewError;
      }

      if (!existingView) {
        // User has not viewed the article, so increment the views
        const { data, error } = await supabase.rpc("increment_views", {
          article_id: article.id,
          user_id: userId,
        });

        if (error) {
          console.error("Error incrementing views:", error.message);
        } else {
          console.log("Views incremented successfully", data);
        }
      } else {
        console.log("User already viewed this article");
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const shareArticle = () => {
    if (article) {
      Share.share({
        message: `Check out this article: ${article.title}`,
        url: article.image,
        title: article.title,
      })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  };

  const more = () => {
    console.log("more is clicked");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: 20, fontFamily: "UrbanistBold", color: "#212121" }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: 50, backgroundColor: "white", flex: 1 }}>
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
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 15,
          }}
        >
          <TouchableOpacity onPress={toggleBookmark}>
            <Image
              style={{ height: 22.57, width: 18.13, padding: 10 }}
              source={
                bookmarked
                  ? require("../../assets/articlesImages/Bookmarked.png")
                  : require("../../assets/articlesImages/rwanda.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareArticle}>
            <Image
              style={{ height: 11.07, width: 11.07, padding: 10 }}
              source={require("../../assets/articlesImages/rwiza.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={more}>
            <Image
              style={{ height: 1.17, width: 1.17, padding: 10 }}
              source={require("../../assets/articlesImages/Group.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            gap: 5,
          }}
        >
          {article?.image && (
            <Image
              style={{
                height: 240,
                width: "100%",
                borderRadius: 24,
                justifyContent: "center",
              }}
              source={{ uri: article.image }}
            />
          )}
          <View>
            <Text
              style={{
                fontSize: 21,
                fontFamily: "UrbanistBold",
                color: "#212121",
                paddingLeft: 10,
                position: "relative",
                marginTop: 3,
              }}
            >
              {article?.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 15,
                gap: 10,
                marginTop: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#246BFD",
                  fontSize: 10,
                  backgroundColor: "#E0E7FF",
                  borderRadius: 6,
                  height: 24,
                  width: 59,
                  textAlign: "center",
                  padding: 5,
                  marginTop: 5,
                  fontFamily: "UrbanistRegular",
                }}
              >
                {article?.category}
              </Text>
              <Text
                style={{
                  color: "#246BFD",
                  fontSize: 10,
                  backgroundColor: "#E0E7FF",
                  borderRadius: 6,
                  height: 24,
                  width: "auto",
                  textAlign: "center",
                  padding: 5,
                  marginTop: 5,
                  fontFamily: "UrbanistRegular",
                }}
              >
                {article?.author}
              </Text>
            </View>
          </View>
          {article?.content.map((section, index) => (
            <Text
              key={index}
              style={{
                fontSize: 16,
                color: "#424242",
                fontFamily: "UrbanistRegular",
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
            >
              {section}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
