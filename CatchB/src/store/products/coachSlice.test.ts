import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import coachReducer, { setSelectedCoach } from "./coachSlice";
import { sampleCoaches } from "../../variables/mvp_dummy_data/coaches";

const createStore = () => {
  return configureStore({
    reducer: {
      coach: coachReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("coachSlice", () => {
  it("should handle initial state", () => {
    expect(coachReducer(undefined, { type: "unknown" })).toEqual({
      selectedCoach: null,
    });
  });

  it("should handle setSelectedCoach", async () => {
    const store = createStore();

    await store.dispatch(setSelectedCoach(sampleCoaches[0]));

    const state = store.getState().coach;
    expect(state.selectedCoach).toEqual(sampleCoaches[0]);
  });
});
