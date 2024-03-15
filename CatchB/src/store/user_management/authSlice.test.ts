import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer, {
  login,
  logout,
  setNewToken,
  setUserProfile,
} from "./authSlice";
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
      token: "",
      user: null,
    });
  });

  // Test for login action
  it("should handle login", async () => {
    const store = createStore();
    const access = "user-token";
    const refresh = "user-refresh-token";
    const user = admin;

    await store.dispatch(login({ access, refresh, user }));

    const state = store.getState().auth;
    expect(state.token).toEqual(access);
  });

  // Test for logout action
  it("should handle logout", async () => {
    const store = createStore();

    await store.dispatch(logout());

    const state = store.getState().auth;
    expect(state.token).toEqual("");
  });

  it("should handle setNewToken", async () => {
    const store = createStore();
    const data = {
      access: "new-token",
      access_expiration: "2021-01-01T00:00:00",
      refresh: "new-refresh-token",
      refresh_expiration: "2021-02-01T00:00:00",
    };

    await store.dispatch(setNewToken(data));

    const state = store.getState().auth;
    expect(state.token).toEqual("new-token");
  });

  it("should handle setUserProfile", async () => {
    const store = createStore();

    await store.dispatch(setUserProfile(admin));

    const state = store.getState().auth;
    expect(state.user).toEqual(admin);
  });
});
