import axios from "axios";
import { waitFor } from "@testing-library/react-native";

import Points from "./Points";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";
import { samplePoints } from "../../../variables/mvp_dummy_data/points";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  ActivityIndicator: "ActivityIndicator",
}));

describe("<Points />", () => {
  it("renders correctly with 0 points", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          total: 0,
          details: [],
        },
      });
    });

    await waitFor(() =>
      renderWithProviders(<Points />, {
        preloadedState: { auth: { user: admin, token: "" } },
      })
    );
  });

  it("renders correctly with points", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          total: 25000,
          details: samplePoints
        },
      });
    });

    await waitFor(() =>
      renderWithProviders(<Points />, {
        preloadedState: { auth: { user: admin, token: "" } },
      })
    );
  });
});
