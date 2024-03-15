import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import communityReducer, { setSelectedPost } from "./postSlice";

const createStore = () => {
  return configureStore({
    reducer: {
      community: communityReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("communitySlice", () => {
  it("should handle initial state", () => {
    expect(communityReducer(undefined, { type: "unknown" })).toEqual({
      selectedPostId: null,
    });
  });

  it("should handle setSelectedPost", async () => {
    const store = createStore();

    await store.dispatch(setSelectedPost(1));
  });
});
