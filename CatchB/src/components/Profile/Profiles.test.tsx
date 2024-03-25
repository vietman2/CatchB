import { render } from "@testing-library/react-native";

import { AvatarIcon, MainProfile } from ".components/Profile";
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

describe("<AvatarIcon />", () => {
  it("renders correctly", () => {
    render(<AvatarIcon />);
  });

  it("renders correctly with profileImage", () => {
    render(<AvatarIcon profileImage="profileImage" />);
  });
});
