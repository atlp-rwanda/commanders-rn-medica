import { supabase } from "@/app/supabase";

export const getProfileImage = async ({
	bucket,
	fileName,
}: {
	bucket: string;
	fileName: string;
}): Promise<string | undefined> => {
	const { error, data } = await supabase.storage
		.from(bucket)
		.createSignedUrl(
			fileName.startsWith("public/")
				? fileName
				: fileName.split("/files/")[1],
			3600,
			{ download: false }
		);

	if (error) {
		console.error(
			"Error generating signed URL:",
			JSON.stringify(error, null, 2)
		);
		return undefined;
	}

	return data.signedUrl;
};
