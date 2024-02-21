import { render } from "@testing-library/react-native";

import Monthly from "./";

jest.mock("react-native-paper", () => {
  return {
    Icon: "Icon",
    Text: "Text",
  };
});

describe("<Monthly />", () => {
  it("renders correctly", () => {
    render(<Monthly />);
  });
});
