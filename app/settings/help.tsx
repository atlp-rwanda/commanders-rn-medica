import { dropdownIcon } from "@/assets/icons/file";
import { Menu } from "@/assets/icons/menu";
import { NavigationHeader } from "@/components/NavigationHeader";
import FaqButtons from "@/components/cards/faqButtons";
import { SearchInput } from "@/components/faqSearch";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Help = () => {
  const [selected, setSelected] = useState("FAQ");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [contact, setContact] = useState([
    {
      media: "Customer Service",
      icon: require("../../assets/contact/headset.png"),
      link: "/settings/customerService",
    },
    {
      media: "WhatsApp",
      icon: require("../../assets/contact/whatsapp.png"),
      link: "https://wa.me/0765432180",
    },
    {
      media: "Website",
      icon: require("../../assets/contact/website.png"),
      link: "https://andela.com/rwanda",
    },
    {
      media: "Facebook",
      icon: require("../../assets/contact/facebook.png"),
      link: "https://www.facebook.com/Andela-Rwanda/",
    },
    {
      media: "Twitter",
      icon: require("../../assets/contact/twitter.png"),
      link: "https://www.twitter.com/andela",
    },
    {
      media: "Instagram",
      icon: require("../../assets/contact/instagram.png"),
      link: "https://www.instagram.com/thisisandela/",
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      question: "What is Medica?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "general",
    },
    {
      question: "How to use Medica?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "general",
    },
    {
      question: "How do I cancel an appointment?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "account",
    },
    {
      question: "How do I cancel an appointment?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "general",
    },
    {
      question: "How do I save the recording?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "general",
    },
    {
      question: "How do I pay for my appointment?",
      answer: "Download it , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "account",
    },
    {
      question: "How do I exit the app?",
      answer: "log out on profile, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "general",
    },
    {
      question: "How do I exit the app?",
      answer: "log out on profile, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "payment",
    },
    {
      question: "How do I reschedule?",
      answer: "log out on profile, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "service",
    },
    {
      question: "can I get a discount?",
      answer: "log out on profile, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "payment",
    },
  ]);

  const handlePress = (item: any) => {
    if (item.media === "Customer Service") {
      router.push(item.link);
    } else {
      Linking.openURL(item.link);
    }
  };

  const toggleExpand = (question: any) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  const filteredQuestions = questions.filter(
    (q) => q.category === selectedCategory
  );

  const searchedQuestions = questions.filter(
    (q) => q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };
  return (
    <View className="bg-white flex-1 px-4 py-10">
      <NavigationHeader title={"Help Center"} onBack={router.back}>
        <TouchableOpacity>
          <SvgXml xml={Menu} />
        </TouchableOpacity>
      </NavigationHeader>

      <View className="py-3 px-3 w-full justify-around ">
        <View className="flex-row justify-around">
          <Pressable className="flex-initial items-center w-2/3" onPress={() => setSelected("FAQ")}>
            <Text className={`font-UrbanistSemiBold text-[18px] ${selected === 'FAQ' ? 'text-lightblue' : 'text-grey'} pb-2`}>FAQ</Text>
            <View className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${selected === 'FAQ' ? '' : 'hidden'}`} />
          </Pressable>
          <Pressable className=" flex-initial items-center w-2/3" onPress={() => setSelected("Contact us")}>
            <Text className={`font-UrbanistSemiBold text-[18px] ${selected === 'Contact us' ? 'text-lightblue' : 'text-grey'} pb-2`}>Contact us</Text>
            <View className={`w-[100%] h-[4px] bg-lightblue rounded-xl ${selected === 'Contact us' ? '' : 'hidden'}`} />
          </Pressable>
        </View>
        <View className=" border-b-[2px] border-[#EEEEEE] relative bottom-[2.6px] z-[-1]" />
      </View>

      {selected == "FAQ" && (
        <View>
          <FaqButtons selectedCategory={selectedCategory} handleCategorySelect={handleCategorySelect} />
         
            <View className="mx-3 my-3 ">
              <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
            </View>
            {searchQuery.length > 0 && searchedQuestions.length > 0 && (
              <View className=" p-5 bg-white rounded-[20px] mx-3" style={{ elevation: 10, shadowColor: "rgba(4, 6, 15, 0.5)", shadowRadius: 10, shadowOpacity: 0.2 }}>
                {searchedQuestions.map((item, index) => (
                  <View key={item.question}>
                    <Text className="text-[14px] text-[#212121] font-UrbanistSemiBold">{item.question}</Text>
                    {index < searchedQuestions.length - 1 && (
                      <View className="border-[#EEEEEE] border-[1px] w-full my-3"></View>
                    )}
                  </View>
                ))}
              </View>
            )}
            <FlatList
              data={filteredQuestions}
              renderItem={({ item }) => (
                <View className="my-3 p-5 bg-white rounded-[20px]   mx-3 " style={{ elevation: 10, shadowColor: "rgba(4, 6, 15, 0.5)", shadowRadius: 10, shadowOpacity: 0.2 }}>
                  <View>
                    <View className="flex-row justify-between">
                      <Text className="text-[18px] text-[#212121] font-UrbanistBold">{item.question}</Text>
                      <TouchableOpacity onPress={() => toggleExpand(item.question)}>
                        <SvgXml xml={dropdownIcon} />
                      </TouchableOpacity>
                    </View>
                    {expandedQuestion === item.question && (
                      <View>
                        <View className="border-[#EEEEEE] border-[1px] w-full my-3"></View>
                        <Text className="text-[16px] text-[#212121] font-UrbanistRegular mt-2">
                          {item.answer}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
       
      )}

      {selected === "Contact us" && (
        <View className="mt-3">
          <FlatList
            data={contact}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <View className="flex-row my-3 p-5 bg-white rounded-[20px] mx-3 " style={{ elevation: 10, shadowColor: "rgba(4, 6, 15, 0.5)", shadowRadius: 10, shadowOpacity: 0.2 }}>
                    <Image source={item.icon} className="w-[20px] h-[20.86px]" />
                    <Text className="text-[18px] text-[#212121] font-UrbanistBold mt-[-2px] ml-4">
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
