import axios from "axios";
import { act } from "@testing-library/react-native";

import {
  postFacility,
  getFacilityRegisterStatus,
  getFacilityList,
  getFacilityDetail,
  postFacilityInfo,
} from "./facility";
import { TestNetworkError } from ".utils/test-utils";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

describe("postFacility", () => {
  const register = () =>
    postFacility(
      "name",
      "owner_uuid",
      "owner_name",
      "owner_phone_number",
      "phone",
      "reg_code",
      "road_address_part1",
      "road_address_part2",
      "building_name",
      12345,
      "1100000000",
      "token"
    );

  it("should successfully register facility", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );

    await act(() => register());
  });

  it("should fail to register facility", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => register());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => register());
  });
});

describe("getFacilityRegisterStatus", () => {
  const getStatus = () => getFacilityRegisterStatus("uuid", "token");

  it("should successfully get status", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => getStatus());
  });

  it("should fail to get status", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => getStatus());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getStatus());
  });
});

describe("getFacilityList", () => {
  const getList = () => getFacilityList();

  it("should successfully get list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => getList());
  });

  it("should fail to get list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => getList());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getList());
  });
});

describe("getFacilityDetail", () => {
  const getDetail = () => getFacilityDetail("uuid");

  it("should successfully get detail", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    await act(() => getDetail());
  });

  it("should fail to get detail", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => getDetail());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getDetail());
  });
});

describe("postFacilityInfo", () => {
  const upload = () =>
    postFacilityInfo(
      "facility_uuid",
      "intro",
      {
        weekday_open: "09:00",
        weekday_close: "18:00",
        saturday_open: "09:00",
        saturday_close: "18:00",
        sunday_open: "09:00",
        sunday_close: "18:00",
      },
      ["convenience1"],
      ["equipment1"],
      0,
      3,
      ["additional"],
      ["others"],
      [
        {
          uri: "fake://uri",
          type: "image",
          fileName: "image.jpg",
          width: 100,
          height: 100,
          exif: {},
          fileSize: 100,
        },
      ],
      "token"
    );

  it("should successfully upload details", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );

    await act(() => upload());
  });

  it("should fail to upload details", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => upload());
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => upload());
  });
});
