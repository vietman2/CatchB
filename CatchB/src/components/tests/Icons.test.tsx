import { render } from "@testing-library/react-native";

import { IconText, LoginLogo } from "../Icons";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<IconText />", () => {
  it("renders icon and text", () => {
    const { getByText } = render(
      <IconText onPress={() => {}} name="test" text="test" />
    );
    expect(getByText("test")).toBeTruthy();
  });
});

describe("<LoginLogo />", () => {
  it("renders logo and title", () => {
    const { getByText } = render(<LoginLogo />);
    expect(getByText("W E L C O M E")).toBeTruthy();
  });
});
