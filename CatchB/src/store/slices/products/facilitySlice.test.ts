import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import facilityReducer, { setSelectedFacility } from "./facilitySlice";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";

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
      selectedFacility: null,
      myFacilityUuid: null,
    });
  });

  it("should handle setSelectedFacility", async () => {
    const store = createStore();

    await store.dispatch(setSelectedFacility(sampleFacilities[0]));

    const state = store.getState().facility;
    expect(state.selectedFacility).toEqual(sampleFacilities[0]);
  });
});
