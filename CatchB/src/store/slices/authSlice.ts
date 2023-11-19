import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  token: string | null;
} = {
  token: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (token: string) => {
    return token;
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
      state.token = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  }
});

export default authSlice.reducer;
