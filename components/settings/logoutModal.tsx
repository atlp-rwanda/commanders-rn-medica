import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import Button from "../button";
import { router } from "expo-router";
import { supabase } from "@/app/supabase";

interface Props {
	modalizeRef: any;
	onClose: () => void;
}

const LogoutModal: React.FC<Props> = ({ modalizeRef, onClose }) => {
	const { height } = useWindowDimensions();
	return (
		<View>
			<Portal>
				<Modalize
					ref={modalizeRef}
					modalStyle={{
						padding: 20,
						paddingTop: 30,
						flex: 1,
						borderTopLeftRadius: 40,
						borderTopRightRadius: 40,
					}}
					scrollViewProps={{ showsVerticalScrollIndicator: false }}
					children={
						<View className="items-center w-max">
							<Text className="text-greyscale-800 font-UrbanistBold text-xl m-3">
								Are you sure you want to log out?
							</Text>
							<View className="flex-row justify-between w-full">
								<Button
									title={"Cancel"}
									secondary
									width={"47.5%"}
									rounded
									onPress={onClose}
								/>
								<Button
									title={"Yes, Logout"}
									width={"47.5%"}
									rounded
									onPress={() => {
										supabase.auth.signOut();
										onClose();
										router.replace("signupSignin/SignIn");
									}}
								/>
							</View>
						</View>
					}
					handlePosition="inside"
					handleStyle={{ backgroundColor: "#E0E0E0" }}
					HeaderComponent={
						<View className="border-b border-b-greyscale-200 mb-3 items-center pb-6">
							<Text className="text-error font-UrbanistBold text-2xl">
								Logout
							</Text>
						</View>
					}
					modalHeight={height * 0.3}
				/>
			</Portal>
		</View>
	);
};

export default LogoutModal;
