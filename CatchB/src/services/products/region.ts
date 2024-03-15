import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function getRegionsList() {
  const url = `${API_LOCAL_URL}/api/products/regions/`;

  try {
    const response = await axios.get(url);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
