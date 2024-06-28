import { View, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationHeader } from "@/components/NavigationHeader";
import Touchable from "@/components/common/touchable";
import Button from "@/components/button";
import { SvgXml } from "react-native-svg";
import { Formik } from "formik";
import { calendar, emailIcon } from "@/assets/icons/userprofile/icons";
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Select } from "@/components/select";
import countries from "world-countries";
import { supabase } from "../supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
	getProfile,
	resetProfileState,
	updateProfile,
} from "@/redux/actions/profile";
import { UnknownAction } from "redux";

const genders = [
	{ key: 1, value: "Male" },
	{ key: 2, value: "Female" },
];

const EditProfile = () => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const { user } = useSelector((state: RootState) => state.getProfileReducer);
	const { loading, message } = useSelector(
		(state: RootState) => state.updateProfileReducer
	);

	useEffect(() => {
		dispatch(getProfile() as unknown as UnknownAction);
	}, []);

	useEffect(() => {
		if (message) {
			dispatch(getProfile() as unknown as UnknownAction);
			dispatch(resetProfileState());
			router.back();
		}
	}, [dispatch, message, router]);

	return (
		<View className={`flex-1 pt-[${insets.top}px] bg-white`}>
			<View className="px-6 mt-8">
				<NavigationHeader title={"Edit Profile"} onBack={router.back} />
			</View>
			<Formik
				initialValues={{
					id: user.id,
					full_name: user?.full_name,
					nickname: user?.nickname,
					date_of_birth: user?.date_of_birth,
					email: user?.email,
					phone: user?.phone,
					gender: user?.gender,
				}}
				onSubmit={(values) => {
					console.log(values);
					dispatch(updateProfile(values) as unknown as UnknownAction);
				}}
			>
				{({
					handleChange,
					handleSubmit,
					errors,
					values,
					setFieldValue,
				}) => (
					<View className="flex-1 px-6">
						<ScrollView className="flex-1 pb-6">
							<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
								<TextInput
									value={values.full_name}
									defaultValue={user && user.full_name}
									placeholder="Full Name"
									className="text-base font-UrbanistRegular w-full"
									onChangeText={handleChange("full_name")}
								/>
							</View>
							<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
								<TextInput
									defaultValue={user && user.nickname}
									value={values.nickname}
									placeholder="Username"
									className="text-base font-UrbanistRegular w-[95%]"
									onChangeText={handleChange("nickname")}
								/>
							</View>
							<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
								<TextInput
									placeholder="Birthdate"
									className="text-base font-UrbanistRegular w-[95%]"
									value={`${new Date(
										values.date_of_birth
									).toLocaleDateString()}`}
									defaultValue={new Date(
										user && user.date_of_birth
									).toLocaleDateString()}
									onChangeText={handleChange("date_of_birth")}
								/>
								<Touchable
									onPress={() => setOpen((prev) => !prev)}
								>
									<SvgXml
										xml={calendar}
										strokeOpacity={0.5}
									/>
								</Touchable>
							</View>
							<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
								<TextInput
									defaultValue={user && user.email}
									value={values.email}
									placeholder="Email"
									className="text-base font-UrbanistRegular w-[95%]"
									onChangeText={handleChange("email")}
								/>
								<SvgXml xml={emailIcon} strokeOpacity={0.5} />
							</View>
							<View className="h-6" />
							<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
								<TextInput
									defaultValue={user && user.phone}
									value={values.phone}
									placeholder="+1 111 467 378 399"
									className="text-base font-UrbanistRegular w-full"
									onChangeText={handleChange("phone")}
								/>
							</View>
							<Select
								data={genders}
								setSelected={(text: string) =>
									setFieldValue("gender", text)
								}
								defaultOption={
									genders.filter(
										(item) => item.value === user?.gender
									)[0]
								}
							/>
						</ScrollView>
						<Button
							title={"Update"}
							rounded
							onPress={() => handleSubmit()}
							classes="mb-10"
							loading={loading}
							disabled={loading}
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
