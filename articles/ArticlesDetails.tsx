import { useNavigation, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { articles } from "@/constants/articles";

export default function ArticlesDetails() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const article = articles.find((article) => article.id === Number(id));

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
          <TouchableOpacity
            onPress={() => navigation.navigate("SeeAllArticles" as never)}
          >
            <Image
              style={{ marginTop: 10 }}
              source={require("../assets/articlesImages/vuuu.png")}
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
          <TouchableOpacity>
            <Image
              style={{ height: 22.57, width: 18.13, padding: 10 }}
              source={require("../assets/articlesImages/rwanda.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{ height: 11.07, width: 11.07, padding: 10 }}
              source={require("../assets/articlesImages/rwiza.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{ height: 1.17, width: 1.17, padding: 10 }}
              source={require("../assets/articlesImages/Group.png")}
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
          <TouchableOpacity>
            {article?.image && (
              <Image
                style={{
                  height: 240,
                  width: "100%",
                  borderRadius: 24,
                  justifyContent: "center",
                }}
                source={article?.image}
              />
            )}
          </TouchableOpacity>
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
              }}
            >
              <Text
                style={{
                  color: "#424242",
                  fontSize: 10,
                  marginTop: 10,
                  fontFamily: "UrbanistRegular",
                }}
              >
                {article?.date}
              </Text>
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
            </View>
          </View>
            {article?.content.map((content, index) => (
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
                {content}
              </Text>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
