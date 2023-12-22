import { render } from "@testing-library/react-native";

import ProfileBadge from "./ProfileBadge";
import { admin } from "../../variables/mvp_dummy_data/user";

// mock react-native-paper Avatar.Icon component
jest.mock("react-native-paper", () => {
  const { View } = require("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Avatar: {
      Icon: (props: any) => <View testID="avatar-icon" {...props} />,
    },
  };
});

describe("<ProfileBadge />", () => {
  it("renders the avatar icon when user is not logged in", () => {
    const { getByTestId } = render(<ProfileBadge user={null} />);
    expect(getByTestId("avatar-icon")).toBeTruthy();
  });

  it("renders the avatar icon when user is logged in", () => {
    const { getByTestId } = render(<ProfileBadge user={admin} />);
    expect(getByTestId("avatar-icon")).toBeTruthy();
  });
});
