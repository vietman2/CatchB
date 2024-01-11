import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import pointReducer, { setPointsState } from "./pointSlice";
import { samplePoints } from "../../variables/mvp_dummy_data/points";

const createStore = () => {
  return configureStore({
    reducer: {
      points: pointReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("pointSlice", () => {
  it("should handle initial state", () => {
    expect(pointReducer(undefined, { type: "unknown" })).toEqual({
      totalPoints: 0,
      pointsDetails: [],
    });
  });

  it("should handle setPointsState", async () => {
    const store = createStore();

    await store.dispatch(setPointsState({ total: 100, details: samplePoints }));

    const state = store.getState().points;
    expect(state.totalPoints).toEqual(100);
  });
});
