import { View, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationHeader } from "@/components/NavigationHeader";
import Touchable from "@/components/common/touchable";
import Button from "@/components/button";
import { SvgXml } from "react-native-svg";
import { Formik } from "formik";
import { calendar, emailIcon } from "@/assets/icons/userprofile/icons";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Select } from "@/components/select";
import countries from "world-countries";

const genders = [
  { key: 1, value: "Male" },
  { key: 2, value: "Female" },
];

const EditProfile = () => {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  return (
    <View className={`flex-1 pt-[${insets.top}px] bg-white`}>
      <View className="px-6 mt-8">
        <NavigationHeader title={"Edit Profile"} onBack={router.back} />
      </View>
      <Formik
        initialValues={{
          names: "",
          userName: "",
          dob: new Date(),
          email: "",
          country: "",
          phoneNumber: "",
          gender: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          setTimeout(() => {
            router.back();
          }, 1000);
        }}
      >
        {({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
          <View className="flex-1 px-6">
            <ScrollView className="flex-1 pb-6">
              <View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
                <TextInput
                  placeholder="Names"
                  className="text-base font-UrbanistRegular w-max"
                  onChangeText={handleChange("names")}
                />
              </View>
              <View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
                <TextInput
                  placeholder="Username"
                  className="text-base font-UrbanistRegular w-[95%]"
                  onChangeText={handleChange("userName")}
                />
              </View>
              <View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
                <TextInput
                  placeholder="Birthdate"
                  className="text-base font-UrbanistRegular w-[95%]"
                  value={`${new Date(values.dob).toLocaleDateString()}`}
                  onChangeText={handleChange("dob")}
                />
                <Touchable onPress={() => setOpen((prev) => !prev)}>
                  <SvgXml xml={calendar} strokeOpacity={0.5} />
                </Touchable>
              </View>
              <View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
                <TextInput
                  placeholder="Email"
                  className="text-base font-UrbanistRegular w-[95%]"
                  onChangeText={handleChange("email")}
                />
                <SvgXml xml={emailIcon} strokeOpacity={0.5} />
              </View>
              <Select
                data={countries.map((country, index) => ({
                  key: index,
                  value: country.name.common,
                }))}
                setSelected={(text: string) => setFieldValue("country", text)}
                search
                defaultOption={{
                  key: countries[0].idd,
                  value: countries[0].name.official,
                }}
              />
              <View className="h-6" />
              <View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
                <TextInput
                  placeholder="+1 111 467 378 399"
                  className="text-base font-UrbanistRegular w-max"
                  onChangeText={handleChange("phoneNumber")}
                />
              </View>
              <Select
                data={genders}
                setSelected={(text: string) => setFieldValue("gender", text)}
                defaultOption={genders[0]}
              />
            </ScrollView>
            <Button
              title={"Update"}
              rounded
              onPress={() => handleSubmit()}
              classes="mb-10"
            />
            <DateTimePickerModal
              onCancel={() => setOpen((prev) => !prev)}
              onConfirm={(selectedDate: Date) => {
                setFieldValue("dob", selectedDate);
                setOpen((prev) => !prev);
              }}
              isVisible={open}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;
