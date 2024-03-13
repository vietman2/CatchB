import axios from "axios";
import { act } from "@testing-library/react-native";

import { createPost } from "./post";

describe("createPost", () => {
  const forum = "forum";
  const uuid = "uuid";
  const title = "title";
  const content = "content";
  const tags = [1, 2];
  const images = [1, 2];
  const token = "token";

  it("should successfully create post", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: { id: 1, title: "title" },
      })
    );

    const response = await act(() =>
      createPost(forum, uuid, title, content, tags, images, token)
    );

    expect(response.status).toBe(201);
    expect(response.data.id).toBe(1);
    expect(response.data.title).toBe("title");
  });

  it("should fail to create post", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() =>
      createPost(forum, uuid, title, content, tags, images, token)
    );
  });

  it("should fail to create post", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject({ response: { status: 400, data: "Bad Request" } })
      );

    const response = await act(() =>
      createPost(forum, uuid, title, content, tags, images, token)
    );

    expect(response.status).toBe(400);
  });
});
