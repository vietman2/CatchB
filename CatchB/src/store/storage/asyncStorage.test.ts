import AsyncStorage from "@react-native-async-storage/async-storage";

import { saveTemp, getTemp, removeTemp } from "./asyncStorage";

describe("async-storage", () => {
  it("saves data", async () => {
    jest
      .spyOn(AsyncStorage, "setItem")
      .mockImplementationOnce(() => Promise.resolve());
    await saveTemp("title", "content", "forum", []);
  });

    it("gets data", async () => {
        jest
        .spyOn(AsyncStorage, "getItem")
        .mockImplementationOnce(() =>
            Promise.resolve(
            JSON.stringify({
                title: "title",
                content: "content",
                selectedForum: "forum",
                uploadedImages: [],
            })
            )
        );
        await getTemp();
    });

    it("gets data: null", async () => {
        jest
        .spyOn(AsyncStorage, "getItem")
        .mockImplementationOnce(() => Promise.resolve(null));
        await getTemp();
    });

    it("removes data", async () => {
        jest
        .spyOn(AsyncStorage, "removeItem")
        .mockImplementationOnce(() => Promise.resolve());
        await removeTemp();
    });
});
