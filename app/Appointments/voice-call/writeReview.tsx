import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Modal, ScrollView, SafeAreaView, Pressable } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useFonts } from 'expo-font';
import FiveStarRating from "../doctorcard/star";
import { supabase } from "../../supabase";

interface CustomCheckBoxProps {
  selected: boolean;
  onPress: () => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {selected && <View style={styles.checkboxSelected} />}
    </TouchableOpacity>
  );
}

export default function Writereview() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isoption, setIsoption] = useState("");
  const [text, setText] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [patientImageUrl, setPatientImageUrl] = useState("");
  const [fontLoaded] = useFonts({
    'UrbanistBold': require('../../../assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistRegular': require("../../../assets/fonts/Urbanist-Regular.ttf"),
    'Urbanist-SemiBold': require("../../../assets/fonts/Urbanist-SemiBold.ttf"),
    'UrbanistMedium': require("../../../assets/fonts/Urbanist-Medium.ttf")
  });

 
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        return;
      }
      const userId = data.user?.id;

      const { data: patientData, error: errordata } = await supabase
        .from("patient")
        .select("profile_picture,full_name")
        .eq("id", userId);

      if (errordata) {
        console.log(errordata);
      } else {
        const patient = patientData?.[0];
        if (patient?.profile_picture) {
          const { data: publicUrlData, error: publicUrlError } = await supabase
            .storage
            .from("files")
            .createSignedUrl(`${patient.profile_picture}`, 63072000);

          if (publicUrlError) {
            console.error("Error fetching signed URL:", publicUrlError.message);
            return;
          }

          setPatientImageUrl(publicUrlData.signedUrl || "");
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleChangeText = (value: string) => {
    setText(value);
  };

  const handleStarPress = (index: number) => {
    setSelectedStars(index + 1);
  };
  const isSubmitEnabled = text.trim().length > 0 && isoption.length > 0;

  const Options = ["Yes", "No"];
  const { appointmentId, doctorImage, role, hospital, name } = useGlobalSearchParams<{ appointmentId: string, doctorImage: string, role: string, hospital: string, name: string }>();

  const writeReview = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      return;
    }
    const userId = data.user?.id;

    const { data: patientData, error: errordata } = await supabase
      .from("patient")
      .select("profile_picture,full_name")
      .eq("id", userId);

    if (errordata) {
      console.log(errordata);
    } else {
      const patient = patientData?.[0];

      const { data: reviewData, error: reviewDataError } = await supabase
        .from("reviews")
        .insert({
          doctorId: appointmentId,
          stars: selectedStars,
          content: text,
          image: patientImageUrl,
          role: role,
          hospital: hospital,
          name: patient?.full_name,
          liked: "false",
        })

      if (reviewDataError) {
        console.log(reviewDataError);
      } else {
        console.log(reviewData);
        setIsModalVisible(true)
      }
    }
  };

  if (!fontLoaded) {
    return null;
  }
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalOverlay}>
          <View className="w-[340px] bg-white flex justify-center items-center rounded-[48px] pr-5 pt-5 pb-5 gap-[25px] ml-[10px]">
            <Image source={require("../../../assets/appointmentIcon/review.png")} />
            <Text className="text-[#246bfd] font-UrbanistBold text-[20px]">Review successful!</Text>
            <Text className="font-UrbanistRegular text-center  w-[300px] text-[16px]">Your review has been successfully submitted. thank you very much!</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/")}
              className='w-[276px] bg-blue-600 rounded-[100px] h-[58px] justify-center mt-5'
            >
              <Text className='text-white text-center font-UrbanistBold'>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View className="w-[370px]">
            <View className="w-[370px] flex flex-row items-center pb-10 pt-5">
              <TouchableOpacity onPress={() => router.back()}>
                <Image className='w-[35px] h-[35px]' source={require("../../../assets/icons/arrow-left.png")} />
              </TouchableOpacity>
              <Text className="text-[#212121] font-UrbanistBold text-[24px] pl-5">Write a Review</Text>
            </View>
            <View className="w-[370px] flex justify-center items-center gap-5 mb-2">
              <Image source={{ uri: doctorImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              <View>
                <Text className="text-[#212121] font-UrbanistBold text-[20px] text-center">How was your experience </Text>
                <Text className="text-[#212121] font-UrbanistBold text-[20px] text-center">with <Text>{name}</Text>?</Text>
              </View>
              <View className=" w-[350px] flex flex-row  justify-center pb-3">
                <SafeAreaView>
                  <FiveStarRating selectedStars={selectedStars} onStarPress={handleStarPress} />
                </SafeAreaView>
              </View>
            </View>
            <View className="border-t-2 border-gray-200">
              <Text className="text-[#212121] font-UrbanistBold text-[20px] pb-3 pt-3">Write Your Review</Text>
              <TextInput
                multiline
                numberOfLines={8}
                value={text}
                onChangeText={handleChangeText}
                placeholder="Your review here..."
                style={styles.textInput}
              />
              <Text className="text-[#212121] font-UrbanistBold text-[20px] pb-5 pt-3">Would you recommend <Text>{name}</Text> to your friends?</Text>
              <View className="flex flex-row items-center pl-2 justify-between w-[130px]">
                {Options.map((option, index) => (
                  <View key={index} className="flex flex-row items-center justify-center gap-2">
                    <CustomCheckBox
                      selected={isoption === option}
                      onPress={() => setIsoption(option)}
                    />
                    <Text>{option}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className="flex flex-row w-[370px] justify-between items-center  pt-3">
            <TouchableOpacity onPress={() => router.back()}>
              <View className=" rounded-3xl pb-3 pt-3 pl-14 pr-14  bg-slate-100 ">
                <Text className="text-blue-700 text-center font-UrbanistBold text-[16px]">
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.container}>
              <Pressable
                onPress={() => writeReview()}
                style={[
                  styles.button,
                  { backgroundColor: isSubmitEnabled ? '#246bfd' : '#3062cb' }
                ]}
                disabled={!isSubmitEnabled}
              >
                <Text className="text-white font-UrbanistBold">Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#246BFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    width: 14,
    height: 14,
    backgroundColor: '#246BFD',
    borderRadius: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  textInput: {
    backgroundColor: '#fafafa',
    borderRadius: 16,
    fontFamily: 'UrbanistMedium',
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top',
    width: '100%',
    minHeight: 100,
  },
});
