import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counter";
import { doctorsSlice } from "../reducers/doctors";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    doctors: doctorsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
