import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer, { login, logout } from "./authSlice";
import { admin } from "../../variables/mvp_dummy_data/user";

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
      user: null,
    });
  });

  // Test for login action
  it("should handle login", async () => {
    const store = createStore();
    const token = "user-token";
    const user = admin;

    await store.dispatch(login({token, user}));

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
