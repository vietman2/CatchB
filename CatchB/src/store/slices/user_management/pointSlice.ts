import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { PointsType } from ".types/users";

const initialState: {
  totalPoints: number;
  pointsDetails: PointsType[];
} = {
  totalPoints: 0,
  pointsDetails: [],
};

export const setPointsState = createAsyncThunk(
  "point/setPointsState",
  async (data: { total: number; details: PointsType[] }) => {
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
