import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import generalReducer, { setMode, setLocation } from "./generalSlice";

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

  it("should handle setLocation", async () => {
    const store = createStore();
    const location = {
      coords: {
        latitude: 1,
        longitude: 1,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 1,
    };

    store.dispatch(setLocation(location));

    const state = store.getState().general;
    expect(state.location).toEqual(location);
  });
});
