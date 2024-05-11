import { View, Text, TextInput, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { SvgXml } from "react-native-svg";
import { back, calendar, edit, emailIcon, selector } from "../../assets/icons/userprofile/icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { SelectList } from "react-native-dropdown-select-list"
import { Link, useNavigation } from "expo-router";

const UserProfile = ()=> {
    const [image, setImage] = useState("")
    let navigation=useNavigation()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const data = [{ key: '1', value: "Male" }, { key: '2', value: "Female" }, { key: '3', value: "prefer not to say" },]
    const handlePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(() => result.assets[0].uri);
        }
    }
    const formatDate=(rawData:any)=>{
        const date = new Date(rawData);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        if (month<10 && day<10) {
            return `${year}-0${month}-0${day}`
        }
        else if(day<10){
            return `${year}-${month}-0${day}`
        }
        else if(month < 10){
            return `${year}-0${month}-${day}`
        }
        else{
            return `${year}-${month}-${day}`
        }
    }
    const handleShow=()=>{
        setOpen(true);
    }
    const handleHide=()=>{
        setOpen(false);
    }
   const handleConfirm=(selectedDate:Date)=>{
    setDate(selectedDate);
    handleHide();
   }
    return (
        <SafeAreaView className="flex-1 my-10 mx-5 text-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="my-4 flex-row gap-x-2">
                    <SvgXml xml={back} onPress={()=>navigation.goBack()}/>
                    <Text className="text-xl font-UrbanistSemiBold"> Fill your Profile</Text>
                </View>
                <View className="flex-row justify-center">
                    <Image style={{ width: 170, height: 170, marginBottom: 20, marginTop: -10, borderRadius: 100 }}
                        source={image ? { uri: image } : require("../../assets/icons/userprofile/default.png")} resizeMode="cover" />
                    <TouchableOpacity onPress={() => handlePicker()}>
                        <SvgXml xml={edit} className="relative top-20 right-10" width={40} />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 space-y-6 w-1/1">
                    <TextInput placeholder="Full name"
                        className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max" />
                    <TextInput placeholder="Nickname"
                        className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max" />
                    <View>
                        <TextInput placeholder="Date of Birth" editable={false} value={formatDate(date)}
                            className="bg-lightgrey text-base text-black font-UrbanistRegular p-2 pl-5 rounded-xl w-max" />
                        <SvgXml xml={calendar} style={{ position: "absolute", top: 10, right: 20 }} strokeOpacity={date?1:0.5} onPress={handleShow} />
                    </View>
                    <View>
                        <TextInput placeholder="Email"
                            className="bg-lightgrey text-base font-UrbanistRegular p-2 pl-5 rounded-xl w-max" onChangeText={setEmail} />
                        <SvgXml xml={emailIcon} style={{ position: "absolute", top: 10, right: 20 }} strokeOpacity={email?1:0.5}/>
                    </View>
                    <View>
                        <SelectList
                            setSelected={(val: any) => setValue(val)} data={data} save="value"
                            defaultOption={{ key: 0, value: 'Gender' }}
                            dropdownTextStyles={{ fontFamily: 'UrbanistRegular'}}
                            inputStyles={{ fontFamily: 'UrbanistRegular',color:value?"black":"grey", fontSize:16  }}
                            boxStyles={{ borderColor: "transparent", backgroundColor: "#FAFAFA" }}
                            arrowicon={<SvgXml xml={selector} fillOpacity={value?1:0.5} />}
                />
                    </View> 
                </View>
             <DateTimePickerModal onCancel={handleHide} onConfirm={handleConfirm} isVisible={open}/>
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity className="bg-darkblue w-7/8 rounded-3xl py-3 mt-10">
                        <Text className="text-def text-base font-UrbanistRegular text-center font-UrbanistBold">Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default UserProfile;