import axios from "axios";
import { act } from "@testing-library/react-native";

import { getList } from "./address";

describe("getList", () => {
  it("should successfully get list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [],
      })
    );

    const response = await act(() => getList());

    expect(response.status).toBe(200);
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getList());
  });

  it("should fail to get list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            detail: "토큰이 만료되었습니다.",
          },
        },
      })
    );

    const response = await act(() => getList());

    expect(response.status).toBe(400);
  });
});
