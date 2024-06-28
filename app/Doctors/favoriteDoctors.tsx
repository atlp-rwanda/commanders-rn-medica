import DoctorCard from "../../components/cards/doctCard";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DocButton from "@/components/cards/DocButtons";
import { Icon } from "@/components/Icon";
import React, { useEffect, useState } from "react";

import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	ImageSourcePropType,
	Modal,
} from "react-native";
type cardSpot = {
	id: string;
	name: string;
	role: string;
	hospital: string;
	image: string;
	stars: string;
	reviews: string;
	images: ImageSourcePropType;
};
import { useFonts } from "expo-font";
import { supabase } from "../supabase";
import { Doctor } from "@/redux/reducers/doctors";
import { heart } from "@/assets/icons/heart";
import { SvgXml } from "react-native-svg";
export default function DoctorDetails() {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedSpot, setSelectedSpot] = useState<cardSpot | null>(null);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [userID, setUserID] = useState("");
	const [isEmpty, setIsEmpty] = useState(false);
	const toggleModal = (spot: any) => {
		setIsVisible(!isVisible);
		setSelectedSpot(spot);
	};
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
	const [deletedDoctor, setDeletedDoctor] = useState("");

	const fetchDoctors = async () => {
		try {
			const { data } = await supabase.auth.getUser();
			const user_id = data.user?.id;
			setUserID(user_id as string);
			let { data: doctorsData, error } = await supabase
				.from("doctor")
				.select("*");

			if (error) {
				console.error("Error fetching data:", error);
			} else {
				// console.log("Doctors:----->", doctorsData);
				const { data: favoriteData, error: favoriteError } = await supabase
					.from("favorites")
					.select("doctor_id")
					.eq("user_id", user_id);

				if (favoriteError) {
					console.error("Error fetching favorites:", favoriteError);
					return [];
				}

				console.log("Favorites tab:----->", favoriteData);

				const favoriteDoctorIds = favoriteData.map(
					(favorite) => favorite.doctor_id
				);
				const doctorsWithLikedStatus = doctorsData!.filter((doctor) => {
					return favoriteDoctorIds.includes(doctor.id);
				});
				if (doctorsWithLikedStatus.length == 0) {
					setIsEmpty(true);
				}
				setDoctors(doctorsWithLikedStatus || []);
				setFilteredDoctors(doctorsWithLikedStatus || []);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchDoctors();
	}, [deletedDoctor]);

	const filteredDocCards =
		selectedCategory === "all"
			? doctors
			: doctors.filter(
					(doc) => doc.role.toLowerCase() === selectedCategory.toLowerCase()
			  );

	return (
		<View style={styles.mainContainer}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="bg-white px-4 py-5">
					<StatusBar style="dark" />
					<View style={styles.search}>
						<Icon name="back" onPress={router.back} />
						<Text className="flex-1 font-UrbanistBold text-2xl ml-2">
							{" "}
							My Favorite Doctors
						</Text>
						<View className="flex-row">
							<TouchableOpacity
								onPress={() => {
									router.push("/Doctors/searchDoctor");
								}}>
								<Image
									source={require("../../assets/doctors/searchIcon.png")}
									style={styles.image1}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									source={require("../../assets/doctors/menu.png")}
									style={styles.images}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<DocButton
						selectedCategory={selectedCategory}
						onCategorySelect={setSelectedCategory}
					/>
					{isEmpty && (
						<View style={styles.message}>
							<SvgXml
								xml={heart}
								width={50}
								height={50}
								className="text-gray-900 my-4"
							/>
							<Text style={styles.title}>You have no favorite doctors</Text>
						</View>
					)}
					{filteredDocCards.map((spot, index) => (
						//@ts-ignore
						<DoctorCard
							key={index}
							{...spot}
							onPress={() => toggleModal(spot)}
						/>
					))}

					<Modal
						visible={isVisible}
						animationType="fade"
						transparent={true}
						onRequestClose={toggleModal}>
						<TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
							<View
								style={{
									flex: 1,
									justifyContent: "flex-end",
									alignItems: "flex-end",
									backgroundColor: "rgba(0,0,0,0.5)",
								}}>
								<TouchableWithoutFeedback>
									<View
										style={{
											backgroundColor: "white",
											borderTopRightRadius: 48,
											borderTopLeftRadius: 48,
										}}>
										<Text style={styles.title}>Remove from favorite?</Text>
										<Text style={styles.line}></Text>
										{selectedSpot && (
											<>
												<View
													className="bg-white rounded-3xl p-4 m-4"
													style={styles.card1}>
													<View className="flex-row justify-between w-full">
														<Image
															source={{ uri: selectedSpot.image }}
															className="w-28 h-28"
														/>
														<View style={styles.details}>
															<Text style={styles.title1}>
																{selectedSpot.name}
															</Text>
															<Text style={styles.line}></Text>
															<View style={styles.docinfo}>
																<Text style={styles.title2}>
																	{selectedSpot.role}
																</Text>
																<Text style={styles.separator}></Text>
																<Text style={styles.title2}>
																	{selectedSpot.hospital}
																</Text>
															</View>
															<View style={styles.views}>
																<Image
																	source={require("../../assets/doctors/star.png")}
																/>
																<Text style={styles.title3}>
																	{selectedSpot.stars}
																</Text>
																<Text style={styles.title3}>
																	({selectedSpot.reviews} reviews)
																</Text>
															</View>
														</View>
													</View>
												</View>
												<View style={styles.btns}>
													<TouchableOpacity
														style={styles.regularBtn}
														onPress={() => {
															setIsVisible(false);
														}}>
														<Text style={styles.btnText}>Cancel</Text>
													</TouchableOpacity>
													<TouchableOpacity
														style={styles.activeBtn}
														onPress={async () => {
															setIsVisible(false);
															const { error } = await supabase
																.from("favorites")
																.delete()
																.eq("doctor_id", selectedSpot.id)
																.eq("user_id", userID);
															setDeletedDoctor(selectedSpot.id);
														}}>
														<Text style={styles.activeText}>Yes, Remove</Text>
													</TouchableOpacity>
												</View>
											</>
										)}
									</View>
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				</View>
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	message: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 50,
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	card1: { elevation: 5 },
	container: {
		shadowColor: "rgba(4, 6, 15, 0.5)",
		shadowRadius: 10,
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 4 },
	},
	images: {
		width: 28,
		height: 28,
	},
	image1: {
		width: 28,
		height: 28,
		marginRight: 15,
	},
	title: {
		textAlign: "center",
		marginVertical: 10,
		fontSize: 24,
		fontFamily: "UrbanistBold",
	},

	search: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 30,
	},

	results: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},

	activeBtn: {
		backgroundColor: "#246BFD",
		width: 184,
		height: 58,
		paddingHorizontal: 18,
		paddingVertical: 16,
		borderRadius: 100,
	},
	activeText: {
		color: "#FFFFFF",
		textAlign: "center",
		fontFamily: "UrbanistBold",
		fontSize: 18,
	},
	regularBtn: {
		backgroundColor: "#E9F0FF",

		width: 184,
		height: 58,
		paddingHorizontal: 18,
		paddingVertical: 16,
		borderRadius: 100,
		marginHorizontal: 6,
	},
	line: {
		marginVertical: 10,
		borderWidth: 0.3,
		paddingHorizontal: 50,
		height: 0,
		backgroundColor: "#EEEEEE",
		opacity: 0.1,
	},
	btnText: {
		color: "#246BFD",
		textAlign: "center",
		fontFamily: "UrbanistBold",
		fontSize: 18,
	},
	btns: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 10,
	},
	subtitles: {
		color: "#212121",
		fontSize: 18,
		marginVertical: 15,
		fontFamily: "UrbanistRegular",
	},

	separator: {
		width: 1,
		height: 14,

		marginLeft: 10,
		marginRight: 10,
		backgroundColor: "#424242",
	},

	icons: {
		width: 15.83,
		height: 15,
	},
	items: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	details: {
		marginTop: 0,
		marginLeft: 5,
	},
	views: {
		flexDirection: "row",
	},
	docinfo: {
		flexDirection: "row",
		marginTop: 10,
	},
	title1: {
		color: "#212121",
		fontSize: 18,
		fontFamily: "UrbanistBold",
	},
	title2: {
		color: "#424242",
		fontSize: 12,
		marginBottom: 15,
		fontFamily: "UrbanistRegular",
	},
	roles: {
		color: "#424242",
		fontSize: 12,
		fontFamily: "UrbanistRegular",
	},
	title3: {
		top: -2,
		marginLeft: 10,
		fontSize: 12,
		fontFamily: "UrbanistRegular",
	},
});
