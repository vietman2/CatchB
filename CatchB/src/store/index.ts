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

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
