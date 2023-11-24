//import { API_LOCAL_URL } from "./apiConfig";
import { admin, exampleUser } from "../variables/mvp_dummy_data/user";

export async function login(username: string, password: string) {
  // Temporary
  if (username === "admin" && password === "admin") {
    return {
      status: 200,
      data: {
        token: "admin",
        user: admin,
      },
    };
  }

  if (username === "exampleuser" && password === "examplepassword") {
    return {
      status: 200,
      data: {
        token: "user",
        user: exampleUser,
      },
    };
  }

  return {
    status: 400,
    data: {
      token: "user",
      user: exampleUser,
    },
  };
  /*
    const url = `${API_LOCAL_URL}/api/users/login`;

    const response = await axios.post(url, { username, password });

    return response.data;
    */
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
