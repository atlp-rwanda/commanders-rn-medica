import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboardingCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.onboardingCompleted = true;
    },
  },
});

export const { completeOnboarding } = onboardingSlice.actions;

export default onboardingSlice.reducer;
