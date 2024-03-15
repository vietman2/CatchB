import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { save, remove } from ".store/storage/secure";
import { UserProfileType } from ".types/users";

const initialState: {
  token: string;
  user: UserProfileType | null;
} = {
  token: "",
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { access: string; refresh: string; user: UserProfileType }) => {
    // Save the token to SecureStore
    await save("refresh_token", data.refresh);
    await save("uuid", data.user.uuid);

    return data;
  }
);

export const setNewToken = createAsyncThunk(
  "auth/renewToken",
  async (data: {
    access: string;
    access_expiration: string;
    refresh: string;
    refresh_expiration: string;
  }) => {
    // Save the token to SecureStore
    await save("refresh_token", data.refresh);

    return data.access;
  }
);

export const setUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (data: UserProfileType) => {
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // Delete the token from SecureStore
  await remove("refresh_token");
  await remove("uuid");

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
      state.token = "";
      state.user = null;
    });
    builder.addCase(setNewToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(setUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
