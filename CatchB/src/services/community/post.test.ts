import axios from "axios";
import { act } from "@testing-library/react-native";

import { createPost, getPostList, getPostDetail } from "./post";

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

describe("getPostList", () => {
  const forum = "forum";

  it("should successfully get post list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [{ id: 1, title: "title" }],
      })
    );

    const response = await act(() => getPostList(forum));

    expect(response.status).toBe(200);
    expect(response.data[0].id).toBe(1);
    expect(response.data[0].title).toBe("title");
  });

  it("should fail to get post list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getPostList(forum));
  });

  it("should fail to get post list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject({ response: { status: 400, data: "Bad Request" } })
      );

    const response = await act(() => getPostList(forum));

    expect(response.status).toBe(400);
  });
});

describe("getPostDetail", () => {
  const postId = 1;

  it("should successfully get post detail", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { id: 1, title: "title" },
      })
    );

    const response = await act(() => getPostDetail(postId));

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data.title).toBe("title");
  });

  it("should fail to get post detail", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getPostDetail(postId));
  });

  it("should fail to get post detail", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject({ response: { status: 400, data: "Bad Request" } })
      );

    const response = await act(() => getPostDetail(postId));

    expect(response.status).toBe(400);
  });
});
