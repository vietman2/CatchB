import { render } from "@testing-library/react-native";

import { Sales } from "./Sales";

jest.mock("react-native-paper", () => {
  return {
    Icon: "Icon",
    Text: "Text",
  };
});

describe("<Sales />", () => {
  it("renders correctly", () => {
    render(<Sales />);
  });
});
