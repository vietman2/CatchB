import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import modeReducer from "./general/modeSlice";
import authReducer from "./user_management/authSlice";
import couponReducer from "./user_management/couponSlice";
import pointReducer from "./user_management/pointSlice";
import facilityReducer from "./facility/facilitySlice";
import communityRedcucer from "./community/communitySlice";
import { RootState } from "../store";

const rootReducer = combineReducers({
  mode: modeReducer,
  auth: authReducer,
  coupon: couponReducer,
  point: pointReducer,
  facility: facilityReducer,
  community: communityRedcucer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
