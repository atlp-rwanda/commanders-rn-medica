import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	getProfile,
	resetProfileState,
	updateProfile,
	updateProfileState,
	User,
	UserProfileState,
} from "../actions/profile";

const { reducer: getProfileReducer } = createSlice({
	name: "getProfile",
	initialState: {
		loading: false,
		user: {} as User,
		message: "",
		error: "",
	} as UserProfileState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProfile.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			getProfile.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.user = action?.payload;
			}
		);
		builder.addCase(
			getProfile.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action?.payload?.error;
			}
		);
	},
});

const { reducer: updateProfileReducer } = createSlice({
	name: "updateProfile",
	initialState: {
		loading: false,
		message: "",
		error: "",
	} as updateProfileState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(updateProfile.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			updateProfile.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.message = "Success";
			}
		);
		builder.addCase(
			updateProfile.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action?.payload?.error;
			}
		);
		builder.addCase(
			resetProfileState,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.message = "";
				state.error = "";
			}
		);
	},
});

export { getProfileReducer, updateProfileReducer };
