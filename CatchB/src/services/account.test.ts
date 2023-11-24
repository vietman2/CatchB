import { act } from "@testing-library/react-native";

import { login } from "./account";

describe("login", () => {
  it("should return admin user", async () => {
    const username = "admin";
    const password = "admin";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("admin");
    expect(response.data.user.username).toBe("admin");
  });

  it("should return example user", async () => {
    const username = "exampleuser";
    const password = "examplepassword";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("user");
    expect(response.data.user.username).toBe("user");
  });

  it("should return error", async () => {
    const username = "exampleuser";
    const password = "wrongpassword";

    const response = await act(() => login(username, password));

    expect(response.status).toBe(400);
  });
});
