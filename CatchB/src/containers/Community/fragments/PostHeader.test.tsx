/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react-native";

import PostHeader from "./PostHeader";
import { samplePosts } from ".data/community";

jest.mock("react-native-paper", () => {
  const { View } = jest.requireActual("react-native");
  const ActualAvatar = jest.requireActual("react-native-paper").Avatar;
  const AvatarIcon = () => <View />;
  const Avatar = (props: any) => {
    return <ActualAvatar {...props}>{props.children}</ActualAvatar>;
  };
  Avatar.Icon = AvatarIcon;

  return {
    Avatar,
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock("./Tags", () => ({
  Tag: "Tag",
}));

describe("<PostHeader />", () => {
  it("renders correctly", () => {
    render(<PostHeader post={samplePosts[0]} />);
  });

  it("renders with fake timer1: 2021-01-01 01:01", () => {
    render(
      <PostHeader
        post={{ ...samplePosts[0], created_at: "2021-01-01 01:01" }}
      />
    );
  });

  it("renders with fake timer2: 2021-11-11 11:11", () => {
    render(
      <PostHeader
        post={{ ...samplePosts[0], created_at: "2021-11-11 11:11" }}
      />
    );
  });
});
