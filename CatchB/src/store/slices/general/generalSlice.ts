import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationObject } from "expo-location";

const initialState: {
  mode: "basic" | "pro";
  location: LocationObject | null;
} = {
  mode: "basic",
  location: null,
};

export const generalSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"basic" | "pro">) => {
      state.mode = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationObject | null>) => {
      state.location = action.payload;
    },
  },
});

export const { setMode, setLocation } = generalSlice.actions;

export default generalSlice.reducer;
