import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import coachReducer, { setSelectedCoach, setMyCoachUuid } from "./coachSlice";

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

  it("should handle setMyCoachUuid", async () => {
    const store = createStore();

    await store.dispatch(setMyCoachUuid("1"));

    const state = store.getState().coach;
    expect(state.myCoachUuid).toEqual("1");
  });
});
