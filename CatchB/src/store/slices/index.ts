import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import generalReducer from "./general/generalSlice";
import authReducer from "./user_management/authSlice";
import couponReducer from "./user_management/couponSlice";
import pointReducer from "./user_management/pointSlice";
import facilityReducer from "./products/facilitySlice";
import coachReducer from "./products/coachSlice";
import communityRedcucer from "./community/postSlice";
import { RootState } from "../store";

const rootReducer = combineReducers({
  general: generalReducer,
  auth: authReducer,
  coupon: couponReducer,
  point: pointReducer,
  facility: facilityReducer,
  coach: coachReducer,
  community: communityRedcucer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
