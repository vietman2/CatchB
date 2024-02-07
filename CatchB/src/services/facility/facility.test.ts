import axios from "axios";
import { act } from "@testing-library/react-native";

import { registerFacility } from "./facility";
import { TestNetworkError } from "../../utils/test-utils";

const facilityData = {
  name: "name",
  owner_uuid: "owner_uuid",
  owner_name: "owner_name",
  owner_phone: "owner_phone_number",
  phone: "phone",
  reg_code: "reg_code",
};
const addressData = {
  road_address: "road_address",
  road_address_part1: "road_address_part1",
  road_address_part2: "road_address_part2",
  eng_address: "eng_address",
  jibun_address: "jibun_address",
  zip_code: 12345,
  sido: "sido",
  sigungu: "sigungu",
};

describe("registerFacility", () => {
  it("should successfully register facility", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );

    await act(() => registerFacility(facilityData, addressData));
  });

  it("should fail to register facility", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => registerFacility(facilityData, addressData));
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => registerFacility(facilityData, addressData));
  });
});
