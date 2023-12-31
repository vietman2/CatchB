import axios from "axios";

import { API_LOCAL_URL } from "./apiConfig";

export async function login(username: string, password: string) {
  const url = `${API_LOCAL_URL}/api/users/login/`;

  const response = await axios
    .post(url, { username, password })
    .catch((err) => {
      return err.response;
    });

  return {
    status: response.status,
    data: response.data,
  };
}

/*
export async function register(
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
  password2: string
) {
  const url = `${API_LOCAL_URL}/api/users/register`;
}
*/
