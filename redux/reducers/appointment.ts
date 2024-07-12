import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

export interface Doctor {
  liked: string | number | (string | number)[] | null | undefined;
  id?: number;
  name: string;
  role: string;
  stars: string;
  hospital: string;
  reviews: Review;
  image: ImageSourcePropType;
}

export interface Appointment {
    id?: number;
    patient: string;
    package: string;
    duration: string;
    amount: string;
    doctor: Doctor;
    status: string;
    reviews: Review;
    approval: string;
    Reason_couse_toUpdated: string;
    appointment_date: string;
    appointment_time: string;
    created_at:string;
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

interface AppointmentsState {
  appointments: Appointment[];
  selectedAppointment: Appointment | any;
  messages:any,
  status: "idle" | "loading" | "failed";
}

const initialState: AppointmentsState = {
    appointments: [
  ],
  selectedAppointment: null,
  messages:[],
  status: "idle",
};

const appointmentsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
    getAppointment(state, action: PayloadAction<Appointment|any>) {
        state.selectedAppointment = action.payload;
      },
      getMessages(state, action: PayloadAction<any>) {
        state.messages = action.payload;
      },
  },
});
export const{
    getAppointments,
    getAppointment,
    getMessages
} = appointmentsSlice.actions


  export default appointmentsSlice.reducer;

