import { render } from "@testing-library/react-native";

import VerticalDivider from "./VerticalDivider";
import DividerWithText from "./DividerWithText";

describe("<VerticalDivider />", () => {
  it("renders correctly", () => {
    render(<VerticalDivider />);
  });
});

describe("<DividerWithText />", () => {
  it("renders correctly", () => {
    render(<DividerWithText text="Hello" />);
  });
});
