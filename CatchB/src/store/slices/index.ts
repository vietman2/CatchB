import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import modeReducer from "./modeSlice";
import { RootState } from "../store";

const rootReducer = combineReducers({
  auth: authReducer,
  mode: modeReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
