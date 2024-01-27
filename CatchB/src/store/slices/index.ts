import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import authReducer from "./user_management/authSlice";
import modeReducer from "./general/modeSlice";
import couponReducer from "./user_management/couponSlice";
import pointReducer from "./user_management/pointSlice";
import facilityReducer from "./facility/facilitySlice";
import { RootState } from "../store";

const rootReducer = combineReducers({
  auth: authReducer,
  mode: modeReducer,
  coupon: couponReducer,
  point: pointReducer,
  facility: facilityReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
