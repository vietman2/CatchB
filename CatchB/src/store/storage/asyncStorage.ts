import AsyncStorage from "@react-native-async-storage/async-storage";

import { MyImageAsset } from "../../containers/Community/PostCreate/variables";

export async function saveTemp(
  title: string,
  content: string,
  selectedForum: string,
  uploadedImages: MyImageAsset[]
) {
  const key = "temporaryPost";
  const value = {
    title,
    content,
    selectedForum,
    uploadedImages,
  };
  await save(key, value);
}

export async function getTemp() {
  return await get("temporaryPost");
}

export async function removeTemp() {
  await remove("temporaryPost");
}

async function save(key: string, value: object) {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

async function get(key: string) {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

async function remove(key: string) {
  await AsyncStorage.removeItem(key);
}
