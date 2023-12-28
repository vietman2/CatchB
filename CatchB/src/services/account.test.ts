import axios from "axios";
import { act } from "@testing-library/react-native";

import { login } from "./account";

describe("login", () => {
  it("should successfully login", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { token: "token", user: "user" },
      })
    );

    const username = "admin";
    const password = "admin";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("token");
  });

  it("should fail login", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: {
          non_field_errors: ["주어진 자격 증명으로 로그인이 불가능합니다."],
        },
      })
    );
    const username = "exampleuser";
    const password = "wrongpassword";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(400);
  });
});
