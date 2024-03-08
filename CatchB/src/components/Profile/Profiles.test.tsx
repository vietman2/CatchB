import { render } from "@testing-library/react-native";

import { AvatarImage, CommunityPostProfile, MainProfile } from "./";
import { samplePosts } from "../../variables/mvp_dummy_data/posts";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => ({
  Avatar: {
    ...jest.requireActual("react-native-paper").Avatar,
    Icon: "Icon",
    Image: "Image",
  },
  Text: "Text",
}));

describe("<MainProfile />", () => {
  it("renders correctly with no user", () => {
    render(<MainProfile user={null} />);
  });

  it("renders correctly with user", () => {
    render(<MainProfile user={admin} />);
  });
});

describe("<CommunityPostProfile />", () => {
  it("renders correctly", () => {
    render(<CommunityPostProfile post={samplePosts[0]} />);
  });

  it("renders with fake timer1: 2021-01-01 01:01", () => {
    render(
      <CommunityPostProfile
        post={{ ...samplePosts[0], created_at: "2021-01-01 01:01" }}
      />
    );
  });

  it("renders with fake timer2: 2021-11-11 11:11", () => {
    render(
      <CommunityPostProfile
        post={{ ...samplePosts[0], created_at: "2021-11-11 11:11" }}
      />
    );
  });
});

describe("<AvatarImage />", () => {
  it("renders correctly", () => {
    render(<AvatarImage />);
  });

  it("renders correctly with profileImage", () => {
    render(<AvatarImage profileImage="profileImage" />);
  });
});
