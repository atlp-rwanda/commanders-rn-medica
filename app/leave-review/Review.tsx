import { Icon } from "@/components/Icon";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";

import { messages } from "@/app/chat-history/data";
import { areaView } from "@/styles/common";
import YesNo from "@/components/cards/doctors/YesNo";
import { ScrollView } from "react-native-gesture-handler";

const ratings = [1, 2, 3, 4, 5];

const Review = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating((prevRating) => (prevRating === rating ? null : rating));
  };

  const getImage = (rating: number) => {
    return rating <= (selectedRating ?? 0)
      ? require("../../assets/doctors/blue.png")
      : require("../../assets/doctors/star-outline.png");
  };

  const renderItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      onPress={() => handleRatingSelect(item)}
      className="mr-[16px]"
    >
      <Image source={getImage(item)} className="w-[30px] h-[28.33px]" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={areaView}>
      <ScrollView className="flex-1  gap-[24px] p-[24px] bg-white">
        <View className="flex-row items-center gap-x-3">
          <Icon name="back" onPress={router.back} />
          <Text className="flex-1 font-UrbanistBold text-[24px]">
            Write a Review
          </Text>
        </View>
        <View className="items-center">
          <Image source={messages[4].image} className="w-[160px] h-[160px]" />
        </View>
        <View className="items-center justify-center">
          <Text className="font-UrbanistBold text-[20px]">
            How was your experience
          </Text>
          <Text className="font-UrbanistBold text-[20px]">
            with Dr. Drake Boeson?
          </Text>
        </View>
        <View className="items-center">
          <FlatList
            data={ratings}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            horizontal={true}
          />
        </View>
        <View>
          <Text className="font-UrbanistBold text-[20px] mb-[16px]">
            Write Your Review
          </Text>
          <View className="bg-[#F8FAFF] p-[10px] h-[180px] border-radius: 1rem">
            <TextInput
              multiline
              placeholder="Your review here... "
              className="font-UrbanistSemiBold text-[14px]"
              scrollEnabled
            />
          </View>
        </View>

        <View className="flex-1">
          <Text className="font-UrbanistBold text-[20px]">
            Would you recommend Dr. Drake Boeson to your friends?
          </Text>
          <YesNo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Review;
