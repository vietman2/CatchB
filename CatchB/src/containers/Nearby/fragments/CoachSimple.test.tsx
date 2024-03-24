import { render } from "@testing-library/react-native";

import { CoachSimple } from "./CoachSimple";
import { sampleCoaches } from ".data/products";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));
jest.mock(".components/Chips", () => ({
  CoachTypeChip: () => null,
}));

describe("<CoachSimple />", () => {
  it("handles the like and share button correctly", () => {
    render(<CoachSimple coach={sampleCoaches[0]} />);
  });
});
