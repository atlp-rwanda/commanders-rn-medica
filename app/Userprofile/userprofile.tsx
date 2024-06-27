import { User } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SvgXml } from "react-native-svg";
import {
  back,
  calendar,
  edit,
  emailIcon,
  selector,
} from "../../assets/icons/userprofile/icons";
import { supabase } from "../supabase";
import { UserSessionType, setSession } from "@/redux/reducers/session";
import { AppDispatch, RootState } from "@/redux/store/store";
import {  useSelector } from "react-redux";
const { width: screenWidth } = Dimensions.get("window");

const UserProfile = () => {
	const sessionData = useSelector(
        (state: RootState) => state.session
    );
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user?.id);
      setUserEmail(user?.email || null);
      setFullName(user?.user_metadata?.full_name || "");
      setImage(user?.user_metadata?.picture || "");
      setPhone(user?.phone || "");
    }
  }, [user]);
  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "prefer not to say" },
  ];

  const handlePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formatDate = (rawData: any) => {
    const date = new Date(rawData);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  const handleShow = () => {
    setOpen(true);
  };

  const handleHide = () => {
    setOpen(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    handleHide();
  };

  const uploadImage = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const fileName = `public/${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from("files")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
    return fileName;
  };
	const loadingData=()=>{
		if(sessionData){
			setFullName(sessionData.fullName!);
			setImage (sessionData.picture as string);
			setUserEmail(sessionData.email!);
			setUserId(sessionData.userId!);
			setNickname(sessionData.nickname!);
		}
	}
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!image) {
      setError("Profile picture is required");
      setLoading(false);
      return;
    }

    if (!fullName || !phone || !nickname || !value) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const phoneRegex = /^[0-9]{12}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number");
      setLoading(false);
      return;
    }
    let imageName = null;
    if (image) {
      imageName = await uploadImage(image);
      if (!imageName) {
        setError("Failed to upload image");
        setLoading(false);
        return;
      }
    }

    const { error: insertError } = await supabase.from("patient").insert({
      id: userId,
      full_name: fullName,
      nickname: nickname,
      date_of_birth: formatDate(date),
      phone: phone,
      gender: value,
      email: userEmail,
      profile_picture: imageName,
    });
		// const {data,error}= await supabase.auth.updateUser({phone: phone})
		// if(data){
		// 	router.navigate("/(tabs)")
		// }
		
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/Userprofile/createpin");
      setLoading(false);
    }
		
  };
	useEffect(()=>{
		loadingData()
	}, [sessionData]);
  return (
    <SafeAreaView className="flex-1 my-10 mx-5 text-xl">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-4 flex-row gap-x-2">
          <SvgXml xml={back} onPress={() => router.back()} />
          <Text className="text-xl font-UrbanistSemiBold">
            Fill your Profile
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Image
            style={{
              width: 170,
              height: 170,
              marginBottom: 20,
              marginTop: -10,
              borderRadius: 100,
            }}
            source={
              image
                ? { uri: image }
                : require("../../assets/icons/userprofile/default.png")
            }
            resizeMode="cover"
          />
          <TouchableOpacity onPress={handlePicker}>
            <SvgXml
              xml={edit}
              className="relative top-20 right-10"
              width={40}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 space-y-6 w-1/1">
          <View>
            <TextInput
              placeholder="Full name"
              className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max"
              onChangeText={setFullName}
              value={fullName}
            ><Text>{fullName}</Text></TextInput>
          </View>
          <View>
            <TextInput
              placeholder="Nickname"
              className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max"
              onChangeText={setNickname}
              value={nickname}
            />
          </View>
          <View>
            <TextInput
              placeholder="Date of Birth"
              editable={false}
              value={formatDate(date)}
              className="bg-lightgrey text-base text-black font-UrbanistRegular p-2 pl-5 rounded-xl w-max"
            />
            <SvgXml
              xml={calendar}
              style={{ position: "absolute", top: 10, right: 20 }}
              strokeOpacity={date ? 1 : 0.5}
              onPress={handleShow}
            />
          </View>
          <View>
            <TextInput
              placeholder="Tel"
              className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max"
              onChangeText={setPhone}
              value={phone}
            />
            <SvgXml
              xml={emailIcon}
              style={{ position: "absolute", top: 10, right: 20 }}
              strokeOpacity={phone ? 1 : 0.5}
            />
          </View>
          <View>
            <SelectList
              setSelected={(val: any) => setValue(val)}
              data={data}
              save="value"
              placeholder="Gender"
              search={false}
              dropdownTextStyles={{
                fontFamily: "UrbanistRegular",
              }}
              inputStyles={{
                fontFamily: "UrbanistRegular",
                color: value ? "black" : "grey",
                fontSize: 16,
              }}
              boxStyles={{
                borderColor: "transparent",
                backgroundColor: "#FAFAFA",
              }}
              arrowicon={
                <SvgXml xml={selector} fillOpacity={value ? 1 : 0.5} />
              }
            />
          </View>
        </View>
        <DateTimePickerModal
          onCancel={handleHide}
          onConfirm={handleConfirm}
          isVisible={open}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            className="bg-darkblue w-7/8 rounded-3xl py-3 mt-10"
            onPress={handleSubmit}
          >
            <Text className="text-def text-base text-center font-UrbanistBold">
              {loading ? "Loading" : "Continue"}
            </Text>
          </TouchableOpacity>
          {error ? (
            <Text
              style={{
                marginTop: 10,
                color: "red",
                fontFamily: "UrbanistSemiBold",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
