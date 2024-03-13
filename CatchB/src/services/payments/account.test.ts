import axios from "axios";
import { act } from "@testing-library/react-native";

import { getBankList } from "./account";

describe("getBankList", () => {
  it("should successfully get bank list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [{ id: 1, name: "Bank 1" }],
      })
    );

    const token = "token";

    const response = await act(() => getBankList(token));

    expect(response.status).toBe(200);
    expect(response.data[0].name).toBe("Bank 1");
  });

  it("should fail to get bank list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));
    const token = "token";

    await act(() => getBankList(token));
  });

  it("should fail to get bank list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject({ response: { status: 400, data: "Bad Request" } })
      );
    const token = "token";

    const response = await act(() => getBankList(token));

    expect(response.status).toBe(400);
  });
});
