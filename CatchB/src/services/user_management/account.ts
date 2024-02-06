import axios from "axios";

const API_LOCAL_URL = process.env.EXPO_PUBLIC_API_URL;
import { RegisterRoute } from "../../variables/enums";

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
  const url = `${API_LOCAL_URL}/api/users/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        uuid,
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

export async function register(
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
  password2: string,
  gender: string
) {
  const url = `${API_LOCAL_URL}/api/users/register/`;
  const register_route = RegisterRoute.CATCHB.value;

  try {
    const response = await axios.post(url, {
      username,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      password2,
      gender,
      register_route,
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

export async function changePassword(
  uuid: string,
  access: string,
  old_password: string,
  new_password1: string,
  new_password2: string
) {
  const url = `${API_LOCAL_URL}/api/users/password_change/`;

  try {
    const response = await axios.post(
      url,
      {
        old_password,
        new_password1,
        new_password2,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        params: {
          uuid,
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

export async function deleteAccount(uuid: string, access: string) {
  const url = `${API_LOCAL_URL}/api/users/`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        uuid,
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
