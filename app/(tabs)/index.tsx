import { RootState } from "@/redux/store/store";
import { Link, router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcons } from "../../assets/icons";
import { heart } from "../../assets/icons/heart";
import { notification } from "../../assets/icons/notification";
import DoctorCard from "../../components/cards/doctCard";
import CarouselComponent from "../../components/carousel";
import { SearchInput } from "../../components/searchinput2";
import { supabase } from "../supabase";
import { Doctor } from "@/redux/reducers/doctors";
import { getProfileImage } from "@/utils/profile";
import { useTranslation } from "react-i18next";
import { getProfile } from "@/redux/actions/profile";
import { UnknownAction } from "redux";
import {
	DotIndicator,
	SkypeIndicator,
	UIActivityIndicator,
} from "react-native-indicators";
import DocButton from "@/components/cards/DocButtons";
import SearchDoctor from "../Doctors/searchDoctor";



const select = [
  { name: "General" },
  { name: "Dentist" },
  { name: "Opthamologist" },
  { name: "Nutritionist" },
  { name: "Neurologist" },
  { name: "Pediatric" },
  { name: "Radiologist" },
  { name: "More" },
];

const Home = () => {
	const navigation = useNavigation();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const insets = useSafeAreaInsets();
  const [loadingDoctor, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const { t } = useTranslation();

  const roleFilters = [
    t("home.specialties.general"),
    t("home.specialties.dentist"),
    t("home.specialties.opthamologist"),
    t("home.specialties.nutritionist"),
    t("home.specialties.neurologist"),
    t("home.specialties.pediatric"),
    t("home.specialties.radiologist"),
    t("home.specialties.more"),
  ];
  

	  const { loading, user } = useSelector(
      (state: RootState) => state.getProfileReducer
    );

  const fetchDoctors = async () => {
      setLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user_id = userData.user?.id;

        const { data: doctorsData, error: doctorsError } = await supabase
          .from("doctor")
          .select("*");
        if (doctorsError) throw doctorsError;

        const { data: favoriteData, error: favoriteError } = await supabase
          .from("favorites")
          .select("doctor_id")
          .eq("user_id", user_id);
        if (favoriteError) throw favoriteError;

        const favoriteDoctorIds = favoriteData.map(
          (favorite) => favorite.doctor_id
        );
        const doctorsWithLikedStatus = doctorsData?.map((doctor) => ({
          ...doctor,
          liked: favoriteDoctorIds.includes(doctor.id),
        }));

        setDoctors(doctorsWithLikedStatus || []);
        setFilteredDoctors(doctorsWithLikedStatus || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    };

    useEffect(() => {
      const unsubscribeFocus = navigation.addListener("focus", fetchDoctors);
      fetchDoctors();
      dispatch(getProfile() as unknown as UnknownAction);
      return () => {
        unsubscribeFocus();
      };
    }, [navigation]);

    const greeting = () => {
      const hour = new Date().getHours();
      return hour < 12 && hour >= 5
        ? t("home.greeting.morning")
        : hour >= 12 && hour < 18
          ? t("home.greeting.afternoon")
          : t("home.greeting.evening");
    };

    useEffect(() => {
      setFilteredDoctors(
        selectedRole === 0
          ? doctors
          : doctors.filter(
              (doctor) => doctor.role === roleFilters[selectedRole]
            )
      );
    }, [selectedRole, doctors]);

    useEffect(() => {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }, [searchQuery, doctors]);

    const applyFilters = () => {
      let filtered = doctors;
      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (doctor) =>
            doctor.role.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      if (selectedRating > 0) {
        filtered = filtered.filter(
          (doctor) => doctor.stars >= selectedRating
        );
      }
      if (searchQuery) {
        filtered = filtered.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredDoctors(filtered);
      setNoResults(filtered.length === 0); 
    };

    useEffect(() => {
      applyFilters();
    }, [selectedCategory, selectedRating, searchQuery, doctors]);

  return (
    <ScrollView
      style={{ marginTop: insets.top }}
      className={`flex-1`}
      keyboardShouldPersistTaps="always"
    >
      <View className="p-6">
        <View className="flex-row items-center justify-between">
          <View className="h-12 w-12 items-center justify-center">
            {loading ? (
              <UIActivityIndicator color={"#246BFD"} size={16} />
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="h-full w-full rounded-full"
                >
                  <Image
                    src={
                      user && user.profile_picture
                        ? user.profile_picture
                        : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                    }
                    className="h-full w-full rounded-full"
                  />
                </TouchableOpacity>
                <View className="right-0 bottom-0 absolute bg-lightblue w-[15px] h-[15px] border-white border-[3px] rounded-lg" />
              </>
            )}
          </View>
          <View className="w-3/5">
            <Text className="font-['UrbanistRegular'] text-[16px]">
              {greeting()} 👋🏽
            </Text>
            <Text className="text-[20px] font-['UrbanistBold']">
              {loading ? (
                <DotIndicator
                  size={6}
                  count={3}
                  style={{ height: 20 }}
                  color={"#212121"}
                />
              ) : (
                user && user.full_name
              )}
            </Text>
          </View>
          <Link href="/notifications/">
            <SvgXml
              xml={notification}
              width={26}
              height={26}
              className="text-gray-900"
            />
          </Link>
          <Link href="/Doctors/favoriteDoctors">
            <SvgXml
              xml={heart}
              width={26}
              height={26}
              className="text-gray-900"
            />
          </Link>
        </View>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
        <CarouselComponent />
        <FlatList
          data={select}
          scrollEnabled={false}
          ListHeaderComponent={
            <View className="flex-row items-center w-full justify-between mt-6 mb-3">
              <Text className="text-[20px] font-['UrbanistBold']">
                {t("home.doctorSpeciality")}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedCategory("all")}
              >
                <Text className="text-[16px] font-['UrbanistBold'] text-lightblue">
                  {t("home.seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          }
          className="w-full"
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
          }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="w-[86px] items-center justify-between me-3 mb-6 h-24"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-[#246BFD14] p-2.5 items-center justify-center rounded-full mb-3 w-[60px] h-[60px]"
                onPress={() => setSelectedCategory(item.name.toLowerCase())}
              >
                <SvgXml xml={MenuIcons[item.name.toLowerCase()]} />
              </TouchableOpacity>
              <Text
                className="text-[16px] font-['UrbanistBold'] text-[#616161]"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {t(`home.specialties.${item.name.toLowerCase()}`)}
              </Text>
            </View>
          )}
          numColumns={4}
        />
      </View>
      <View className="flex-row items-center w-full justify-between px-6 mb-3">
        <Text className="text-[20px] font-['UrbanistBold']">
          {" "}
          {t("home.topDoctors")}
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text
            className="text-[16px] font-['UrbanistBold'] text-lightblue"
            onPress={() => {
              router.push("/Doctors/topDoctors");
            }}
          >
            {t("home.seeAll")}
          </Text>
        </TouchableOpacity>
      </View>
      <DocButton
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <View className="px-6 mb-0 w-full">
        {loadingDoctor ? (
          <View className="flex-1 justify-center">
           <SearchDoctor />
          </View>
        ) : filteredDoctors.length === 0 ? (
          <View className="px-6 mb-0 w-full">
            <Image source={require("../../assets/doctors/notfound.png")} />
            <Text className="text-[24px] font-UrbanistBold text-center py-[15px]">
              Not Found
            </Text>

            <Text className="text-[#212121] font-UrbanistRegular text-center text-[18px] mx-[15px]">
              Sorry, we couldn't find any results based on your search or filter
              criteria. Please adjust your filters or try searching with
              different keywords.
            </Text>
          </View>
        ) : (
          filteredDoctors.map((item, index) => (
            //@ts-ignore
            <DoctorCard
              key={index}
              {...item}
              onPress={() => {
                router.push({
                  pathname: "/doctor-appointments/",
                  params: {
                    doctorId: item.id,
                  },
                });
              }}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};


export default Home;
