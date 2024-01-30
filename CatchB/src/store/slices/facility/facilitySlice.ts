import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FacilityType } from "../../../variables/types";

const initialState: {
  selectedFacility: FacilityType | null;
} = {
  selectedFacility: null,
};

export const setSelectedFacility = createAsyncThunk(
  "facility/setSelectedFacility",
  async (data: FacilityType) => {
    return data;
  }
);

export const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedFacility.fulfilled, (state, action) => {
      state.selectedFacility = action.payload;
    });
  },
});

export default facilitySlice.reducer;
