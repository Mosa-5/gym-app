import { supabase } from "../supabase";
import { FillProfileInfoPayload } from "./index.types.ts";

// export type FillProfileInfoPayloadWithId = {
//      phone_number:string;
//      full_name_ka: string;
//      full_name_en: string;
//      avatar_url: string;
//      id?:string;
//  }

//  export interface FillProfileInfoPayloadWithId1 {
//      id: string; // Make `id` required
//      avatar_url?: string;
//      full_name?: string;
//      full_name_en?: string;
//      full_name_ka?: string;
//      phone_number?: string;
//    }

// export type SupabaseProfileInfoPayload = {
//      id: string;
//      avatar_url?: string | null;
//      full_name?: string | null;
//      full_name_en?: string | null;
//      full_name_ka?: string | null;
//      phone_number?: string | null;
//      updated_at?: string | null;
//      username?: string | null;
//    };

export const fillProfileInfo = async ({
  id,
  values,
}: {
  id: string;
  values: FillProfileInfoPayload;
}): Promise<void> => {
  await supabase
    .from("profiles")
    .upsert({ id, ...values }, { onConflict: "id" })
    .throwOnError();
};

export const getProfileInfo = async (
  id: string | number,
): Promise<SingleProfileData> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id.toString());
  if (error) {
    throw error;
  }
  return data[0];
};

export type SingleProfileData = {
  avatar_url: string | null;
  full_name: string | null;
  full_name_en: string | null;
  full_name_ka: string | null;
  id: string;
  phone_number: string | null;
  updated_at: string | null;
  username: string | null;
  address: string | null;
};

export const uploadAvatar = async ({
  userId,
  file,
}: {
  userId: string;
  file: File;
}): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar_${Date.now()}.${fileExt}`;

  // Delete old avatars first
  const { data: existingFiles } = await supabase.storage
    .from("avatars")
    .list(userId);

  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles.map((f) => `${userId}/${f.name}`);
    await supabase.storage.from("avatars").remove(filesToDelete);
  }

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // Ensure the URL contains /public/ path segment
  const correctedUrl = publicUrl.includes("/object/public/")
    ? publicUrl
    : publicUrl.replace("/object/", "/object/public/");

  // Add cache-busting timestamp so browser loads the new image
  const avatarUrl = `${correctedUrl}?t=${Date.now()}`;

  // Update the profile with the new avatar URL
  await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId)
    .throwOnError();

  return avatarUrl;
};

export const mapProfileTableData = (data: SingleProfileData) => ({
  avatar_url: data.avatar_url || "",
  full_name_en: data.full_name_en || "",
  full_name_ka: data.full_name_ka || "",
  phone_number: data.phone_number || "",
  address: data.address || "",
  username: data.username || "",
});
