import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

export interface Doctor {
  id?: number;
  name: string;
  role: string;
  stars: string;
  hospital: string;
  reviews: string;
  image: ImageSourcePropType;
}

export interface Review {
  id: number;
  name: string;
  stars: number;
  likes: number;
  time: string;
  content: string;
  liked?: boolean;
  image: string;
}

interface DoctorsState {
  doctors: Doctor[];
  reviews: Review[];
  status: "idle" | "loading" | "failed";
}

const initialState: DoctorsState = {
  doctors: [
  ],
  reviews: [
    
  ],
  status: "idle",
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
  },
});
export const{
  getReviews
} = doctorsSlice.actions

export const selectDoctorById = (state: DoctorsState, doctorId: number) =>
  state.doctors.find((doctor) => doctor.id === doctorId);
  export default doctorsSlice.reducer;

