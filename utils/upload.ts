import { supabase } from "@/app/supabase";

const upload = async (uri: any, type: any) => {
  console.log(uri);
  const response = await fetch(uri);

  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();
  const filename = uri.split("/").pop();
  const { data, error } = await supabase.storage
    .from("files")
    .upload(`messages/${filename}`, arrayBuffer, {
      contentType: type === "image" ? "image/jpeg" : "audio/mp4",
      upsert: false,
    });

  if (error) {
    console.log("Error uploading image:", error);
    // return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(`messages/${filename}`);
  console.log(publicUrl);

  if (!publicUrl) {
    console.log("Error getting public URL:");
    // return null;
  }

  return publicUrl;
};

export default upload;
