import { createSlice } from "@reduxjs/toolkit";
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
  image: ImageSourcePropType;
}

interface DoctorsState {
  doctors: Doctor[];
  reviews: Review[];
  status: "idle" | "loading" | "failed";
}

const initialState: DoctorsState = {
  doctors: [
    {
      id: 1,
      name: "Eloi Mwokolo",
      role: "Opthamologist",
      stars: "4.3",
      hospital: "Muhima",
      reviews: "231",
      image: require("@/assets/doctors/doctor1.png"),
    },
    {
      id: 2,
      name: "Uwamahoro",
      role: "Pediatric",
      stars: "4.3",
      hospital: "Masaka",
      reviews: "2,542",
      image: require("@/assets/doctors/doctor2.png"),
    },
    {
      id: 3,
      name: "Hakizimana",
      role: "Nutritionist",
      stars: "4.3",
      hospital: "KHI",
      reviews: "1,242",
      image: require("@/assets/doctors/doctor3.png"),
    },
    {
      name: "Emmanuel",
      role: "Dentist",
      stars: "4.3",
      hospital: "Masaka",
      reviews: "2,542",
      image: require("@/assets/doctors/doctor2.png"),
    },
    {
      name: "Hakizimana",
      role: "General",
      stars: "4.3",
      hospital: "KHI",
      reviews: "1,242",
      image: require("@/assets/doctors/doctor3.png"),
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Charolette Hanlin",
      stars: 5,
      likes: 938,
      time: "6 days ago",
      liked: true,
      content:
        "Dr. Jenny is very professional in her work and responsive. I have consulted and my problem is solved. 😍😍",
      image: require("@/assets/reviewers/charolette.png"),
    },
    {
      id: 2,
      name: "Darron Kulikowski",
      stars: 4,
      likes: 863,
      time: "6 days ago",
      liked: false,
      content:
        "The doctor is very beautiful and the service is excellent! I like it and want to consult again 🤣🤣",
      image: require("@/assets/reviewers/darron.png"),
    },
    {
      id: 3,
      name: "Lauralee Quintero",
      stars: 4,
      likes: 629,
      time: "6 days ago",
      liked: true,
      content:
        "Doctors who are very skilled and fast in service. I highly recommend Dr. Jenny for all who want to consult 👍👍",
      image: require("@/assets/reviewers/lauralee.png"),
    },
    {
      id: 4,
      name: "Aileen Fullbright",
      stars: 5,
      likes: 553,
      time: "6 days ago",
      liked: false,
      content:
        "Doctors who are very skilled and fast in service. My illness is cured, thank you very much! 😊",
      image: require("@/assets/reviewers/aileen.png"),
    },
    {
      id: 5,
      name: "Rodolfo Goode",
      stars: 4,
      likes: 938,
      time: "6 days ago",
      liked: false,
      content:
        "Dr. Jenny is very professional in her work and responsive. I have consulted and my problem is solved. 🔥🔥",
      image: require("@/assets/reviewers/rodolfo.png"),
    },
  ],
  status: "idle",
};

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
});

export const selectDoctorById = (state: DoctorsState, doctorId: number) =>
  state.doctors.find((doctor) => doctor.id === doctorId);
