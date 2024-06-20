import { TextInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Select } from "@/components/select";
import { router } from "expo-router";
import { useState , useEffect} from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { supabase } from "../supabase"; 

export default function PatientDetailsScreen() {
  const dimensions = useWindowDimensions();
  const [names, setNames] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [problem, setProblem] = useState("");
  const [error, setFetchError]=useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const[patientDetails, setPatientDetails]=useState<any| null>(null);
  
  useEffect(() => {
    const fetchPatientDetails = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setFetchError(userError.message);
        return;
      }
      const userId = userData?.user?.id;
      if (userId) {
        const { data: patientData, error: patientError } = await supabase
          .from("patient")
          .select("*")
          .eq("id", userId)
          .single();
        if (patientError) {
          setFetchError(patientError.message);
        } else {
          setUser(userData.user);
          setPatientDetails(patientData);
          setNames(patientData.full_name);
          setGender(patientData.gender);
          setAge(patientData.age);
          setProblem(patientData.problem)
        }
      }
    };
    fetchPatientDetails();
  }, []);


  const genders = [
    { key: 1, value: "Male" },
    { key: 2, value: "Female" },
  ];

  const ageArray = Array.from({ length: 100 }, (_, i) => {
    return { key: i, value: i + 1 + " years" }
  });


  return (
    <View className="px-5 flex-1">
      <NavigationHeader title="Patient Details" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
    
        <KeyboardAvoidingView
          behavior="padding"
          className="flex-1"
          style={{ maxHeight: dimensions.height, }}
        >
         
            <View>
          <View className="mt-4 mb-3">
            <Text className="text-lg font-UrbanistBold mb-2">Full Name</Text>
           
            <TextInput placeholder="Enter full name"
              value={names}
              onChangeText={setNames}
            />
            
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">Gender</Text>
            <Select
                data={genders}
                setSelected={setGender}
                defaultOption={genders.find((g) => g.value === gender)}
              />
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">Your Age</Text>
            <Select
                data={ageArray}
                setSelected={setAge}
                defaultOption={ageArray.find((a) => a.value === age + " years")}
                maxHeight={150}
              />
            
          </View>
          <View className="mb-5">
            <Text className="text-lg font-UrbanistBold mb-2">
              Write Your Problem
            </Text>
            <TextInput
              placeholder="Enter problem"
              value={problem}
              onChangeText={setProblem}
              multiline={true}
              numberOfLines={5}
              className="h-52"
            />
              </View>
            </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View className="py-3">
        <TouchableOpacity
          className="bg-primary-500 p-4 rounded-full items-center"
          onPress={() => {
            router.push("/doctor-appointments/review-summary")
          }}
        >
          <Text className="text-white font-UrbanistBold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
