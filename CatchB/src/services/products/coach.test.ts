import axios from "axios";
import { act } from "@testing-library/react-native";

import {
  postCoach,
  getCoachRegisterStatus,
  getCoachList,
  getCoachDetail,
  postCoachInfo,
} from "./coach";
import { TestNetworkError } from ".utils/test-utils";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

describe("postCoach", () => {
  const post = () =>
    postCoach(
      "owner_uuid",
      "owner_name",
      "owner_phone_number",
      "professional",
      {
        uri: "assets/images/coach1.jpg",
        name: "asdf",
      },
      "token"
    );

  it("should successfully register coach", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 204,
      })
    );

    await act(() => post());
  });

  it("should fail to register coach", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => post());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => post());
  });
});

describe("getCoachRegisterStatus", () => {
  const status = () => getCoachRegisterStatus("uuid", "token");

  it("should successfully get coach register status", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => status());
  });

  it("should fail to get coach register status", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => status());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => status());
  });
});

describe("getCoachList", () => {
  const list = () => getCoachList();

  it("should successfully get coach list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => list());
  });

  it("should fail to get coach list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => list());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => list());
  });
});

describe("getCoachDetail", () => {
  const detail = () => getCoachDetail("uuid");

  it("should successfully get coach detail", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => detail());
  });

  it("should fail to get coach detail", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => detail());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => detail());
  });
});

describe("postCoachInfo", () => {
  const info = () =>
    postCoachInfo(
      "uuid",
      "intro",
      ["asdf", "qwer"],
      ["1", "2"],
      ["3", "4"],
      [
        {
          uri: "assets/images/coach1.jpg",
          width: 50,
          height: 50,
        },
      ],
      [
        {
          code: "1111000000",
          name: "종로구",
          label: "종로",
        },
      ],
      "token"
    );

  it("should successfully post coach info", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 204,
      })
    );

    await act(() => info());
  });

  it("should fail to post coach info", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 404, data: "Not Found" })
        )
      );

    await act(() => info());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => info());
  });
});
