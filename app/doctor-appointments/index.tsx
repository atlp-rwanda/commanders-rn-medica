import { activityIcon } from "@/assets/icons/activity";
import { chatIcon } from "@/assets/icons/chat";
import { heart, heartFilledIcon } from "@/assets/icons/heart";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { getReview } from "@/redux/Thunk/doctorThunk";
import { getReviews } from "@/redux/reducers/doctors";
export default function DoctorAppointmentScreen() {
  const { doctorId } = useGlobalSearchParams<{ doctorId: string }>();
  let { liked = 'false' } = useGlobalSearchParams<{ liked: string }>();
  const [favorite, setFavorite] = useState(liked == 'true' ? true : false)
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [patientCount, setPatientCount] = useState(0);
  const [userID, setUserID] = useState('');

  const reviews = useSelector((state: RootState) => state.doctors.reviews).slice(0, 2);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctor = async () => {
      const { data } = await supabase.auth.getUser();
      const user_id = data.user?.id;
      setUserID(user_id as string);
      setLoading(true);
      try {
        let { data, error } = await supabase
          .from("doctor")
          .select("*")
          .eq("id", doctorId)
          .single();

        if (error) {
          throw error;
        }
        
        if (error) {
          throw error;
        }

        setDoctor(data);
        const res = await dispatch(getReview(`${doctorId}`)as any).unwrap();
        dispatch(getReviews(res)as any)
        
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);
  useEffect(()=>{
    const abc = async()=>{
      const { data, error } = await supabase
      .from("appointment")
      .select("*")
      .eq("doctor_id", doctorId);
     setPatientCount(data?.length as number)

    }
    abc();
   
  },[doctorId])

  return (
    <View className="px-5 flex-1">
      <NavigationHeader title={doctor?.name || ""}>
        <TouchableOpacity className="w-7 h-7 mr-2" onPress={
          async() => {
            if (favorite) {
              const { error } = await supabase
              .from("favorites")
              .delete()
              .eq("doctor_id", doctorId)
                .eq("user_id", userID);
              if (error) {
                alert('Try again please!')
              }
              else {
                setFavorite(false);
              }
            }
            else {
              const { data, error } = await supabase
              .from('favorites')
              .insert([
                {user_id: userID, doctor_id: doctorId },
              ])
                .select()
              if (error) {
                alert('Try again please!')
              }
              else {
                setFavorite(true);
              }
            }
          }
        }>
          <SvgXml xml={favorite ? heartFilledIcon : heart} width={"100%"} height={"100%"} className={favorite ? "text-primary-500" : "text-gray-900"} />
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
              {patientCount}
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
              {doctor?.Stars.length}
            </Text>
            <Text className="text-sm">rating</Text>
          </View>
          <View className="justify-center items-center">
            <View className="bg-primary-100 p-5 rounded-full mb-3">
              <SvgXml xml={chatIcon} className="text-primary-500" />
            </View>
            <Text className="text-primary-500 font-UrbanistBold text-xl mb-1">
              {reviews.length}
            </Text>
            <Text className="text-sm">reviews</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">About me</Text>
          <Text>
          {doctor?.about}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-UrbanistBold mb-2">Working Time</Text>
        <Text>{doctor?.time}</Text>
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
          {reviews.map((review, index) =>{
            review.name = doctor?.name as any
            return(
            <ReviewCard key={index} {...review} />
          )})}
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
