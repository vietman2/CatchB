import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import coachReducer, { setSelectedCoach } from "./coachSlice";

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
      selectedCoachId: null,
      myCoachUuid: null,
    });
  });

  it("should handle setSelectedCoach", async () => {
    const store = createStore();

    await store.dispatch(setSelectedCoach("1"));

    const state = store.getState().coach;
    expect(state.selectedCoachId).toEqual("1");
  });
});
