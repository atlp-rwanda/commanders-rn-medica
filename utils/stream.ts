import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

const streamApiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

export const streamClient = new StreamVideoClient({
	apiKey: streamApiKey,
});
