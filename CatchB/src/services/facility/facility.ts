import axios from "axios";

const API_LOCAL_URL = process.env.API_URL;

export async function registerFacility(
  name: string,
  owner_uuid: string,
  owner_name: string,
  owner_phone: string,
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
        facility: {
          name,
          owner_uuid,
          owner_name,
          owner_phone,
          phone,
          reg_code,
        },
        address: {
          road_address,
          road_address_part1,
          road_address_part2,
          eng_address,
          jibun_address,
          zip_code,
          sido,
          sigungu,
        },
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
