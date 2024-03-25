import axios from "axios";
import { act } from "@testing-library/react-native";

import { createComment } from "./comment";
import { TestNetworkError } from ".utils/test-utils";

describe("createComment", () => {
  it("should successfully create a comment", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {
          id: 1,
          commenter_nickname: "작성자",
          content: "test content",
          created_at: "2024-02-01T12:00:01.010Z",
          num_likes: 1,
          num_recomments: 1,
        },
      })
    );

    const response = await act(() =>
      createComment(1, "test content", "uuid", "token")
    );

    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: 1,
      commenter_nickname: "작성자",
      content: "test content",
      created_at: "2024-02-01T12:00:01.010Z",
      num_likes: 1,
      num_recomments: 1,
    });
  });

  it("should fail to create a comment", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() =>
      createComment(1, "test content", "uuid", "token")
    );

    expect(response.status).toBe(400);
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => createComment(1, "test content", "uuid", "token"));
  });
});
