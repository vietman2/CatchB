import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function registerFacility(
  facility: {
    name: string;
    owner_uuid: string;
    owner_name: string;
    owner_phone: string;
    phone: string;
    reg_code: string;
  },
  address: {
    road_address: string;
    road_address_part1: string;
    road_address_part2: string;
    eng_address: string;
    jibun_address: string;
    zip_code: number;
    sido: string;
    sigungu: string;
  }
) {
  const url = `${API_LOCAL_URL}/api/facility/`;

  try {
    const response = await axios.post(
      url,
      {
        facility: facility,
        address: address,
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
