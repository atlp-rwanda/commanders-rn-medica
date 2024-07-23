export const videoSDKToken: string = process.env.EXPO_PUBLIC_VIDEOSDK_TOKEN!;

export const createMeeting = async ({
  token,
}: {
  token: string;
}): Promise<string> => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const { roomId } = await res.json();
    return roomId;
  } catch (error) {
    console.error(error);
    return "Failed to create meet";
  }
};
