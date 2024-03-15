import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  selectedPostId: number | null;
} = {
  selectedPostId: null,
};

export const setSelectedPost = createAsyncThunk(
  "community/setSelectedPost",
  async (data: number) => {
    return data;
  }
);

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedPost.fulfilled, (state, action) => {
      state.selectedPostId = action.payload;
    });
  },
});

export default communitySlice.reducer;
