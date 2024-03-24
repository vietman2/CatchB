import { fireEvent, render } from "@testing-library/react-native";

import { Stats, TitleText } from "./fragments";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));

describe("<Stats />", () => {
  it("renders correctly and handles interactions", () => {
    const { getByTestId } = render(<Stats rating={4} like={false} setLike={() => {}} />);

    fireEvent.press(getByTestId("like"));
    fireEvent.press(getByTestId("share"));
  });

  it("renders correctly with like", () => {
    render(<Stats rating={4} like={true} setLike={() => {}} />);
  });
});

describe("<TitleText />", () => {
  it("renders facility title correctly", () => {
    render(<TitleText title="Facility" />);
  });

  it("renders coach title correctly", () => {
    render(<TitleText title="Coach" is_coach />);
  });
});
