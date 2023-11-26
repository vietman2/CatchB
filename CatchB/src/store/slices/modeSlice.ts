import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  mode: "basic" | "pro";
} = {
  mode: "basic",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"basic" | "pro">) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
