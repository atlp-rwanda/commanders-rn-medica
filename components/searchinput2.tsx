import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { search } from "../assets/icons/search";
import { focus } from "../assets/icons/focus";
import { filter } from "../assets/icons/filter";
import DocButton from "./cards/DocButtons";
import ReviewButtons from "./cards/ReviewButtons"

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const toggleModal = () => {
    setIsVisible(!isVisible);
  }
  const docCards = [
    {
      name: "Dr. Randy Wigham",
      role: "Dentist",
      hospital: "The valley Hospital",
      image: "",
      stars: "4.8",
      reviews: "4,279",
      images: ""
    },
    {
      name: "Dr. Jenny Watson",
      role: "General",
      hospital: "Christ Hospital",
      image: "",
      stars: "4.4",
      reviews: "4,942",
      images: "",
    },
    {
      name: "Dr. Raul Zirkind",
      role: "Nutritionist",
      hospital: "Franklin Hospital",
      image: "",
      stars: "4.8",
      reviews: "6,362",
      images: "",
    },
    {
      name: "Dr. Elijah Baranick",
      role: "pediatric",
      hospital: "JFK Medical Center",
      image: "",
      stars: "4.6",
      reviews: "5,366",
      images: "",
    },
    {
      name: "Dr. Stephen Shute",
      role: "Cardiologist",
      hospital: "The valley Hospital",
      image: "",
      stars: "4.8",
      reviews: "3,279",
      images: "",
    },

  ];
  const filteredDocCards = selectedCategory === "all"
    ? docCards
    : docCards.filter(doc => doc.role.toLowerCase() === selectedCategory.toLowerCase());


  return (
    <View className="mt-2">
      <View className="flex-row  justify-between  items-center w-[336px] h-[56] pr-[3px] ml-[3px] rounded-[16px] border-[1px]"
        style={{
          borderColor: isFocused ? "#246BFD" : "#F5F5F5",
          backgroundColor: isFocused ? "rgba(36, 107, 253, 0.08)" : "#F5F5F5"
        }
      }
      >
        <View className="px-5">
          <SvgXml xml={isFocused ? focus : search} />
        </View>
        <TextInput
          value={value}
          placeholder="Search"
          placeholderTextColor="#BDBDBD"
          onChangeText={onChangeText}
          returnKeyType="search"
          className="flex-1 text-[14px] font-UrbanistRegular bg-[transparent] rounded-[28px] pr-[10px] "
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: 10 }} onPress={toggleModal}>
          <SvgXml xml={filter} />
        </TouchableOpacity>
        <Modal
          visible={isVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleModal}
        >  
         <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View className="flex-1 justify-end items-end " style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <TouchableWithoutFeedback>
            <View className="bg-white rounded-tl-[48px] rounded-tr-[48px]">
              <Text className="text-[24px] text-[#212121] text-center font-UrbanistBold my-5">Filter</Text>
              <View className="border-[#EEEEEE]
border-[1px] m-4"></View>
              <View>
                <Text className="text-[#212121] text-[18px] font-UrbanistBold  m-4">
                  Speciality
                </Text>
                <DocButton selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
                <Text className="text-[#212121] text-[18px] font-UrbanistBold m-4">Rating
                </Text>
                <ReviewButtons />
                <View className="border-[#EEEEEE]
border-[1px]  m-4 "></View>
              </View>
              <View className="flex-row justify-around m-1">
                <TouchableOpacity className="w-[184px] h-[58px] rounded-[100px] bg-[#E9F0FF] py-[18px] px-[16px] mb-2"  onPress={() => {
                  setIsVisible(false)
                }}>
                  <Text className="text-[#246BFD] text-center font-UrbanistBold text-[16px]">Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-[184px] h-[58px] rounded-[100px] bg-[#246BFD] py-[18px] px-[16px] mb-2" onPress={() => {
                  setIsVisible(false)
                }}>
                  <Text className="text-[#FFFFFF] text-center font-UrbanistBold text-[16px]">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};
