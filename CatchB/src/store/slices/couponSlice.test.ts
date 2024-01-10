import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import couponReducer, { setCouponListState } from "./couponSlice";
import { sampleCoupons } from "../../variables/mvp_dummy_data/coupons";

const createStore = () => {
  return configureStore({
    reducer: {
      coupon: couponReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("couponSlice", () => {
  it("should handle initial state", () => {
    expect(couponReducer(undefined, { type: "unknown" })).toEqual({
      coupons: [],
      selectedCoupon: null,
    });
  });

  it("should handle setCouponListState", async () => {
    const store = createStore();

    await store.dispatch(setCouponListState(sampleCoupons));

    const state = store.getState().coupon;
    expect(state.coupons).toEqual(sampleCoupons);
  });
});
