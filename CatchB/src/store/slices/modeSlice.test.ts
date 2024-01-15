import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import modeReducer, { setMode } from "./modeSlice";

// Create a mock store for testing
const createStore = () => {
  return configureStore({
    reducer: {
      mode: modeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("modeSlice", () => {
  // Test for initial state
  it("should handle initial state", () => {
    expect(modeReducer(undefined, { type: "unknown" })).toEqual({
      mode: "basic",
    });
  });

  // Test for setMode action
  it("should handle setMode", async () => {
    const store = createStore();
    const mode = "pro";

    store.dispatch(setMode(mode));

    const state = store.getState().mode;
    expect(state.mode).toEqual(mode);
  });
});
