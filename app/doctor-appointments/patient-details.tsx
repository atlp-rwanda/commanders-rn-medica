import { TextInput } from "@/components/Input";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Text } from "@/components/ThemedText";
import { Select } from "@/components/select";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { calendar } from "@/assets/icons/userprofile/icons";
import { SvgXml } from "react-native-svg";
import Touchable from "@/components/common/touchable";
import {
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import {
	back,
	edit,
	emailIcon,
	selector,
} from "../../assets/icons/userprofile/icons";
import { SelectList } from "react-native-dropdown-select-list";
import { supabase } from "../supabase";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PatientDetailsScreen() {
	const dimensions = useWindowDimensions();
	const [names, setNames] = useState("");
	const [gender, setGender] = useState("");
	const [dob, setDob] = useState<Date | null>(null);
	const [problem, setProblem] = useState("");
	const [value, setValue] = useState("");
	const [error, setFetchError] = useState<string | null>(null);
	const [user, setUser] = useState<any | null>(null);
	const [patientDetails, setPatientDetails] = useState<any | null>(null);
	const {
		date,
		time,
		packageTitle,
		packageDuration,
		packagePrice,
		packageIntervals,
		doctorId,
	} = useLocalSearchParams<{
		date: any;
		time: any;
		packageDuration: any;
		packageTitle: any;
		packagePrice: any;
		doctorId: any;
		packageIntervals: any;
	}>();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchPatientDetails = async () => {
			const { data: userData, error: userError } =
				await supabase.auth.getUser();
			if (userError) {
				setFetchError(userError.message);
				return;
			}
			const userId = userData?.user?.id;
			if (userId) {
				const { data: patientData, error: patientError } =
					await supabase
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
					setProblem(patientData.problem);
					setDob(new Date(patientData.date_of_birth));
				}
			}
		};
		fetchPatientDetails();
	}, []);

	const SubmitPatientData = async () => {
		if (!names || !gender || !dob || !problem) {
			setFetchError("Please fill out all fields.");
			return;
		}
		const { data, error } = await supabase
			.from("patient")
			.update([
				{
					full_name: names,
					gender: value,
					problem: problem,
					date_of_birth: dob.toISOString(),
				},
			])
			.eq("id", user?.id);

		if (error) {
			console.log(error);
		}
		console.log("data sent in the database");
		console.log(data);
		router.push({
			pathname: "/doctor-appointments/review-summary",
			params: {
				date,
				time,
				packageTitle,
				packageDuration,
				packagePrice,
				packageIntervals,
				doctorId,
			},
		});
	};

	const data = [
		{ key: "1", value: "Male" },
		{ key: "2", value: "Female" },
		{ key: "3", value: "prefer not to say" },
	];

	return (
		<View className="px-5 flex-1">
			<NavigationHeader title="Patient Details" />
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<KeyboardAvoidingView
					behavior="padding"
					className="flex-1"
					style={{ maxHeight: dimensions.height }}
				>
					<View>
						<View className="mt-4 mb-3">
							<Text className="text-lg font-UrbanistBold mb-2">
								Full Name
							</Text>
							<TextInput
								placeholder="Enter full name"
								value={names}
								onChangeText={setNames}
							/>
						</View>
						<View className="mb-5">
							<Text className="text-lg font-UrbanistBold mb-2">
								Gender
							</Text>
							<View>
								<SelectList
									setSelected={(val: any) => setValue(val)}
									data={data}
									save="value"
									defaultOption={{ key: 0, value: "Gender" }}
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
										<SvgXml
											xml={selector}
											fillOpacity={value ? 1 : 0.5}
										/>
									}
								/>
							</View>
						</View>
						<View className="h-14 items-center bg-lightgrey flex-row px-5 rounded-2xl mb-6">
							<TextInput
								placeholder="Birthdate"
								className="text-base font-UrbanistRegular w-[95%]"
								value={dob ? dob.toLocaleDateString() : ""}
								editable={false}
							/>
							<Touchable onPress={() => setOpen(true)}>
								<SvgXml xml={calendar} strokeOpacity={0.5} />
							</Touchable>
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
			<Text className="text-[18px] font-UrbanistRegular text-center text-[#913831]">
				{error}
			</Text>
			<View className="py-3">
				<TouchableOpacity
					className="bg-primary-500 p-4 rounded-full items-center"
					onPress={SubmitPatientData}
				>
					<Text className="text-white font-UrbanistBold">Next</Text>
				</TouchableOpacity>
			</View>
			<DateTimePickerModal
				isVisible={open}
				mode="date"
				onConfirm={(selectedDate: Date) => {
					setDob(selectedDate);
					setOpen(false);
				}}
				onCancel={() => setOpen(false)}
			/>
		</View>
	);
}
