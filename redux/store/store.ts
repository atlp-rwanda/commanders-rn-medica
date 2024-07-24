import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counter";
import doctorsSlice  from "../reducers/doctors";
import appointmentSlice from "../reducers/appointment";
import { callSlice } from "../reducers/calls";
import { getProfileReducer, updateProfileReducer } from "../reducers/profile";
import sessionSlice from "../reducers/session";

export const store = configureStore({
  reducer: {
		session: sessionSlice,
    counter: counterSlice,
    doctors: doctorsSlice,
    calls: callSlice.reducer,
	getProfileReducer,
    updateProfileReducer,
    appointment: appointmentSlice

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
