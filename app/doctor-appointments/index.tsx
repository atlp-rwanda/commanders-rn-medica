import { activityIcon } from "@/assets/icons/activity";
import { chatIcon } from "@/assets/icons/chat";
import { heart } from "@/assets/icons/heart";
import { moreOutlinedIcon } from "@/assets/icons/more";
import { starIcon } from "@/assets/icons/star";
import { userIcon } from "@/assets/icons/user";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { MinimalDoctorCard } from "@/components/cards/doctors/MinimalDoctorCard";
import { ReviewCard } from "@/components/cards/reiews/review";
import { RootState } from "@/redux/store/store";
import { useGlobalSearchParams, router, Link } from "expo-router";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function DoctorAppointmentScreen() {
  const { doctorId } = useGlobalSearchParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const reviews = useSelector((state: RootState) => state.doctors.reviews).slice(0, 2);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("doctor")
          .select("name, role, image, hospital, Stars, reviews")
          .eq("id", doctorId)
          .single();

        if (error) {
          throw error;
        }

        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title={doctor?.name || ""}>
        <TouchableOpacity className="w-7 h-7 mr-2">
          <SvgXml xml={heart} width={"100%"} height={"100%"} className="text-gray-900" />
        </TouchableOpacity>
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
        {doctor && <MinimalDoctorCard {...doctor} />}

        <View className="flex-row justify-around my-8">
          <View className="justify-center items-center">
            <View className="bg-primary-100 p-5 rounded-full mb-3">
              <SvgXml xml={userIcon} className="text-primary-500" />
            </View>
            <Text className="text-primary-500 font-UrbanistBold text-xl mb-1">
              5,000+
            </Text>
            <Text className="text-sm">patients</Text>
          </View>
          <View className="justify-center items-center">
            <View className="bg-primary-100 p-5 rounded-full mb-3">
              <SvgXml xml={activityIcon} className="text-primary-500" />
            </View>
            <Text className="text-primary-500 font-UrbanistBold text-xl mb-1">
              10+
            </Text>
            <Text className="text-sm">years exp.</Text>
          </View>
          <View className="justify-center items-center">
            <View className="bg-primary-100 p-5 rounded-full mb-3">
              <SvgXml xml={starIcon} className="text-primary-500" />
            </View>
            <Text className="text-primary-500 font-UrbanistBold text-xl mb-1">
              {doctor?.Stars}
            </Text>
            <Text className="text-sm">rating</Text>
          </View>
          <View className="justify-center items-center">
            <View className="bg-primary-100 p-5 rounded-full mb-3">
              <SvgXml xml={chatIcon} className="text-primary-500" />
            </View>
            <Text className="text-primary-500 font-UrbanistBold text-xl mb-1">
              {doctor?.reviews}
            </Text>
            <Text className="text-sm">reviews</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">About me</Text>
          <Text>
            {doctor?.name} is the top most Immunologists specialist in {doctor?.hospital} at London. She achieved several awards for her wonderful
            contribution in the medical field. She is available for private
            consultation.{" "}
            <Text className="text-primary-500 font-UrbanistSemiBold">
              view more
            </Text>
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">Working Time</Text>
          <Text>Monday - Friday, 08.00 AM - 20.00 PM</Text>
        </View>

        <View className="mb-3">
          <View className="flex-row mb-2 items-center">
            <Text className="text-xl font-UrbanistBold flex-1">Reviews</Text>
            <Link
              href="/doctor-appointments/reviews"
              className="text-lg font-UrbanistSemiBold text-primary-500"
            >
              See All
            </Link>
          </View>
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </View>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push({
              pathname: "/doctor-appointments/book-appointment",
              params: { doctorId },
            });
          }}
        >
          <Text className="text-white font-UrbanistBold">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
