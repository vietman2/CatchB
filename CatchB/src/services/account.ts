import axios from "axios";

import { API_LOCAL_URL } from "./apiConfig";

export async function login(username: string, password: string) {
  const url = `${API_LOCAL_URL}/api/users/login/`;

  try {
    const response = await axios.post(url, { username, password });

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

export async function renewToken(refresh: string) {
  const url = `${API_LOCAL_URL}/api/users/token/refresh/`;

  try {
    const response = await axios.post(url, { refresh });
    // TODO: 만료된 토큰이라면 Dialog를 띄워서 로그인을 유도한다.
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

export async function getUserProfile(uuid: string, access: string) {
  const url = `${API_LOCAL_URL}/api/users/${uuid}/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

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

export async function logout(refresh: string) {
  const url = `${API_LOCAL_URL}/api/users/logout/`;

  try {
    const response = await axios.post(url, { refresh });
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
