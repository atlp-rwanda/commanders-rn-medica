import { combineReducers } from "@reduxjs/toolkit";

import onboardingReducer from "./obReducer";

const rootReducer = combineReducers({

    onboarding: onboardingReducer,
});

export default rootReducer;
