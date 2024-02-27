/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react-native";

import { CoachPreview, Shortcut, Filters } from "./fragments";
import { sampleCoaches } from "../../variables/mvp_dummy_data/coaches";

jest.mock("react-native-paper", () => ({
  Chip: ({ children }: any) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{children}</Text>;
  },
  Icon: "Icon",
  Surface: "Surface",
  Text: "Text",
}));

describe("CoachPreview", () => {
  it("renders correctly", () => {
    render(<CoachPreview coach={sampleCoaches[0]} />);
  });
});

describe("Shortcut", () => {
  it("renders correctly", () => {
    render(<Shortcut text="단축키" />);
  });
});

describe("Filters", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Filters selected="타격" setSelected={() => {}} />
    );

    fireEvent.press(getByText("타격"));
  });
});
