import axios from "axios";
import { act } from "@testing-library/react-native";

import { login, renewToken, getUserProfile } from "./account";

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

  it("should fail to get response", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject({
        response: {
          data: { detail: "서버에 문제가 있습니다." },
        },
      })
    );
    const username = "exampleuser";
    const password = "wrongpassword";

    await act(() => login(username, password));
  });
});

describe("renewToken", () => {
  it("should successfully renew token", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { access: "access", refresh: "refresh" },
      })
    );

    const refresh = "refresh";

    const response = await act(() => renewToken(refresh));

    expect(response.status).toBe(200);
    expect(response.data.access).toBe("access");
  });

  it("should fail to get response", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject({
        response: {
          data: { detail: "서버에 문제가 있습니다." },
        },
      })
    );

    const refresh = "refresh";

    await act(() => renewToken(refresh));
  });
});

describe("getUserProfile", () => {
  it("should successfully get user profile", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { uuid: "uuid", username: "username" },
      })
    );

    const uuid = "uuid";
    const access = "access";

    const response = await act(() => getUserProfile(uuid, access));

    expect(response.status).toBe(200);
    expect(response.data.uuid).toBe("uuid");
  });

  it("should fail to get response", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.reject({
        response: {
          data: { detail: "서버에 문제가 있습니다." },
        },
      })
    );

    const uuid = "uuid";
    const access = "access";

    await act(() => getUserProfile(uuid, access));
  });
});
