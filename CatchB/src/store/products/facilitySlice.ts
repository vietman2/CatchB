import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  selectedFacilityId: string | null;
  myFacilityUuid: string | null;
} = {
  selectedFacilityId: null,
  myFacilityUuid: null,
};

export const setSelectedFacility = createAsyncThunk(
  "facility/setSelectedFacility",
  async (data: string) => {
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
      state.selectedFacilityId = action.payload;
    });
    builder.addCase(setMyFacilityUuid.fulfilled, (state, action) => {
      state.myFacilityUuid = action.payload;
    });
  },
});

export default facilitySlice.reducer;
