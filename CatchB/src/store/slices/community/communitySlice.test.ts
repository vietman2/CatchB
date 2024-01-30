import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import communityReducer, { setSelectedPost } from "./communitySlice";
import { samplePosts } from "../../../variables/mvp_dummy_data/posts";

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
      selectedPost: null,
    });
  });

  it("should handle setSelectedPost", async () => {
    const store = createStore();

    await store.dispatch(setSelectedPost(samplePosts[0]));
  });
});
