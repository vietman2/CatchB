import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  selectedCoachId: string | null;
  myCoachUuid: string | null;
} = {
  selectedCoachId: null,
  myCoachUuid: null,
};

export const setSelectedCoach = createAsyncThunk(
  "coach/setSelectedCoach",
  async (data: string) => {
    return data;
  }
);

export const setMyCoachUuid = createAsyncThunk(
  "coach/setMyCoach",
  async (data: string) => {
    return data;
  }
);

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedCoach.fulfilled, (state, action) => {
      state.selectedCoachId = action.payload;
    });
    builder.addCase(setMyCoachUuid.fulfilled, (state, action) => {
      state.myCoachUuid = action.payload;
    });
  },
});

export default coachSlice.reducer;
