import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserProfile } from "../../variables/types";

const initialState: {
  token: string | null;
  user: UserProfile | null;
} = {
  token: null,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { access: string, user: UserProfile }) => {
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access;
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
    });
  }
});

export default authSlice.reducer;
