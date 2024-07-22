import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { search } from "../assets/icons/search";
import { focus } from "../assets/icons/focus";
import { filter } from "../assets/icons/filter";
import DocButton from "./cards/DocButtons";
import ReviewButtons from "./cards/ReviewButtons";

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

export const SearchInput: React.FC<Props> = ({
  value,
  onChangeText,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const applyFilters = () => {
    setIsVisible(false);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedRating(0);
    setIsVisible(false);
  };

  return (
    <View className="mt-2">
      <View
        className="flex-row justify-between items-center w-[336px] h-[56] pr-[3px] ml-[3px] rounded-[16px] border-[1px]"
        style={{
          borderColor: isFocused ? "#246BFD" : "#F5F5F5",
          backgroundColor: isFocused ? "rgba(36, 107, 253, 0.08)" : "#F5F5F5",
        }}
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
          className="flex-1 text-[14px] font-UrbanistRegular bg-[transparent] rounded-[28px] pr-[10px]"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginHorizontal: 10 }}
          onPress={toggleModal}
        >
          <SvgXml xml={filter} />
        </TouchableOpacity>
        <Modal
          visible={isVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View
              className="flex-1 justify-end items-end"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <TouchableWithoutFeedback>
                <View className="bg-white rounded-tl-[48px] rounded-tr-[48px]">
                  <Text className="text-[24px] text-[#212121] text-center font-UrbanistBold my-5">
                    Filter
                  </Text>
                  <View className="border-[#EEEEEE] border-[1px] m-4"></View>
                  <View>
                    <Text className="text-[#212121] text-[18px] font-UrbanistBold m-4">
                      Speciality
                    </Text>
                    <DocButton
                      selectedCategory={selectedCategory}
                      onCategorySelect={setSelectedCategory}
                    />
                    <Text className="text-[#212121] text-[18px] font-UrbanistBold m-4">
                      Rating
                    </Text>
                    <ReviewButtons
                      selectedRating={selectedRating}
                      onRatingSelect={setSelectedRating}
                    />
                    <View className="border-[#EEEEEE] border-[1px] m-4"></View>
                  </View>
                  <View className="flex-row justify-around m-1">
                    <TouchableOpacity
                      className="w-[184px] h-[58px] rounded-[100px] bg-[#E9F0FF] py-[18px] px-[16px] mb-2"
                      onPress={resetFilters}
                    >
                      <Text className="text-[#246BFD] text-center font-UrbanistBold text-[16px]">
                        Reset
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-[184px] h-[58px] rounded-[100px] bg-[#246BFD] py-[18px] px-[16px] mb-2"
                      onPress={applyFilters}
                    >
                      <Text className="text-[#FFFFFF] text-center font-UrbanistBold text-[16px]">
                        Apply
                      </Text>
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
