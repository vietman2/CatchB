import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import authReducer from "./authSlice";


const rootReducer = combineReducers({
    auth: authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export default rootReducer;
