import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserProfile } from "../../variables/types";

const initialState: {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
} = {
  accessToken: null,
  refreshToken: null,
  user: null
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { access: string, refresh: string, user: UserProfile }) => {
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
      console.log(action.payload);
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    });
  }
});

export default authSlice.reducer;
