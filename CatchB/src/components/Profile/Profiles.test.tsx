import { render } from "@testing-library/react-native";

import { AvatarIcon, CommunityProfile, MainProfile } from ".components/Profile";
import { samplePosts } from ".data/community";
import { admin } from ".data/users";

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

describe("<CommunityProfile />", () => {
  it("renders correctly", () => {
    render(<CommunityProfile post={samplePosts[0]} />);
  });

  it("renders with fake timer1: 2021-01-01 01:01", () => {
    render(
      <CommunityProfile
        post={{ ...samplePosts[0], created_at: "2021-01-01 01:01" }}
      />
    );
  });

  it("renders with fake timer2: 2021-11-11 11:11", () => {
    render(
      <CommunityProfile
        post={{ ...samplePosts[0], created_at: "2021-11-11 11:11" }}
      />
    );
  });
});

describe("<AvatarIcon />", () => {
  it("renders correctly", () => {
    render(<AvatarIcon />);
  });

  it("renders correctly with profileImage", () => {
    render(<AvatarIcon profileImage="profileImage" />);
  });
});
