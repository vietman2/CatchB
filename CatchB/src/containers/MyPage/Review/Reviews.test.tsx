import { render } from "@testing-library/react-native";

import Reviews from "./Reviews";

jest.mock("react-native-paper", () => {
  return {
    Text: "Text",
  };
});

describe("<Reviews />", () => {
  it("renders correctly", () => {
    render(<Reviews />);
  });
});
