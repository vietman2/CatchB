import { render } from "@testing-library/react-native";

import FAQ from "./FAQ";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));

describe("<FAQ />", () => {
  it("renders correctly", () => {
    render(<FAQ />);
  });
});
