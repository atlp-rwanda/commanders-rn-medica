import { Text } from "@/components/ThemedText";
// import { Doctor } from "@/redux/reducers/doctors";
import { Image, View } from "react-native";

interface SimpleDoctorCardProps{
  image?:any
  name:string,
  role:string,
  hospital:string,
}

export function MinimalDoctorCard(doctor: SimpleDoctorCardProps) {
  console.log("Doctor Image:", doctor.image);
 // const imageUri = typeof doctor.images === 'string' ? doctor.images : '../../assets/doctors/doc2.png';
  return (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm mx-1">
      <View className="flex-row items-start">
        <Image
          source={{uri:doctor.image}}
          className="w-28 h-28 rounded-xl object-cover"
        />
        <View className="ml-4 flex-1">
          <Text className="font-UrbanistBold text-lg py-2">{doctor.name}</Text>
          <View className="mb-3 border-b border-gray-200" />
          <Text className="text-gray-700 mb-1 font-UrbanistMedium">
            {doctor.role}
          </Text>
          <Text className="text-gray-700 font-UrbanistMedium">
            {doctor.hospital}
          </Text>
        </View>
      </View>
    </View>
  );
}
