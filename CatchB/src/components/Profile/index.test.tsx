import { render } from "@testing-library/react-native";

import { AvatarImage, CommunityPostProfile, MainProfile } from "./";
import { samplePosts } from "../../variables/mvp_dummy_data/posts";

jest.mock("react-native-paper", () => {
  return {
    Avatar: {
      ...jest.requireActual("react-native-paper").Avatar,
      Icon: "Icon",
    },
    Text: "Text",
  };
});

describe("<MainProfile />", () => {
  it("renders correctly", () => {
    render(<MainProfile user={null} />);
  });
});

describe("<CommunityPostProfile />", () => {
  it("renders correctly", () => {
    render(<CommunityPostProfile post={samplePosts[0]} />);
  });
});

describe("<AvatarImage />", () => {
  it("renders correctly", () => {
    render(<AvatarImage />);
  });
});
