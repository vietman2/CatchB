import axios from "axios";

import { API_LOCAL_URL } from "../apiConfig";

export async function registerFacility(
  name: string,
  owner_uuid: string,
  owner_name: string,
  owner_phone_number: string,
  phone: string,
  reg_code: string,
  road_address: string,
  road_address_part1: string,
  road_address_part2: string,
  eng_address: string,
  jibun_address: string,
  zip_code: number,
  sido: string,
  sigungu: string
) {
  const url = `${API_LOCAL_URL}/api/facility/`;

  try {
    const response = await axios.post(
      url,
      {
        name,
        owner_uuid,
        owner_name,
        owner_phone_number,
        phone,
        reg_code,
        road_address,
        road_address_part1,
        road_address_part2,
        eng_address,
        jibun_address,
        zip_code,
        sido,
        sigungu,
      },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      return {
        status: 400,
        data: {},
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
