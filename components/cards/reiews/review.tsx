import { heart, heartFilledIcon } from "@/assets/icons/heart";
import { moreOutlinedIcon } from "@/assets/icons/more";
import { starFilledIcon } from "@/assets/icons/star";
import { Text } from "@/components/ThemedText";
import { Review } from "@/redux/reducers/doctors";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

export function ReviewCard(review: Review) {
  return (
    <View className="my-4">
      <View className="flex-row items-center mb-3">
        <Image source={review.image} className="rounded-full w-12 h-12" />
        <Text className="flex-1 px-3 text-lg font-UrbanistBold">
          {review.name}
        </Text>
        <View className="flex-row items-center">
          <View className="flex-row items-center justify-center rounded-[28px] border-2 border-primary-500 px-3.5 py-[2px] mr-2">
            <View className="w-4 h-4 mr-2">
              <SvgXml
                xml={starFilledIcon}
                className="text-primary-500"
                width={"100%"}
                height={"100%"}
              />
            </View>
            <Text className="text-primary-500 font-UrbanistSemiBold text-lg">
              {review.stars}
            </Text>
          </View>
          <TouchableOpacity className="w-8 h-8">
            <SvgXml
              xml={moreOutlinedIcon}
              className="text-gray-500"
              width={"100%"}
              height={"100%"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mb-3">
        <Text>{review.content}</Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row items-center mr-3">
          <TouchableOpacity className="mr-2">
            <SvgXml
              width={24}
              height={24}
              xml={review.liked ? heartFilledIcon : heart}
              className={review.liked ? "text-primary-500" : "text-gray-500"}
            />
          </TouchableOpacity>
          <Text className="text-gray-700 font-UrbanistSemiBold">
            {review.likes}
          </Text>
        </View>
        <Text className="text-gray-00">{review.time}</Text>
      </View>
    </View>
  );
}
