import axios from "axios";
import { act } from "@testing-library/react-native";

import { TestNetworkError } from "../../utils/test-utils";

import {
  login,
  renewToken,
  getUserProfile,
  logout,
  register,
  deleteAccount,
  changePassword,
} from "./account";

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
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );
    const username = "exampleuser";
    const password = "wrongpassword";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(400);
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));
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
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const refresh = "refresh";

    await act(() => renewToken(refresh));
  });

  it("should fail to renew token", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const refresh = "refresh";

    const response = await act(() => renewToken(refresh));

    expect(response.status).toBe(400);
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
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const uuid = "uuid";
    const access = "access";

    await act(() => getUserProfile(uuid, access));
  });

  it("should fail to get user profile", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const uuid = "uuid";
    const access = "access";

    const response = await act(() => getUserProfile(uuid, access));

    expect(response.status).toBe(400);
  });
});

describe("logout", () => {
  it("should successfully logout", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 204,
        data: {},
      })
    );

    const refresh = "refresh";

    const response = await act(() => logout(refresh));

    expect(response.status).toBe(204);
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const refresh = "refresh";

    await act(() => logout(refresh));
  });

  it("should fail to logout", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const refresh = "refresh";

    const response = await act(() => logout(refresh));

    expect(response.status).toBe(400);
  });
});

describe("register", () => {
  const username = "test";
  const email = "test";
  const first_name = "test";
  const last_name = "test";
  const phone_number = "test";
  const password = "test";
  const password2 = "test";
  const gender = "M";

  it("should successfully register", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );

    await act(() =>
      register(
        {
          username,
          first_name,
          last_name,
          email,
          phone_number,
          password,
          password2,
        },
        gender
      )
    );
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() =>
      register(
        {
          username,
          first_name,
          last_name,
          email,
          phone_number,
          password,
          password2,
        },
        gender
      )
    );
  });

  it("should fail to register", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() =>
      register(
        {
          username,
          first_name,
          last_name,
          email,
          phone_number,
          password,
          password2,
        },
        gender
      )
    );
  });
});

describe("deleteAccount", () => {
  it("should successfully delete account", async () => {
    jest.spyOn(axios, "delete").mockImplementation(() =>
      Promise.resolve({
        status: 204,
        data: {},
      })
    );

    const uuid = "uuid";
    const access = "access";

    await act(() => deleteAccount(uuid, access));
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const uuid = "uuid";
    const access = "access";

    await act(() => deleteAccount(uuid, access));
  });

  it("should fail to delete account", async () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const uuid = "uuid";
    const access = "access";

    await act(() => deleteAccount(uuid, access));
  });
});

describe("changePassword", () => {
  it("should successfully change password", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 204,
        data: {},
      })
    );

    const uuid = "uuid";
    const access = "access";
    const old_password = "old_password";
    const new_password = "new_password";
    const new_password2 = "new_password2";

    await act(() =>
      changePassword(uuid, access, old_password, new_password, new_password2)
    );
  });

  it("should fail to get response", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const uuid = "uuid";
    const access = "access";
    const old_password = "old_password";
    const new_password = "new_password";
    const new_password2 = "new_password2";

    await act(() =>
      changePassword(uuid, access, old_password, new_password, new_password2)
    );
  });

  it("should fail to change password", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const uuid = "uuid";
    const access = "access";
    const old_password = "old_password";
    const new_password = "new_password";
    const new_password2 = "new_password2";

    await act(() =>
      changePassword(uuid, access, old_password, new_password, new_password2)
    );
  });
});
