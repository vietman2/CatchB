import { render } from "@testing-library/react-native";

import { ProgressBanner, CheckStatus } from "../Progress";

jest.mock("react-native-gifted-charts", () => ({
  ...jest.requireActual("react-native-gifted-charts"),
}));
jest.mock("react-native-paper", () => ({
  Text: "Text",
  Icon: "Icon",
}));

describe("<ProgressBanner />", () => {
  it("renders correctly", () => {
    render(<ProgressBanner done={1} total={1} />);
  });
});

describe("<CheckStatus />", () => {
  it("renders correctly", () => {
    render(<CheckStatus done={1} total={1} />);
  });
});
