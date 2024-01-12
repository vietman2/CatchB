import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import modeReducer from "./modeSlice";
import couponReducer from "./couponSlice";
import pointReducer from "./pointSlice";
import facilityReducer from "./facilitySlice";
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
