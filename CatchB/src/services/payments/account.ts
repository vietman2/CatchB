import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function getBankList(token: string) {
  const url = `${API_LOCAL_URL}/api/payments/banks/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
