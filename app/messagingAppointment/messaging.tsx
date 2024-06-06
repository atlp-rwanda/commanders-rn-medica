import { deleteBtn } from "@/assets/icons/delete";
import { download } from "@/assets/icons/download";
import { Menu } from "@/assets/icons/menu";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ChatInput } from "@/components/chatInput";
import Chat from "@/components/chats/chat";
import Recording from "@/components/recording";
import { router } from "expo-router";
import {
	Image,
	KeyboardAvoidingView,
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
export default function messagingAppointment() {
	const [visible, setVisible] = useState(false);
	const [isSession, setIsSession] = useState(true);

	const toggleModal = () => {
		setVisible(!visible);
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSession(false);
			setTimeout(() => {
				router.push("/Appointments/voice-call/session-ended");
			}, 2000);
		}, 6000);
		return () => clearTimeout(timer);
	}, []);
	return (
		<View className="flex-1 bg-white py-10 px-6">
			<NavigationHeader title={"Dr. Drake Boeson"} onBack={router.back}>
				<TouchableOpacity>
					<Image
						source={require("@/assets/icons/search.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={toggleModal}>
					<SvgXml xml={Menu} />
				</TouchableOpacity>
				<Modal
					visible={visible}
					animationType="fade"
					transparent={true}
					onRequestClose={toggleModal}>
					<TouchableWithoutFeedback onPress={() => setVisible(false)}>
						<View className={` absolute w-[100%] right-0 z-[0] top-[5px]`}>
							<View className="w-[100%]">
								<View className="w-[37%] relative top-[50px] left-[59%] p-4 right-0 bg-white rounded-xl">
									<TouchableOpacity className="flex-row gap-2 py-2">
										<SvgXml xml={deleteBtn} />
										<Text className="font-UrbanistSemiBold">Clear chat</Text>
									</TouchableOpacity>
									<View className="w-[85%] ml-3 pt-2 border-b-[1px] border-grey opacity-40" />
									<TouchableOpacity className="flex-row gap-2 pb-2 pt-4 ">
										<SvgXml xml={download} />
										<Text className="font-UrbanistSemiBold">Export chat</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</NavigationHeader>
			<KeyboardAvoidingView
				behavior="padding"
				className="flex-1"
				keyboardVerticalOffset={20}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					className="flex-1 mb-4">
					<View className="flex-row justify-center items-center my-3">
						<View className="bg-[#75757512] justify-center items-center rounded-lg px-6 py-1.5">
							<Text className="text-sm text-[#757575] font-UrbanistSemiBold">
								Today
							</Text>
						</View>
					</View>

					<Chat
						direction="end"
						message="Hi, good afternoon Dr. Drake ... 😄😄😄"
						time="9:41 AM"
						color="lightblue"
					/>
					<Chat
						direction="end"
						message="I'm Andrew, I have a problem with my immune system 😢"
						time="9:41 AM"
						color="lightblue"
					/>
					<Chat
						direction="start"
						message="Hello, good afternoon too Andrew 😁"
						time="9:41 AM"
						color="lightgrey"
					/>
					<Chat
						direction="start"
						message="Can you tell me the problem you are having? So that I can identify it."
						time="9:42 AM"
						color="lightgrey"
					/>
					<Chat
						direction="end"
						message="Recently I often feel unwell. I also sometimes experience pain in the legs, and I don't know why 😭😭
                            Do you know anything doc?"
						time="9:41 AM"
						color="lightblue"
					/>
					<View className={`w-[100%] flex items-end my-3`}>
						<View className={` rounded-xl p-4 w-3/4 flex justify-end`}>
							<View className={` w-[73%] flex-row gap-x-4 pb-3`}>
								<Image
									source={require("@/assets/images/chat/leg.png")}
									style={{ width: 100, height: 100 }}
									resizeMode="contain"
								/>
								<Image
									source={require("@/assets/images/chat/leg1.png")}
									style={{ width: 100, height: 100 }}
									resizeMode="contain"
								/>
							</View>
						</View>
					</View>
					<Chat
						direction="start"
						message="I'm seeing signs that what you're experiencing is actually because you've been working too much."
						time="9:42 AM"
						color="lightgrey"
                    />
					<Chat
						direction="start"
						message="My advice is that you eat healthy food, sleep early and enough, & you can also try to exercise 2 times a week. 😄"
						time="9:42 AM"
						color="lightgrey"
                    />
					<Chat
						direction="end"
						message="Thank you very much doctor for the advice and solutions you provide. I’ll try it from today 👍👍"
						time="9:41 AM"
						color="lightblue"
                    />
					<Chat
						direction="end"
						message="I will contact you again in 2 weeks! Thank you very much! 😊"
						time="9:41 AM"
						color="lightblue"
                    />
					<Chat
						direction="start"
						message="My pleasure. All the best for you Andrew! 🔥🔥"
						time="9:42 AM"
						color="lightgrey"
                    />
				</ScrollView>
				{isSession && (
					<View className="flex-row justify-center items-center gap-2">
						<View className="flex-1">
							<ChatInput autoFocus={true} />
						</View>
						<Recording />
					</View>
				)}
				{!isSession && (
					<View className="flex-row justify-center items-center my-3">
						<View className="bg-[#75757512] justify-center items-center rounded-lg px-6 py-1.5">
							<Text className="text-sm text-[#757575] font-UrbanistSemiBold">
								Session End
							</Text>
						</View>
					</View>
				)}
			</KeyboardAvoidingView>
		</View>
	);
}
