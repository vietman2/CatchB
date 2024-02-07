import { render } from "@testing-library/react-native";

import AvatarHorizontal from "./AvatarHorizontal";
import AvatarImage from "./AvatarImage";
import CoachProfile from "./CoachProfile";
import { admin } from "../../variables/mvp_dummy_data/user";

// mock react-native-paper Avatar.Icon component
jest.mock("react-native-paper", () => {
  const { View } = require("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Avatar: {
      Icon: (props: any) => <View testID="avatar-icon" {...props} />,
      Image: (props: any) => <View testID="avatar-image" {...props} />,
    },
    Text: "Text",
  };
});

describe("<AvatarHorizontal />", () => {
  it("renders the avatar icon when user is not logged in", () => {
    const { getByTestId } = render(<AvatarHorizontal user={null} />);
    expect(getByTestId("avatar-icon")).toBeTruthy();
  });

  it("renders the avatar icon when user is logged in", () => {
    const { getByTestId } = render(<AvatarHorizontal user={admin} />);
    expect(getByTestId("avatar-icon")).toBeTruthy();
  });
});

describe("<AvatarImage />", () => {
  it("renders the avatar icon when user is not logged in", () => {
    const { getByTestId } = render(<AvatarImage profileImage="./fake.dir" />);
    expect(getByTestId("avatar-image")).toBeTruthy();
  });

  it("renders the avatar icon when user is logged in", () => {
    const { getByTestId } = render(<AvatarImage />);
    expect(getByTestId("avatar-icon")).toBeTruthy();
  });
});

describe("<CoachProfile />", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<CoachProfile name="test" />);
  });
});
