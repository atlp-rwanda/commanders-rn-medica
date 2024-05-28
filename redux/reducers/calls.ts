import { createSlice } from "@reduxjs/toolkit";

interface CallState {
  typeCall: "Voice call" | "Messaging" | "Video call" | "";
}

export const callSlice = createSlice({
  name: "doctors",
  initialState: {
    typeCall: "",
  } as CallState,
  reducers: {},
});

export const setTypeCall = (
  state: CallState,
  typeCall: CallState["typeCall"]
) => (state.typeCall = typeCall);
