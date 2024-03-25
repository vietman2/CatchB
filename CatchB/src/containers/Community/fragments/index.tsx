import { Divider } from "react-native-paper";

import { default as CommentSimple } from "./CommentSimple";
import { default as Tags } from "./Tags";
import { default as Preview } from "./MdPreview";
import { default as PostHeader } from "./PostHeader";
import { default as PostSimple } from "./PostSimple";

function MyDivider() {
  return <Divider style={{ marginVertical: 10 }} />;
}

export { CommentSimple, MyDivider, Preview, PostHeader, Tags, PostSimple };
