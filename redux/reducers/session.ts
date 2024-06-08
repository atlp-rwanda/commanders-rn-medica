import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface UserSessionType{
    accessToken?: string;
    fullName?: string;
    email?: string;
    picture?: string;
    nickname?:string;
    userId?:string;
}

const initialState: UserSessionType = {
    accessToken: "",
    fullName: "",
    email: "",
    picture: "",
    userId:"",
    nickname:"",
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action:PayloadAction<UserSessionType>)=>{
            state.accessToken = action.payload.accessToken;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
            state.userId = action.payload.userId;
            state.nickname = action.payload.userId;
        }
    }
});

export const {setSession} = sessionSlice.actions;
export default sessionSlice.reducer;
