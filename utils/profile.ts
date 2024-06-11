import { supabase } from "@/app/supabase";

export const getImage = async ({
	bucket,
	fileName,
}: {
	bucket: string;
	fileName: string;
}): Promise<string | undefined> => {
	const { error, data } = await supabase.storage
		.from(bucket)
		.createSignedUrl(fileName, 3600, { download: false });

	if (error) {
		console.error("Error generating signed URL:", error);
		return undefined;
	}

	return data.signedUrl;
};
