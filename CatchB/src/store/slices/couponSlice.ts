import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Coupon } from "../../variables/types";

const initialState: {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
} = {
  coupons: [],
  selectedCoupon: null,
};

export const setCouponListState = createAsyncThunk(
  "coupon/setCouponListState",
  async (data: Coupon[]) => {
    return data;
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCouponListState.fulfilled, (state, action) => {
      state.coupons = action.payload;
    });
  },
});

export default couponSlice.reducer;
