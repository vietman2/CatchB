import { render } from "@testing-library/react-native";

import { LoginLogo } from "../Icons";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<LoginLogo />", () => {
  it("renders logo and title", () => {
    const { getByText } = render(<LoginLogo />);
    expect(getByText("W E L C O M E")).toBeTruthy();
  });
});
