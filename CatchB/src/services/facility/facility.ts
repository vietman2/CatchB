import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function registerFacility(
  name: string,
  owner_uuid: string,
  owner_name: string,
  owner_phone: string,
  phone: string,
  reg_code: string,
  road_address_part1: string,
  road_address_part2: string,
  building_name: string,
  zip_code: number,
  bcode: string,
) {
  const url = `${API_LOCAL_URL}/api/facility/`;

  try {
    const response = await axios.post(
      url,
      {
        name,
        owner_uuid,
        owner_name,
        owner_phone,
        phone,
        reg_code,
        road_address_part1,
        road_address_part2,
        building_name,
        zip_code,
        bcode,
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
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
