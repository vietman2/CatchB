import axios from "axios";
import { act } from "@testing-library/react-native";

import { createPost, getPostList, getPostDetail, postLike, postDislike } from "./post";
import { TestNetworkError } from ".utils/test-utils";

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
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() =>
      createPost(forum, uuid, title, content, tags, images, token)
    );
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() =>
      createPost(forum, uuid, title, content, tags, images, token)
    );
  });
});

describe("getPostList", () => {
  const forum = "forum";

  it("should successfully get post list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { post: [{ id: 1, title: "title" }], tags: [] },
      })
    );

    const response = await act(() => getPostList(forum));

    expect(response.status).toBe(200);
  });

  it("should fail to get post list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() => getPostList(forum));

    expect(response.status).toBe(400);
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getPostList(forum));
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
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() => getPostDetail(postId));

    expect(response.status).toBe(400);
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getPostDetail(postId));
  });
});

describe("postLike", () => {
  const postId = 1;
  const uuid = "uuid";
  const token = "token";

  it("should successfully like post", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { id: 1, title: "title" },
      })
    );

    await act(() => postLike(postId, uuid, token));
  });

  it("should fail to like post", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => postLike(postId, uuid, token));
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => postLike(postId, uuid, token));
  });
});

describe("postDislike", () => {
  const postId = 1;
  const uuid = "uuid";
  const token = "token";

  it("should successfully dislike post", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { id: 1, title: "title" },
      })
    );

    await act(() => postDislike(postId, uuid, token));
  });

  it("should fail to dislike post", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    await act(() => postDislike(postId, uuid, token));
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => postDislike(postId, uuid, token));
  });
});
