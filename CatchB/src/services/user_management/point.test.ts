import axios from "axios";
import { act } from "@testing-library/react-native";

import { getPointsList } from "./point";
import { TestNetworkError } from "../../utils/test-utils";

describe("getPointsList", () => {
  it("should successfully get points list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { points_list: [] },
      })
    );

    const access = "access";
    const uuid = "uuid";

    const response = await act(() => getPointsList(access, uuid));

    expect(response.status).toBe(200);
    expect(response.data.points_list).toStrictEqual([]);
  });

  it("should fail to get points list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const access = "access";
    const uuid = "uuid";

    await act(() => getPointsList(access, uuid));
  });

  it("should fail to get points list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const access = "access";
    const uuid = "uuid";

    const response = await act(() => getPointsList(access, uuid));

    expect(response.status).toBe(400);
  });
});
