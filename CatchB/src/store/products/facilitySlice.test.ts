import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import facilityReducer, {
  setSelectedFacility,
  setMyFacilityUuid,
} from "./facilitySlice";

const createStore = () => {
  return configureStore({
    reducer: {
      facility: facilityReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  });
};

describe("facilitySlice", () => {
  it("should handle initial state", () => {
    expect(facilityReducer(undefined, { type: "unknown" })).toEqual({
      selectedFacilityId: null,
      myFacilityUuid: null,
    });
  });

  it("should handle setSelectedFacility", async () => {
    const store = createStore();

    await store.dispatch(setSelectedFacility("uuid"));

    const state = store.getState().facility;
    expect(state.selectedFacilityId).toEqual("uuid");
  });

  it("should handle setMyFacilityUuid", async () => {
    const store = createStore();

    await store.dispatch(setMyFacilityUuid("123"));

    const state = store.getState().facility;
    expect(state.myFacilityUuid).toEqual("123");
  });
});
