import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import generalReducer, { setMode } from "./";

// Create a mock store for testing
const createStore = () => {
  return configureStore({
    reducer: {
      general: generalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("modeSlice", () => {
  // Test for initial state
  it("should handle initial state", () => {
    expect(generalReducer(undefined, { type: "unknown" })).toEqual({
      mode: "basic",
      location: null,
    });
  });

  // Test for setMode action
  it("should handle setMode", async () => {
    const store = createStore();
    const mode = "pro";

    store.dispatch(setMode(mode));

    const state = store.getState().general;
    expect(state.mode).toEqual(mode);
  });
});
