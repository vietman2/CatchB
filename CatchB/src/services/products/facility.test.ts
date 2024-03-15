import axios from "axios";
import { act } from "@testing-library/react-native";

import { registerFacility, uploadDetails } from "./facility";
import { TestNetworkError } from "../../utils/test-utils";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

describe("registerFacility", () => {
  const register = () =>
    registerFacility(
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

describe("uploadDetails", () => {
  const upload = () =>
    uploadDetails(
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
