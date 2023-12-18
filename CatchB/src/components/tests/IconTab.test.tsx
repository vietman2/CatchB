import { render } from "@testing-library/react-native";

import IconTab from "../IconTab";

jest.mock("react-native-paper", () => ({
  Surface: "Surface",
  Text: "Text",
  Icon: "Icon",
}));

describe("<IconTab />", () => {
  it("renders correctly", () => {
    render(<IconTab icon="home" title="Home" />);
  });
});
