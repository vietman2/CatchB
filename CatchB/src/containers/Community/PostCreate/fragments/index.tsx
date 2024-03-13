import { Divider } from "react-native-paper";

import { default as Tags } from "./Tags";
import { default as Preview } from "./MdPreview";

function MyDivider() {
  return <Divider style={{ marginVertical: 10 }} />;
}

export { MyDivider, Preview, Tags };
