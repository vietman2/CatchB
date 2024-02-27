import * as SecureStore from "expo-secure-store";

import { save, get, remove } from "./secure";

describe("secure", () => {
  it("saves data", async () => {
    jest
      .spyOn(SecureStore, "setItemAsync")
      .mockImplementationOnce(() => Promise.resolve());
    await save("key", "value");
  });

  it("gets data", async () => {
    jest
      .spyOn(SecureStore, "getItemAsync")
      .mockImplementationOnce(() => Promise.resolve("value"));
    await get("key");
  });

  it("removes data", async () => {
    jest
      .spyOn(SecureStore, "deleteItemAsync")
      .mockImplementationOnce(() => Promise.resolve());
    await remove("key");
  });
});
