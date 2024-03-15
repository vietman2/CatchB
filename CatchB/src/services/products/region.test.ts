import axios from "axios";
import { act } from "@testing-library/react-native";

import { getRegionsList } from "./region";
import { TestNetworkError } from "../../utils/test-utils";

describe("getRegionsList", () => {
  it("should successfully get list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [],
      })
    );

    const response = await act(() => getRegionsList());

    expect(response.status).toBe(200);
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getRegionsList());
  });

  it("should fail to get list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() => getRegionsList());

    expect(response.status).toBe(400);
  });
});
