import { render } from "@testing-library/react-native";

import IconButton from "./IconButton";

jest.mock("react-native-paper", () => ({
  Surface: "Surface",
  Text: "Text",
  Icon: "Icon",
}));

describe("<IconButton />", () => {
  it("renders correctly", () => {
    render(<IconButton icon="home" title="Home" />);
  });
});
