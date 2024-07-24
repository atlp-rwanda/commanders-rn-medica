import React, { useState, useEffect } from "react";
import { heart, heartFilledIcon } from "@/assets/icons/heart";
import { moreOutlinedIcon } from "@/assets/icons/more";
import { starFilledIcon } from "@/assets/icons/star";
import { Text } from "@/components/ThemedText";
import { Review } from "@/redux/reducers/doctors";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { supabase } from "../../../app/supabase";

export function ReviewCard(review: Review) {
  const [numberLike, setNumberLike] = useState(0);
  const [isLiked, setIsLiked] = useState(review.liked);
  const [createdAt, setCreatedAt] = useState("");
  const [image, setImage] = useState();
  const [liked,setliked]=useState<any[]>([]);

  useEffect(() => {
    const fetchCreatedAt = async () => {
      const { data:reData, error } = await supabase
        .from("reviews")
        .select("created_at,image")
        .eq("id", review.id)
        .single();

      if (error) {
        console.error("Error fetching created_at:", error);
      } else {
        setCreatedAt(reData.created_at);
        setImage(reData.image)
      }
    };

    fetchCreatedAt();
  }, [review.id]);

  const getTimeDifference = (timestamp: string) => {
    const now = new Date();
    const reviewDate = new Date(timestamp);
    const timeDiff = now.getTime() - reviewDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "1 day ago";
    } else {
      return `${daysDiff} days ago`;
    }
  };

  const timeAgo = createdAt ? getTimeDifference(createdAt) : "";

  const handleLike = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error(userError);
      return;
    }else{
      const userId = userData?.user?.id;
      if (!userId) {
        console.log("Go to login first, no access you have");
        return;
      }else{
        const { data: likeData, error: likeError } = await supabase
        .from("like-review")
        .select("userId")
        .eq("reviewId", review.id)
        .eq("userId", userId)
        .single();
        if (likeError && likeError.code !== 'PGRST116') {
          console.error(likeError);
          return;
        }else  if (likeData) {
          console.log("User already liked, please you don't have to like again");
          return;
        }else{
          const { data, error } = await supabase
          .from("like-review")
          .insert({ reviewId: review.id, userId,like:numberLike + 1 });
          if (error) {
            console.error(error);
            return;
          }else{
            setNumberLike(numberLike + 1);
            setIsLiked(true);
          }
        }
      }
    } 
  };
  const fetchliked = async()=>{
    const { data: likedData, error: likedError } = await supabase
    .from("like-review")
    .select("*")
    .eq("reviewId", review.id)
     if(likedError){
       console.log(likedError)
     }else{
      setliked(likedData)
    }
  }
  useEffect(() => {
    fetchliked();
  }, []);

  console.log(image)
  return (
    <View className="my-4">
      <View className="flex-row items-center mb-3">
        <Image source={{ uri:`${image}` }} className="rounded-full w-12 h-12" />
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
          <TouchableOpacity className="mr-2" onPress={handleLike}>
            <SvgXml
              width={24}
              height={24}
              xml={isLiked ? heartFilledIcon : heart}
              className={liked.length > 0 ? "text-primary-500" : "text-gray-500"}
            />
          </TouchableOpacity>
          <Text className="text-gray-700 font-UrbanistSemiBold">
            {liked.length}
          </Text>
        </View>
        <Text className="text-gray-700">{timeAgo}</Text>
      </View>
    </View>
  );
}
