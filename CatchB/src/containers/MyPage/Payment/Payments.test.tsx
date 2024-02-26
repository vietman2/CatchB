import { render } from "@testing-library/react-native";

import Payments from "./Payments";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));

describe("Payments", () => {
  it("renders correctly", () => {
    render(<Payments />);
  });
});
