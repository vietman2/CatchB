import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CoachType } from "../../../variables/types/products";

const initialState: {
  selectedCoach: CoachType | null;
} = {
  selectedCoach: null,
};

export const setSelectedCoach = createAsyncThunk(
  "coach/setSelectedCoach",
  async (data: CoachType) => {
    return data;
  }
);

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedCoach.fulfilled, (state, action) => {
      state.selectedCoach = action.payload;
    });
  },
});

export default coachSlice.reducer;
