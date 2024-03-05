import { render } from "@testing-library/react-native";

import { RegisterProTerms } from "./";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
  Text: "Text",
}));

describe("<RegisterProTerms />", () => {
  it("renders correctly", () => {
    render(<RegisterProTerms />);
  });
});
