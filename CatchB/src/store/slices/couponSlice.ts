import { createSlice } from "@reduxjs/toolkit";

import { Coupon } from "../../variables/types";

const initialState: {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
} = {
  coupons: [],
  selectedCoupon: null,
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default couponSlice.reducer;
