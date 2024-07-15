import { dropdownIcon } from "@/assets/icons/file";
import { Menu } from "@/assets/icons/menu";
import { NavigationHeader } from "@/components/NavigationHeader";
import FaqButtons from "@/components/cards/faqButtons";
import { SearchInput } from "@/components/faqSearch";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { supabase } from "../supabase";

interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Contact {
  id: number;
  media: string;
  icon: string;
  link: string;
}

const Help = () => {
  const [selected, setSelected] = useState<"FAQ" | "Contact us">("FAQ");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [contact, setContact] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchQuestionsData = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .from<Question>("questions")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setQuestions(data || []);
      }
    };

    const fetchContactData = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .from<Contact>("contact")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setContact(data || []);
      }
    };

    fetchQuestionsData();
    fetchContactData();
  }, []);

  const handlePress = (item: Contact) => {
    if (item.media === "Customer Service") {
      router.push(item.link);
    } else {
      Linking.openURL(item.link);
    }
  };

  const toggleExpand = (questionId: number) => {
    setExpandedQuestion((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  const filteredQuestions = questions.filter(
    (q) => q.category === selectedCategory
  );

  const searchedQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <NavigationHeader title={"Help Center"} onBack={router.back}>
        <TouchableOpacity onPress={() => console.log("Menu pressed")}>
          <SvgXml xml={Menu} />
        </TouchableOpacity>
      </NavigationHeader>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <Pressable
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setSelected("FAQ")}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "UrbanistSemiBold",
              color: selected === "FAQ" ? "#0165fc" : "#808080",
              paddingBottom: 2,
            }}
          >
            FAQ
          </Text>
          {selected === "FAQ" && (
            <View
              style={{
                width: "100%",
                height: 4,
                backgroundColor: "#0165fc",
                borderRadius: 2,
              }}
            />
          )}
        </Pressable>
        <Pressable
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setSelected("Contact us")}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "UrbanistSemiBold",
              color: selected === "Contact us" ? "#0165fc" : "#808080",
              paddingBottom: 2,
            }}
          >
            Contact us
          </Text>
          {selected === "Contact us" && (
            <View
              style={{
                width: "100%",
                height: 4,
                backgroundColor: "#0165fc",
                borderRadius: 2,
              }}
            />
          )}
        </Pressable>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: "#EEEEEE",
          bottom: -2.6,
          zIndex: -1,
        }}
      />

      {selected === "FAQ" && (
        <View>
          <FaqButtons
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
          />

          <View style={{ marginVertical: 10 }}>
            <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
          </View>
          {searchQuery.length > 0 && searchedQuestions.length > 0 && (
            <View
              style={{
                padding: 20,
                backgroundColor: "white",
                borderRadius: 20,
                elevation: 10,
                shadowColor: "rgba(4, 6, 15, 0.5)",
                shadowRadius: 10,
                shadowOpacity: 0.2,
              }}
            >
              {searchedQuestions.map((item, index) => (
                <View key={item.id}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#212121",
                      fontFamily: "UrbanistSemiBold",
                    }}
                  >
                    {item.question}
                  </Text>
                  {index < searchedQuestions.length - 1 && (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#EEEEEE",
                        width: "100%",
                        marginTop: 10,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
          <FlatList
            data={filteredQuestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 20,
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  elevation: 10,
                  shadowColor: "rgba(4, 6, 15, 0.5)",
                  shadowRadius: 10,
                  shadowOpacity: 0.2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#212121",
                      fontFamily: "UrbanistBold",
                    }}
                  >
                    {item.question}
                  </Text>
                  <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <SvgXml xml={dropdownIcon} />
                  </TouchableOpacity>
                </View>
                {expandedQuestion === item.id && (
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#EEEEEE",
                        width: "100%",
                        marginVertical: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#212121",
                        fontFamily: "UrbanistRegular",
                        marginTop: 10,
                      }}
                    >
                      {item.answer}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}

      {selected === "Contact us" && (
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={contact}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      padding: 20,
                      backgroundColor: "white",
                      borderRadius: 20,
                      elevation: 10,
                      shadowColor: "rgba(4, 6, 15, 0.5)",
                      shadowRadius: 10,
                      shadowOpacity: 0.2,
                    }}
                  >
                    <Image
                      source={{ uri: item.icon }}
                      style={{ width: 20, height: 20.86 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#212121",
                        fontFamily: "UrbanistBold",
                        marginTop: -2,
                        marginLeft: 4,
                      }}
                    >
                      {item.media}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Help;
