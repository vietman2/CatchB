import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Points } from "../../variables/types";

const initialState: {
  totalPoints: number;
  pointsDetails: Points[];
} = {
  totalPoints: 0,
  pointsDetails: [],
};

export const setPointsState = createAsyncThunk(
  "point/setPointsState",
  async (data: { total: number; details: Points[] }) => {
    return data;
  }
);

export const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPointsState.fulfilled, (state, action) => {
      state.totalPoints = action.payload.total;
      state.pointsDetails = action.payload.details;
    });
  },
});

export default pointSlice.reducer;
