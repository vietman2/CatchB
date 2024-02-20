import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FacilityType } from "../../../variables/types/products";

const initialState: {
  selectedFacility: FacilityType | null;
  myFacilityUuid: string | null;
} = {
  selectedFacility: null,
  myFacilityUuid: null,
};

export const setSelectedFacility = createAsyncThunk(
  "facility/setSelectedFacility",
  async (data: FacilityType) => {
    return data;
  }
);

export const setMyFacilityUuid = createAsyncThunk(
  "facility/setMyFacility",
  async (data: string) => {
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
    builder.addCase(setMyFacilityUuid.fulfilled, (state, action) => {
      state.myFacilityUuid = action.payload;
    });
  },
});

export default facilitySlice.reducer;
