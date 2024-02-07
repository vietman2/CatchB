import { render, fireEvent } from "@testing-library/react-native";

import CoachSimple from "./CoachSimple";
import { sampleCoaches } from "../../../variables/mvp_dummy_data/coaches";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));

describe("<CoachSimple />", () => {
  it("handles the like and share button correctly", () => {
    render(
      <CoachSimple coach={sampleCoaches[0]} />
    );
  });
});
