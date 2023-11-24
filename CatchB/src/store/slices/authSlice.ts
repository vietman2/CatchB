import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserProfile } from "../../variables/types";

const initialState: {
  token: string | null;
  user: UserProfile | null;
} = {
  token: null,
  user: null
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { token: string, user: UserProfile }) => {
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
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  }
});

export default authSlice.reducer;
