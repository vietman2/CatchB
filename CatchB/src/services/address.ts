import axios from "axios";

const API_LOCAL_URL = process.env.API_URL;

export async function getList() {
  const url = `${API_LOCAL_URL}/api/address/`;

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
