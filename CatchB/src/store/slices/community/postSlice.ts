import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { PostType } from "../../../variables/types/community";

const initialState: {
  selectedPost: PostType | null;
} = {
  selectedPost: null,
};

export const setSelectedPost = createAsyncThunk(
  "community/setSelectedPost",
  async (data: PostType) => {
    return data;
  }
);

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedPost.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
  },
});

export default communitySlice.reducer;
