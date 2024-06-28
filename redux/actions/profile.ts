import { supabase } from "@/app/supabase";
import { getProfileImage } from "@/utils/profile";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError, PostgrestError } from "@supabase/supabase-js";

export interface UpdateData {
	names: string;
	userName: string;
	dob: string;
	email: string;
	phoneNumber: string;
	gender: string;
}

export interface User {
	id: string;
	full_name: string;
	nickname: string;
	date_of_birth: string;
	email: string;
	phone: string;
	gender: string;
	profile_picture: string;
}

export interface UpdateUser {
	id: string;
	full_name: string;
	nickname: string;
	date_of_birth: string;
	email: string;
	phone: string;
	gender: string;
}

export interface UserProfileState {
	loading: boolean;
	user: User;
	message: string;
	error: string;
}

export interface updateProfileState {
	loading: boolean;
	message: string;
	error: string;
}
const emptyImageUrl =
	"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg";

export const resetProfileState = createAction("resetProfileState");

export const getProfile = createAsyncThunk(
	"getProfile",
	async (_, { rejectWithValue }) => {
		try {
			const { error, data: authData } = await supabase.auth.getUser();

			if (authData && authData.user) {
				const { data: userData } = await supabase
					.from("patient")
					.select("*")
					.eq("id", authData.user.id)
					.single();

				const profileUrl =
					userData.profile_picture &&
					(userData.profile_picture.startsWith("public/") ||
						userData.profile_picture.includes("/files/") ||
						userData.profile_picture.split("/files/")[1])
						? await getProfileImage({
								bucket: "files",
								fileName: userData.profile_picture,
						  })
						: userData.profile_picture;

				return profileUrl
					? { ...userData, profile_picture: profileUrl }
					: { ...userData, profile_picture: emptyImageUrl };
			} else if (error) {
				rejectWithValue({ message: error.message, cause: error.cause });
			}
		} catch (error: AuthError | any) {
			console.log({ error });
			return rejectWithValue({
				message: error.message,
				cause: error.cause,
			});
		}
	}
);

export const updateProfile = createAsyncThunk(
	"updateProfile",
	async (updateData: UpdateUser, { rejectWithValue }) => {
		try {
			const { id, ...rest } = updateData;
			const { error } = await supabase.auth.updateUser({
				phone: rest.phone,
			});

			const { error: updateError } = await supabase
				.from("patient")
				.update({ ...rest })
				.eq("id", id)
				.select();

			if (error) {
				return rejectWithValue({
					message: error.message,
					cause: error.cause,
				});
			} else if (updateError) {
				return rejectWithValue({
					message: updateError.message,
					details: updateError.details,
				});
			}
		} catch (error: AuthError | PostgrestError | any) {
			console.log({ error });
			return rejectWithValue({
				message: error.message,
				cause: error.cause,
			});
		}
	}
);
