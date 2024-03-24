import axios from "axios";
import { act } from "@testing-library/react-native";

import { getTagsList, uploadImageFile } from "./media";
import { TestNetworkError } from ".utils/test-utils";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

describe("getTagsList", () => {
  it("should successfully get tags list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: ["tag1", "tag2"],
      })
    );

    const response = await act(() => getTagsList());

    expect(response.status).toBe(200);
    expect(response.data).toEqual(["tag1", "tag2"]);
  });

  it("should fail to get tags list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() => getTagsList());

    expect(response.status).toBe(400);
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => getTagsList());
  });
});

describe("uploadImageFile", () => {
  const user_uuid = "uuid";
  const image = {
    uri: "uri",
    fileName: "fileName",
    width: 100,
    height: 100,
  };

  it("should successfully upload image", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { id: 1, image: "image" },
      })
    );

    const response = await act(() => uploadImageFile(user_uuid, image));

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  it("should fail to upload image", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const response = await act(() => uploadImageFile(user_uuid, image));

    expect(response.status).toBe(400);
  });

  it("should handle server error", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    await act(() => uploadImageFile(user_uuid, image));
  });
});
