import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import couponReducer from "./couponSlice";

/*
const createStore = () => {
  return configureStore({
    reducer: {
      coupon: couponReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};*/

describe("couponSlice", () => {
  it("should handle initial state", () => {
    expect(couponReducer(undefined, { type: "unknown" })).toEqual({
      coupons: [],
      selectedCoupon: null,
    });
  });
});
