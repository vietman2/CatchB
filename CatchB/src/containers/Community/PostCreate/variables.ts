import { ImagePickerAsset } from "expo-image-picker";

const forumChoices: string[] = ["덕아웃", "드래프트", "장터"];

type MyImageAsset = {
  id: number;
  url: string;
  asset: ImagePickerAsset;
};

export { forumChoices, MyImageAsset };
