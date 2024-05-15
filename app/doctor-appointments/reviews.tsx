import { moreOutlinedIcon } from "@/assets/icons/more";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ReviewCard } from "@/components/cards/reiews/review";
import { RootState } from "@/redux/store/store";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function DoctorReviewsScreen() {
  const reviews = useSelector((state: RootState) => state.doctors.reviews);
  return (
    <View className="px-5 flex-1">
      <NavigationHeader title={"4.8 (4,942 reviews)"}>
        <TouchableOpacity className="w-7 h-7">
          <SvgXml
            xml={moreOutlinedIcon}
            className="text-gray-900"
            width={"100%"}
            height={"100%"}
          />
        </TouchableOpacity>
      </NavigationHeader>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </ScrollView>
    </View>
  );
}
