import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { medicaLogo } from "@/assets/icons/medica-logo";
import { moreOutlinedIcon } from "@/assets/icons/more";
import Touchable from "@/components/common/touchable";
import { edit } from "@/assets/icons/edit";
import SettingCard from "@/components/settings/settingCard";
import * as icons from "@/assets/icons/settings";
import { Modalize } from "react-native-modalize";
import LogoutModal from "@/components/settings/logoutModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import parsePhoneNumber from "libphonenumber-js";
import { getProfile } from "@/redux/actions/profile";
import { UnknownAction } from "redux";

const settings: {
	text: string;
	text2?: string;
	rightIcon?: React.ReactNode;
	leftIcon: string;
	logout?: boolean;
	mode?: boolean;
	nextTo?: string;
}[] = [
	{ text: "Profile", nextTo: "editProfile", leftIcon: icons.profileSettings },
	{
		text: "Notification",
		nextTo: "notification",
		leftIcon: icons.notification,
	},
	{
		text: "Payment",
		nextTo: "payment",
		leftIcon: icons.wallet,
	},
	{
		text: "Security",
		nextTo: "security",
		leftIcon: icons.shieldDone,
	},
	{
		text: "Laguange",
		nextTo: "language",
		leftIcon: icons.language,
		text2: "English (US)",
	},
	{
		text: "Dark mode",
		nextTo: "mode",
		leftIcon: icons.eye,
		mode: true,
	},
	{
		text: "Help Center",
		nextTo: "help",
		leftIcon: icons.info,
	},
	{
		text: "Invite Friends",
		nextTo: "friends",
		leftIcon: icons.friends,
	},
	{
		text: "Logout",
		leftIcon: icons.logout,
		rightIcon: null,
		logout: true,
	},
];

const Profile = () => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const modalizeRef = useRef<Modalize>(null);

	const { loading, user } = useSelector(
		(state: RootState) => state.getProfileReducer
	);

	useEffect(() => {
		dispatch(getProfile() as unknown as UnknownAction);
	}, []);

	const onOpen = () => {
		modalizeRef.current?.open();
	};

	return (
		<View className={`flex-1 w-full mt-[${insets.top}px]`}>
			<View className="flex-row px-6 pt-6 items-center justify-between mt-6">
				<View className="flex-row items-center">
					<SvgXml xml={medicaLogo} className="mr-2.5" />
					<Text className="text-2xl font-UrbanistBold text-greyscale-900">
						Profile
					</Text>
				</View>
				<Touchable>
					<SvgXml xml={moreOutlinedIcon} className="self-end" />
				</Touchable>
			</View>
			<ScrollView
				className="flex-1 p-6"
				keyboardShouldPersistTaps="always"
				showsVerticalScrollIndicator={false}
			>
				<View className="items-center pb-10 border-b border-b-greyscale-200 mb-10">
					<View>
						<Image
							src={user && user.profile_picture}
							className="h-[140px] w-[140px] rounded-full"
						/>
						<Touchable className="absolute bottom-0 right-0">
							<SvgXml xml={edit} />
						</Touchable>
					</View>
					<Text className="font-UrbanistBold text-2xl text-greyscale-900 mb-2">
						{user && user.full_name}
					</Text>
					<Text className="text-[14px] font-UrbanistSemiBold text-greyscale-900">
						{user &&
							user.phone &&
							parsePhoneNumber(
								user.phone,
								"RW"
							)?.formatInternational()}
					</Text>
				</View>
				<FlatList
					scrollEnabled={false}
					data={settings}
					className="mb-5"
					renderItem={({ item, index }) => (
						<SettingCard
							key={index}
							text={item.text}
							leftIcon={
								<SvgXml
									xml={item.leftIcon}
									className="mr-2.5"
								/>
							}
							nextTo={item.nextTo}
							rightIcon={item.rightIcon}
							logout={item.logout}
							text2={item.text2}
							mode={item.mode}
							logoutAction={() => modalizeRef.current?.open()}
						/>
					)}
				/>
			</ScrollView>
			<LogoutModal
				modalizeRef={modalizeRef}
				onClose={() => modalizeRef.current?.close()}
			/>
		</View>
	);
};

export default Profile;
