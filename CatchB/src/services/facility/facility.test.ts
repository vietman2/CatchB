import axios from "axios";
import { act } from "@testing-library/react-native";

import { registerFacility } from "./facility";

describe("registerFacility", () => {
  it("should successfully register facility", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );

    await act(() =>
      registerFacility(
        "name",
        "owner_uuid",
        "owner_name",
        "owner_phone_number",
        "phone",
        "reg_code",
        "road_address",
        "road_address_part1",
        "road_address_part2",
        "eng_address",
        "jibun_address",
        12345,
        "sido",
        "sigungu"
      )
    );
  });

  it("should fail to register facility", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            detail: "토큰이 만료되었습니다.",
          },
        },
      })
    );

    await act(() =>
      registerFacility(
        "name",
        "owner_uuid",
        "owner_name",
        "owner_phone_number",
        "phone",
        "reg_code",
        "road_address",
        "road_address_part1",
        "road_address_part2",
        "eng_address",
        "jibun_address",
        12345,
        "sido",
        "sigungu"
      )
    );
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject({})
    );

    await act(() =>
      registerFacility(
        "name",
        "owner_uuid",
        "owner_name",
        "owner_phone_number",
        "phone",
        "reg_code",
        "road_address",
        "road_address_part1",
        "road_address_part2",
        "eng_address",
        "jibun_address",
        12345,
        "sido",
        "sigungu"
      )
    );
  });
});
