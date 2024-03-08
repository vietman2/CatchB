import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CouponType } from "../../../variables/types/users";

const initialState: {
  coupons: CouponType[];
  selectedCoupon: CouponType | null;
} = {
  coupons: [],
  selectedCoupon: null,
};

export const setCouponListState = createAsyncThunk(
  "coupon/setCouponListState",
  async (data: CouponType[]) => {
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
