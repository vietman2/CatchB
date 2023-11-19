import authReducer, { login, logout } from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Create a mock store for testing
const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("authSlice", () => {
  // Test for initial state
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual({
      token: null,
    });
  });

  // Test for login action
  it("should handle login", async () => {
    const store = createStore();
    const token = "user-token";

    await store.dispatch(login(token));

    const state = store.getState().auth;
    expect(state.token).toEqual(token);
  });

  // Test for logout action
  it("should handle logout", async () => {
    const store = createStore();
    store.dispatch(logout());

    const state = store.getState().auth;
    expect(state.token).toBeNull();
  });
});
