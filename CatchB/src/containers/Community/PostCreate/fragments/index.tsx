import { Divider } from "react-native-paper";

import { default as Tags } from "./Tags";
import { default as Preview } from "./MdPreview";
import { default as Buttons } from "./Buttons";
import { default as ImageList } from "./ImageList";

function MyDivider() {
  return <Divider style={{ marginVertical: 10 }} />;
}

export { Buttons, ImageList, MyDivider, Preview, Tags };
